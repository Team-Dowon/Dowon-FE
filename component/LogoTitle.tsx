import React from "react";
import { Image } from "react-native";

export default function LogoTitle() {
  return <Image style={{ width: 150, height: 150, marginBottom: 20 }} source={require("../assets/logo.png")} resizeMode="contain" />;
}
