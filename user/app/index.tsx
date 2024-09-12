import AsyncStorage from "@react-native-async-storage/async-storage";
import { Redirect } from "expo-router";
import { useEffect, useState } from "react";

export default function index() {
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const accessToken = await AsyncStorage.getItem("accessToken"); // we have set this key in email.verification.screen.tsx
        if (accessToken) {
          setisLoggedIn(true);
        } else {
          setisLoggedIn(false);
        }
      } catch (error) {
        console.error(
          "Failed to retrieve access token from AsyncStorage",
          error
        );
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  if (isLoading) {
    return null; // TODO : Add loading spinner here
  }

  return (
    <Redirect href={!isLoggedIn ? "/(routes)/onboarding" : "/(tabs)/home"} />
  );
}
