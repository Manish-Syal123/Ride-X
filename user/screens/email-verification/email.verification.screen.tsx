import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams } from "expo-router";
import AuthContainer from "@/utils/container/auth-container";
import { windowHeight } from "@/themes/app.constant";
import SignInText from "@/components/login/signin.text";
import { commonStyles } from "@/styles/common.style";
import { external } from "@/styles/external.style";
import Button from "@/components/common/button";
import color from "@/themes/app.colors";
import { style } from "../verification/styles";
import { useToast } from "react-native-toast-notifications";
import OTPTextInput from "react-native-otp-textinput";
import axios from "axios";

const EmailVerificationScreen = () => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const { phoneNumber } = useLocalSearchParams();

  const { user } = useLocalSearchParams() as any;
  const parsedUser = JSON.parse(user);
  console.log(parsedUser);

  const handleSubmit = async () => {
    const otpNumbers = `${otp}`;
    await axios
      .put(`${process.env.EXPO_PUBLIC_SERVER_URI}/email-otp-verify`, {
        token: parsedUser?.token,
        otp: otpNumbers,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <AuthContainer
      topSpace={windowHeight(150)}
      imageShow={false}
      container={
        <View>
          <SignInText
            title="Email verification"
            subtitle="Check your  email address for the OTP"
          />
          <OTPTextInput
            handleTextChange={(code) => setOtp(code)}
            inputCount={4}
            textInputStyle={style.otpTextInput}
            tintColor={color.subtitle}
            autoFocus={false}
          />
          <View style={[external.mt_30, external.Pb_20]}>
            <Button
              title="Verify"
              onPress={() => handleSubmit()}
              disabled={loading}
            />
          </View>
          <View style={[external.mb_15]}>
            <View
              style={[
                external.pt_10,
                external.Pb_10,
                { flexDirection: "row", gap: 5, justifyContent: "center" },
              ]}
            >
              <Text style={[commonStyles.regularText]}>
                Didn't receive code?
              </Text>
              <TouchableOpacity>
                <Text
                  style={[style.signUpText, { color: "#6988E7" }]}
                >{`Resend`}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      }
    />
  );
};

export default EmailVerificationScreen;
