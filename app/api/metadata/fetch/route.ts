import { prisma } from "@/db/client";
import { isUserAuthorized } from "@/lib/isAuthorized";
import { logger } from "devdad-express-utils";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";

const HTTP_OPTIONS: Partial<ResponseCookie> = {
  httpOnly: true,
  sameSite: process.env.NODE_ENV === "production",
  maxAge: 60 * 60 * 24 * 7,
  path: "/",
};

export async function GET(req: Request) {
  try {
    const user = await isUserAuthorized();

    if (!user) {
      logger.error(`${__dirname}: User Not Authorized`, {
        URL: req.url,
      });
      return NextResponse.json({ error: "User Unauthorized" }, { status: 401 });
    }

    const cookieStore = await cookies();
    const metadataCookie = cookieStore.get("metadata");

    if (metadataCookie?.value) {
      return NextResponse.json(
        {
          exists: true,
          source: "cookie",
          data: JSON.parse(metadataCookie.value),
        },
        { status: 200 },
      );
    }

    const record = await prisma.metadata.findFirst({
      where: { userEmail: user.email },
    });

    if (record) {
      cookieStore.set(
        "metadata",
        JSON.stringify({ business_name: record.businessName }),
        HTTP_OPTIONS,
      );

      return NextResponse.json(
        {
          exists: true,
          source: "database",
          data: record,
        },
        { status: 200 },
      );
    }

    return NextResponse.json({ exists: false, data: null }, { status: 200 });
  } catch (error) {
    logger.error("Failed To Fetch MetaData", { error });
    console.error(error);
    return NextResponse.json(
      { error: "Failed To Fetch MetaData" },
      { status: 500 },
    );
  }
}
