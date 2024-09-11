import express from "express";
import {
  registerUser,
  sendingOtpToEmail,
  verifyingEmail,
  verifyOtp,
} from "../controllers/user.controller";

const userRouter = express.Router();

userRouter.post("/registration", registerUser); // this is actually login route (mistakenly named--> registration, registerUser)

userRouter.post("/verify-otp", verifyOtp);

userRouter.post("/email-otp-request", sendingOtpToEmail);

userRouter.put("/email-otp-verify", verifyingEmail);

export default userRouter;
