import { View, Text, TextInput } from "react-native";
import { commonStyles } from "@/styles/common.style";
import { windowHeight, windowWidth } from "@/themes/app.constant";
import { external } from "@/styles/external.style";
import styles from "@/screens/login/styles";
import color from "@/themes/app.colors";
import SelectInput from "../common/select-input";
import { useState } from "react";
import { countryItems } from "@/configs/country-list";

interface Props {
  width?: number;
  phone_number: string;
  setPhone_number: (phone_number: string) => void;
  countryCode: string;
  setCountryCode: (countryCode: string) => void;
}

export default function PhoneNumberInput({
  width,
  phone_number,
  setPhone_number,
  countryCode,
  setCountryCode,
}: Props) {
  return (
    <View>
      <Text
        style={[commonStyles.mediumTextBlack, { marginTop: windowHeight(8) }]}
      >
        Phone Number
      </Text>
      <View
        style={[
          external.fd_row,
          external.ai_center,
          external.mt_5,
          { flexDirection: "row" },
        ]}
      >
        <View
          style={[
            styles.countryCodeContainer,
            {
              borderColor: color.border,
              paddingVertical: windowHeight(9),
            },
          ]}
        >
          <SelectInput
            title="+91"
            placeholder={countryCode}
            value={countryCode}
            onValueChange={setCountryCode}
            showWarning={false}
            warning={"Please choose your country code"}
            items={countryItems}
          />
        </View>
        <View
          style={[
            styles.phoneNumberInput,
            {
              width: width || windowWidth(326),
              borderColor: color.border,
            },
          ]}
        >
          <TextInput
            style={[commonStyles.regularText]}
            placeholderTextColor={color.subtitle}
            placeholder={"Enter your number"}
            keyboardType="numeric"
            value={phone_number}
            onChangeText={(text) => setPhone_number(text)}
            maxLength={10}
          />
        </View>
      </View>
    </View>
  );
}
