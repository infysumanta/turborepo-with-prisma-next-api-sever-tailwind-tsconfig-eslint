import express, { type Express } from "express";
import morgan from "morgan";
import cors from "cors";
import { prisma } from "@repo/database";
export const createServer = (): Express => {
  const app = express();
  app
    .disable("x-powered-by")
    .use(morgan("dev"))
    .use(express.urlencoded({ extended: true }))
    .use(express.json())
    .use(cors())
    .get("/message/:name", (req, res) => {
      return res.json({ message: `hello ${req.params.name}` });
    })
    .get("/status", async (_, res) => {
      console.log("DATABASE_URL", process.env.DATABASE_URL);
      await prisma.user.create({
        data: {
          email: `sumanta+${Math.floor(Math.random() * 1000)}@sumanta.space`,
          name: "Sumanta",
        },
      });
      return res.json({
        ok: true,
        message: {
          DATABASE_URL: process.env.DATABASE_URL,
          NODE_ENV: process.env.NODE_ENV,
          POSTGRES_PRISMA_URL: process.env.POSTGRES_PRISMA_URL,
        },
      });
    });

  return app;
};
