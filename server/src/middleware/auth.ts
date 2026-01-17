import { Request, Response, NextFunction } from "express";

interface UserSession {
  email: string;
  organization_id: string;
}

export const isUserAuthorized = async (
  req: Request,
): Promise<UserSession | null> => {
  const userSessionCookie = req.cookies?.user_session;
  let user = null;

  if (userSessionCookie) {
    try {
      user = JSON.parse(userSessionCookie) as UserSession;
    } catch (error: unknown) {
      console.error(error);
    }
  }

  return user;
};

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const user = await isUserAuthorized(req);

  if (!user) {
    res.status(401).json({ error: "User Unauthorized" });
    return;
  }

  (req as any).user = user;
  next();
};
