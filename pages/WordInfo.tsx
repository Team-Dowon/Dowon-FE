import React from "react";
import { StyleSheet, Text, View, SafeAreaView, Dimensions } from "react-native";
import { basic_theme } from "../theme";

type Slangtype = {
  name: string;
  mean: string;
  example: string;
  replace: string;
};

export default function WordInfo() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>{ListSlang[0].name}</Text>
      <Text style={styles.text}>{ListSlang[0].mean}</Text>
      <Text style={styles.text}>{ListSlang[0].example}</Text>
      <Text style={styles.text}>{ListSlang[0].replace}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: basic_theme.bgColor,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 48,
    fontFamily: "notosanskr-bold",
    fontWeight: "400",
    color: "black",
    textAlign: "center",
  },
  logo: {
    width: 100,
    height: 100,
  },
});

//임시 더미데이터
const ListSlang: Slangtype[] = [
  {
    name: "가즈아",
    mean: "몰?루",
    example: "몰?루",
    replace: "몰?루",
  },
  {
    name: "가봉맨",
    mean: "몰?루",
    example: "몰?루",
    replace: "몰?루",
  },
  {
    name: "급식충",
    mean: "몰?루",
    example: "몰?루",
    replace: "몰?루",
  },
  {
    name: "가불기",
    mean: "몰?루",
    example: "몰?루",
    replace: "몰?루",
  },
  {
    name: "갑분싸",
    mean: "몰?루",
    example: "몰?루",
    replace: "몰?루",
  },
  {
    name: "개돼지",
    mean: "몰?루",
    example: "몰?루",
    replace: "몰?루",
  },
  {
    name: "고소미",
    mean: "몰?루",
    example: "몰?루",
    replace: "몰?루",
  },
  {
    name: "관종",
    mean: "몰?루",
    example: "몰?루",
    replace: "몰?루",
  },
  {
    name: "귀두컷",
    mean: "몰?루",
    example: "몰?루",
    replace: "몰?루",
  },
  {
    name: "극혐",
    mean: "몰?루",
    example: "몰?루",
    replace: "몰?루",
  },
  {
    name: "극딜",
    mean: "몰?루",
    example: "몰?루",
    replace: "몰?루",
  },
  {
    name: "근자감",
    mean: "몰?루",
    example: "몰?루",
    replace: "몰?루",
  },
  {
    name: "깜놀",
    mean: "몰?루",
    example: "몰?루",
    replace: "몰?루",
  },
  {
    name: "깐부",
    mean: "몰?루",
    example: "몰?루",
    replace: "몰?루",
  },
  {
    name: "꿀벅지",
    mean: "몰?루",
    example: "몰?루",
    replace: "몰?루",
  },
  {
    name: "꿀잼",
    mean: "몰?루",
    example: "몰?루",
    replace: "몰?루",
  },
  {
    name: "끌올",
    mean: "몰?루",
    example: "몰?루",
    replace: "몰?루",
  },
];
