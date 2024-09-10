import express from "express";
import {
  registerUser,
  signupNewUser,
  verifyOtp,
} from "../controllers/user.controller";

const userRouter = express.Router();

userRouter.post("/registration", registerUser); // this is actually login route (mistakenly named--> registration, registerUser)
userRouter.post("/verify-otp", verifyOtp);
userRouter.put("/sign-up-user", signupNewUser);

export default userRouter;
