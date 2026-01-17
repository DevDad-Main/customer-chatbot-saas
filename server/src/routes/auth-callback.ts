import { Request, Response } from "express";
import crypto from "crypto";
import scaleKit from "@/lib/scalekit";

const HTTP_OPTIONS = {
  httpOnly: true,
  sameSite: "lax" as const,
  path: "/",
};

export const getAuth = (_req: Request, res: Response): void => {
  try {
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
  }
};

export const getAuthCallback = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const code = req.query.code as string | undefined;
    const error = req.query.error as string | undefined;
    const error_description = req.query.error_description as string | undefined;

    if (error) {
      res.status(401).json({ error, error_description });
      return;
    }

    if (!code) {
      res.status(400).json({ error: "No Code Found" });
      return;
    }

    const redirectURI = process.env.SCALEKIT_REDIRECT_URI!;
    const authenticationResult = await scaleKit.authenticateWithCode(
      code,
      redirectURI,
    );

    if (!authenticationResult) {
      res.status(401).json({ error: "Authentication Failed" });
      return;
    }

    const { user, idToken } = authenticationResult;
    const claims = await scaleKit.validateToken(idToken);

    const organizationID =
      (claims as any).organization_id ||
      (claims as any).org_id ||
      (claims as any).oid ||
      null;

    if (!organizationID) {
      res.status(500).json({
        error: "No Organization ID found in token claims",
      });
      return;
    }

    const { prisma } = await import("@/lib/prisma");
    const existingUser = await prisma.user.findUnique({
      where: { email: user.email },
    });

    if (!existingUser) {
      await prisma.user.create({
        data: {
          name: user?.name || "anonymous",
          email: user.email,
          organizationId: organizationID,
        },
      });
    }

    const userSession = {
      email: user.email,
      organization_id: organizationID,
    };

    const HTTP_OPTIONS = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax" as const,
      path: "/",
      maxAge: 60 * 60 * 24 * 1,
    };

    res.cookie("user_session", JSON.stringify(userSession), HTTP_OPTIONS);
    res.redirect(process.env.FRONTEND_URL || "http://localhost:5173");
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to authenticate user",
    });
  }
};
