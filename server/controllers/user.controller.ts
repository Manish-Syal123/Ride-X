require("dotenv").config();
import { NextFunction, Request, Response } from "express";
import twilio from "twilio";
import prisma from "../utils/prisma";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

// Send otp via sms to the user on his provided phone number
export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { phone_number } = req.body;
    try {
      await client.verify.v2
        ?.services(process.env.TWILIO_SERVICE_SID!)
        .verifications.create({
          channel: "sms",
          to: phone_number,
        });

      res.status(201).json({
        success: true,
      });
    } catch (error) {
      console.error(error);
      res.status(400).json({
        success: false,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: false,
    });
  }
};

// OTP verification
export const verifyOtp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { phone_number, otp } = req.body;

    try {
      await client.verify.v2
        .services(process.env.TWILIO_SERVICE_SID!)
        .verificationChecks.create({
          to: phone_number,
          code: otp,
        });

      // check if user already exists in the database
      const isUserExists = await prisma.user.findUnique({
        where: {
          phone_number,
        },
      });

      if (isUserExists) {
        res.status(200).json({
          success: true,
          message: "OTP verified successfully!",
          user: isUserExists,
        });
      } else {
        // create new user/account
        const user = await prisma.user.create({
          data: {
            phone_number: phone_number,
          },
        });
        res.status(201).json({
          success: true,
          message: "OTP verified successfully",
          user: user,
        });
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({
        success: false,
        message: "Something went wrong!",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: false,
    });
  }
};

//signup new user
export const signupNewUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId, email, name } = req.body;
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (user?.email === null) {
      const updateduser = await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          name: name,
          email: email,
        },
      });

      res.status(200).json({
        success: true,
        user: updateduser,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }
  } catch (error) {
    console.log(error);
  }
};
