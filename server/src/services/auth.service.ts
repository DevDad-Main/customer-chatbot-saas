import scaleKit from "@/lib/scalekit";
import { prisma } from "@/lib/prisma";

export interface UserSession {
  email: string;
  organization_id: string;
}

export interface AuthResult {
  success: boolean;
  error?: string;
  session?: UserSession;
}

const HTTP_OPTIONS = {
  httpOnly: true,
  sameSite: "lax" as const,
  path: "/",
};

export const authService = {
  async getSessionFromCookie(
    cookie: string | undefined,
  ): Promise<AuthResult> {
    if (!cookie) {
      return { success: false };
    }

    try {
      const session: UserSession = JSON.parse(cookie);
      if (!session.email || !session.organization_id) {
        return { success: false };
      }
      return { success: true, session };
    } catch {
      return { success: false };
    }
  },

  generateState(): string {
    return require("crypto").randomBytes(16).toString("hex");
  },

  getInitiateOptions(state: string) {
    const redirectURI = process.env.SCALEKIT_REDIRECT_URI!;
    return {
      scopes: ["openid", "profile", "email", "offline_access"],
      state,
      redirectURI,
    };
  },

  getAuthorizationUrl(options: {
    redirectURI: string;
    scopes: string[];
    state: string;
  }): string {
    return scaleKit
      .getAuthorizationUrl(options.redirectURI, {
        scopes: options.scopes,
        state: options.state,
      })
      .toString();
  },

  async authenticateWithCode(code: string): Promise<AuthResult> {
    const redirectURI = process.env.SCALEKIT_REDIRECT_URI!;
    const authResult = await scaleKit.authenticateWithCode(code, redirectURI);

    if (!authResult) {
      return { success: false, error: "Authentication failed" };
    }

    const { user, idToken } = authResult;
    const claims = await scaleKit.validateToken(idToken);

    const organizationId =
      (claims as any).organization_id ||
      (claims as any).org_id ||
      (claims as any).oid ||
      null;

    if (!organizationId) {
      return { success: false, error: "No organization ID in token claims" };
    }

    try {
      await prisma.user.upsert({
        where: { email: user.email },
        create: {
          name: user?.name || "anonymous",
          email: user.email,
          organizationId,
        },
        update: {
          name: user?.name || "anonymous",
          organizationId,
        },
      });
    } catch (error) {
      console.error("Failed to upsert user:", error);
      return { success: false, error: "Failed to save user" };
    }

    const session: UserSession = {
      email: user.email,
      organization_id: organizationId,
    };

    return { success: true, session };
  },

  getSessionCookieOptions() {
    return {
      ...HTTP_OPTIONS,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 1,
    };
  },
};
