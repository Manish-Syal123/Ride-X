import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import AuthContainer from "@/utils/container/auth-container";
import { windowHeight } from "@/themes/app.constant";
import SignInText from "@/components/login/signin.text";
import OTPTextInput from "react-native-otp-textinput";
import { style } from "./styles";
import color from "@/themes/app.colors";
import { external } from "@/styles/external.style";
import Button from "@/components/common/button";
import { router, useLocalSearchParams } from "expo-router";
import { commonStyles } from "@/styles/common.style";
import { useToast } from "react-native-toast-notifications";
import axios from "axios";

const OtpVerificationScreen = () => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const { phoneNumber } = useLocalSearchParams();
  const handleSubmit = async () => {
    if (otp === "") {
      toast.show("Please enter enter your OTP", {
        placement: "bottom",
      });
    } else {
      setLoading(true);
      const otpNumbers = `${otp}`;
      // console.log(otpNumbers, "<---->", phoneNumber);

      await axios
        .post(`${process.env.EXPO_PUBLIC_SERVER_URI}/verify-otp`, {
          phone_number: phoneNumber,
          otp: otpNumbers,
        })
        .then((res) => {
          setLoading(false);
          // console.log(res);
          if (res.data.user.email === null) {
            router.push({
              pathname: "/(routes)/registration",
              params: { user: JSON.stringify(res.data.user) },
            });
            toast.show("Account verified successfully!", {
              type: "success",
              placement: "bottom",
            });
          } else {
            router.push("/(tabs)/home");
          }
        })
        .catch((err) => {
          setLoading(false);
          toast.show("Something went wrong! Please enter correct OTP", {
            type: "danger",
            placement: "bottom",
          });
        });
    }
  };

  return (
    <AuthContainer
      topSpace={windowHeight(150)}
      imageShow={false}
      container={
        <View>
          <SignInText
            title="OTP verification"
            subtitle="Check your phone number for OTP"
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

export default OtpVerificationScreen;
