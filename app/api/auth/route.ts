import crypto from "crypto";
import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";
import { logger } from "devdad-express-utils";
import scaleKit from "@/lib/scalekit";
import { NextResponse } from "next/server";

//#region Constants
const HTTP_OPTIONS: Partial<ResponseCookie> = {
  httpOnly: true,
  sameSite: "lax",
  path: "/",
};
//#endregion

export async function GET() {
  try {
    logger.info("GET: Auth Called: ");
    const state = crypto.randomBytes(16).toString("hex");
    (await cookies()).set("sk_state", state, HTTP_OPTIONS);

    const redirectURI = process.env.SCALEKIT_REDIRECT_URI!;

    const options = {
      scopes: ["openid", "profile", "email", "offline_access"],
      state,
    };

    const authorizationURL = scaleKit.getAuthorizationUrl(redirectURI, options);

    return NextResponse.redirect(authorizationURL);
  } catch (error) {
    console.log("GET: Auth Error: ", error);
    logger.error("GET: Auth Error: ", { error });
  }
}
