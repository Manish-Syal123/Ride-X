import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import styles from "./styles";
import { commonStyles } from "@/styles/common.style";
import { external } from "@/styles/external.style";
import LocationSearchBar from "@/components/location/location.search.bar";

const HomeScreen = () => {
  return (
    <View style={[commonStyles.flexContainer, { backgroundColor: "#fff" }]}>
      <SafeAreaView style={styles.container}>
        {/* header */}
        <View style={[external.p_5, external.ph_20]}>
          <Text
            style={{
              fontFamily: "TT-Octosquares-Medium",
              fontSize: 25,
            }}
          >
            Ride Wave
          </Text>
          <LocationSearchBar />
        </View>
        {/* body */}
        <View></View>
      </SafeAreaView>
    </View>
  );
};

export default HomeScreen;
