import { Request, Response } from "express";
import { authMiddleware } from "@/middleware/auth";

export const postMetadata = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const user = (req as any).user;

  if (!user) {
    res.status(401).json({ error: "User Unauthorized" });
    return;
  }

  const { business_name, website_url, external_links } = req.body;

  if (!business_name || !website_url) {
    res.status(400).json({
      error: "Missing business name or website URL, Required Information.",
    });
    return;
  }

  const { prisma } = await import("@/lib/prisma");
  const metadataResponse = await prisma.metadata.create({
    data: {
      userEmail: user.email,
      businessName: business_name,
      websiteUrl: website_url,
      externalLinks: external_links,
    },
  });

  res.cookie("metadata", JSON.stringify({ business_name }));
  res.status(201).json({ metadataResponse });
};

export const getMetadata = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const user = (req as any).user;

  if (!user) {
    res.status(401).json({ error: "User Unauthorized" });
    return;
  }

  try {
    const metadataCookie = req.cookies?.metadata;

    if (metadataCookie) {
      res.json({
        exists: true,
        source: "cookie",
        data: JSON.parse(metadataCookie),
      });
      return;
    }

    const { prisma } = await import("@/lib/prisma");
    const record = await prisma.metadata.findFirst({
      where: { userEmail: user.email },
    });

    if (record) {
      const HTTP_OPTIONS = {
        httpOnly: true,
        sameSite: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
      };
      res.cookie(
        "metadata",
        JSON.stringify({ business_name: record.businessName }),
        HTTP_OPTIONS,
      );

      res.json({
        exists: true,
        source: "database",
        data: record,
      });
      return;
    }

    res.json({ exists: false, data: null });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed To Fetch MetaData" });
  }
};
