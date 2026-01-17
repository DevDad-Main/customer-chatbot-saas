import { Response } from "express";
import { AuthRequest } from "@/types/express";
import { logger } from "devdad-express-utils";
import { authService } from "@/services/auth.service";

export const authController = {
  status: async (req: AuthRequest, res: Response): Promise<void> => {
    logger.info("GET: /api/auth/status", {
      URL: req.url,
      body: req.body,
      cookies: req.cookies,
    });

    const result = await authService.getSessionFromCookie(
      req.cookies.user_session,
    );

    if (!result.success || !result.session) {
      res.status(401).json({ authenticated: false });
      return;
    }

    res.json({ authenticated: true, user: result.session });
  },

  initiate: (_req: AuthRequest, res: Response): void => {
    try {
      const state = authService.generateState();

      res.cookie("sk_state", state, {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
      });

      const options = authService.getInitiateOptions(state);
      const authorizationURL = authService.getAuthorizationUrl(options);

      res.redirect(authorizationURL);
    } catch (error) {
      console.error("Auth initiation error:", error);
      res.status(500).json({ error: "Failed to initiate authentication" });
    }
  },

  callback: async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      logger.info("GET: /api/auth/callback", {
        URL: req.url,
        body: req.body,
      });

      const code = req.query.code as string | undefined;
      const error = req.query.error as string | undefined;
      const errorDescription = req.query.error_description as
        | string
        | undefined;

      if (error) {
        res.status(401).json({ error, errorDescription });
        return;
      }

      if (!code) {
        res.status(400).json({ error: "No authorization code found" });
        return;
      }

      const authResult = await authService.authenticateWithCode(code);

      if (!authResult.success || !authResult.session) {
        res
          .status(401)
          .json({ error: authResult.error || "Authentication failed" });
        return;
      }

      const cookieOptions = authService.getSessionCookieOptions();
      res.cookie(
        "user_session",
        JSON.stringify(authResult.session),
        cookieOptions,
      );

      const frontendURL = process.env.FRONTEND_URL || "http://localhost:5173";
      res.redirect(frontendURL);
    } catch (error) {
      console.error("Auth callback error:", error);
      res.status(500).json({ error: "Authentication failed" });
    }
  },
};
