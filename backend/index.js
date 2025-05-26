import "dotenv/config";
import express from "express";
import cors from "cors";
import ImageKit from "imagekit";
import connect from "./db/connectDb.js";
// import chatRouter from './routes/chatRoutes.js';
import { clerkMiddleware, getAuth } from "@clerk/express";
import chatRoutes from "./routes/chatRoutes.js";
import cookieParser from "cookie-parser";
import url, { fileURLToPath } from "url";
import path from "path";
import fs from "fs";

const PORT = process.env.PORT || 3000;

const imagekit = new ImageKit({
  urlEndpoint: process.env.IMAGE_KIT_ENDPOINT,
  publicKey: process.env.IMAGE_KIT_PUBLIC_KEY,
  privateKey: process.env.IMAGE_KIT_PRIVATE_KEY,
});

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(cookieParser());
app.use(clerkMiddleware());

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.get("/api/upload", (req, res) => {
  const result = imagekit.getAuthenticationParameters();
  res.send(result);
});

app.use("/api", chatRoutes);

app.use(express.static(path.join(__dirname, "../client")));

app.get('/test', (req, res) => res.send('ok'));

app.get("*", (req, res) => {
  const indexPath = path.resolve(__dirname, "../client", "index.html");
  res.sendFile(indexPath);
});


app.listen(PORT, () => {
  connect();
  console.log(`Server is running on port ${PORT}`);
});
