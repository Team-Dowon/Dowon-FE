import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, SafeAreaView } from "react-native";
import PrimaryButton from "../component/PrimaryButton";

export default function WordExtract({ navigation }: any) {
  const [sentence, setSentence] = useState<string>("");

  function extractStart() {
    console.log("신조어 추출 버튼 눌림");
  }

  function RequestList() {
    navigation.navigate("RequestList");
  }

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="문장을 입력해 주세요"
        onChangeText={setSentence}
        value={sentence}
      />
      <PrimaryButton onPress={extractStart}>신조어 추출</PrimaryButton>
      <PrimaryButton onPress={RequestList}>신조어 등록 요청</PrimaryButton>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
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
  input: {
    width: "70%",
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
