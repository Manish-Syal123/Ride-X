import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import prisma from "../utils/prisma";

export const isAuthenticated = (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    // Extract the access token from the Authorization headers
    const accessToken = req.headers.authorization;
    if (!accessToken) {
      return res
        .status(401)
        .json({ message: "Please Login to access this content" });
    }
    const token = accessToken.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Token not found" });
    }

    // verify the token
    jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET!,
      async (err: any, decoded: any) => {
        if (err) {
          return res.status(401).json({ message: "Invalid token" });
        }

        const userData = await prisma.user.findUnique({
          where: {
            id: decoded.id,
          },
        });
        // Attach the user data to the request object
        req.user = userData;
        next();
      }
    );
  } catch (error) {
    console.error(error);
  }
};
