import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import React from "react";
import color from "@/themes/app.colors";
import Swiper from "react-native-swiper";
import { styles } from "./styles";
import { slides } from "@/configs/constants";
import Images from "@/utils/images";
import { router } from "expo-router";
import { BackArrow } from "@/utils/icons";

const OnBoardingScreen = () => {
  return (
    <View style={{ flex: 1, backgroundColor: color.whiteColor }}>
      <Swiper
        activeDotStyle={styles.activeStyle}
        removeClippedSubviews={true}
        paginationStyle={styles.paginationStyle}
      >
        {slides.map((slide: any, index: number) => (
          <View style={[styles.slideContainer]} key={index}>
            <Image style={styles.imageBackground} source={slide.image} />
            <View style={[styles.imageBgView]}>
              <ImageBackground
                resizeMode="stretch"
                style={styles.img}
                source={Images.bgOnboarding}
              >
                <Text style={styles.title}>{slide.text}</Text>
                <Text style={styles.description}>{slide.description}</Text>
                <TouchableOpacity
                  // style={styles.backArrow}
                  style={{
                    backgroundColor: "green",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: 10,
                    borderRadius: 20,
                    width: 80,
                    marginHorizontal: "auto",
                    marginTop: 50,
                  }}
                  onPress={() => router.push("/(routes)/login")}
                >
                  {/* <BackArrow colors={color.whiteColor} width={21} height={21} /> */}
                  <Text style={{ color: color.whiteColor }}>Skip</Text>
                </TouchableOpacity>
              </ImageBackground>
            </View>
          </View>
        ))}
      </Swiper>
    </View>
  );
};

export default OnBoardingScreen;
