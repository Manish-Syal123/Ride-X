import { View, Text } from "react-native";
import React from "react";
import useGetUserData from "@/hooks/useGetUserData";

export default function _layout() {
  const { loading, user } = useGetUserData();
  console.log(loading, user);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>{user?.name}</Text>
    </View>
  );
}
