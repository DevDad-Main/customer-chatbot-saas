import scaleKit from "@/lib/scalekit";
import { logger } from "devdad-express-utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    logger.info("GET: /auth/callback called: ", {
      URL: req.url,
      body: req.body,
    });
    const { searchParams } = req.nextUrl;
    const code = searchParams.get("code");
    const error = searchParams.get("error");
    const error_description = searchParams.get("error_description");

    if (error) {
      logger.error("Error Found In Params: ", { error });
      return NextResponse.json({ error, error_description }, { status: 401 });
    }

    if (!code) {
      logger.error("No Code Provided From Scalekit");
      return NextResponse.json({ error: "No Code Found" }, { status: 400 });
    }

    const redirectURI = process.env.SCALEKIT_REDIRECT_URI!;
    const authenticationResult = await scaleKit.authenticateWithCode(
      code,
      redirectURI,
    );

    if (!authenticationResult) {
      logger.error("Authentication Failed");
      return NextResponse.json(
        { error: "Authentication Failed" },
        { status: 401 },
      );
    }

    const { user, idToken } = authenticationResult;
    const claims = await scaleKit.validateToken(idToken);

    const organizationID =
      (claims as any).organization_id ||
      (claims as any).org_id ||
      (claims as any).oid ||
      null;

    if (!organizationID) {
      logger.error("No Organization ID found in token claims");
      return NextResponse.json(
        {
          error: "No Organization ID found in token claims",
        },
        { status: 500 },
      );
    }
  } catch (error) {
    console.error(error);
    logger.error("GET: /auth/callback error: ", { error });
  }
}
