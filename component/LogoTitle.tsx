import React from "react";
import { Image } from "react-native";

// logo 사진 띄우게 하는 module
export default function LogoTitle() {
  return (
    <Image
      style={{ width: 150, height: 150, marginBottom: 20 }}
      source={require("../assets/logo.png")}
      resizeMode="contain"
    />
  );
}
