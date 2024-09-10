import { View, Text, Image } from "react-native";
import React, { useState } from "react";
import AuthContainer from "@/utils/container/auth-container";
import { windowHeight } from "@/themes/app.constant";
import styles from "./styles";
import Images from "@/utils/images";
import SignInText from "@/components/login/signin.text";
import { external } from "@/styles/external.style";
import PhoneNumberInput from "@/components/login/phone-number.input";
import { useToast } from "react-native-toast-notifications";
import Button from "@/components/common/button";
import { router } from "expo-router";
import axios from "axios";

const LoginScreen = () => {
  const [phone_number, setPhone_number] = useState("");
  const [countryCode, setCountryCode] = useState("91");
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleSubmit = async () => {
    if (phone_number === "" || countryCode === "") {
      toast.show("Please enter phone number and country code", {
        placement: "bottom",
      });
    } else {
      setLoading(true);
      const phoneNumber = `+${countryCode}${phone_number}`;

      await axios
        .post(`${process.env.EXPO_PUBLIC_SERVER_URI}/registration`, {
          phone_number: phoneNumber,
        })
        .then((res) => {
          setLoading(false);
          console.log(res);

          router.push({
            pathname: "/(routes)/otp-verification",
            params: { phoneNumber },
          });
        })
        .catch((err) => {
          setLoading(false);
          toast.show(
            "Something went wrong! Please re-check your phone number",
            {
              type: "danger",
              placement: "bottom",
            }
          );
        });
    }
  };
  return (
    <AuthContainer
      topSpace={windowHeight(150)}
      imageShow={true}
      container={
        <View>
          <View>
            <View>
              <Image style={styles.transformLine} source={Images.line} />
              <SignInText />
              <View style={[external.mt_25, external.Pb_10]}>
                <PhoneNumberInput
                  phone_number={phone_number}
                  setPhone_number={setPhone_number}
                  countryCode={countryCode}
                  setCountryCode={setCountryCode}
                />
                <View style={[external.mt_25, external.Pb_15]}>
                  <Button
                    title="Get Otp"
                    onPress={() => handleSubmit()}
                    disabled={loading}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
      }
    />
  );
};

export default LoginScreen;
