import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";
import { getAuthCallback } from "./routes/auth-callback";
import { getAuth as getAuthRoute } from "./routes/auth-callback";
import { postMetadata, getMetadata } from "./routes/metadata";
import { authMiddleware } from "./middleware/auth";

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(express.json());

app.get("/auth", getAuthRoute);
app.get("/auth/callback", getAuthCallback);
app.post("/api/metadata/store", authMiddleware, postMetadata);
app.get("/api/metadata/fetch", authMiddleware, getMetadata);

export default app;
