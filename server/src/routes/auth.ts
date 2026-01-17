import { Request, Response } from "express";
import crypto from "crypto";
import scaleKit from "@/lib/scalekit";
import { logger } from "devdad-express-utils";

const HTTP_OPTIONS = {
  httpOnly: true,
  sameSite: "lax" as const,
  path: "/",
};

export const getAuth = (_req: Request, res: Response): void => {
  try {
    logger.info("GET: Auth Called: ");
    const state = crypto.randomBytes(16).toString("hex");
    res.cookie("sk_state", state, HTTP_OPTIONS);

    const redirectURI = process.env.SCALEKIT_REDIRECT_URI!;

    const options = {
      scopes: ["openid", "profile", "email", "offline_access"],
      state,
    };

    const authorizationURL = scaleKit.getAuthorizationUrl(redirectURI, options);

    res.redirect(authorizationURL.toString());
  } catch (error) {
    console.log("GET: Auth Error: ", error);
    logger.error("GET: Auth Error: ", { error });
  }
};
