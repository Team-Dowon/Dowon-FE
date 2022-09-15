import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, SafeAreaView } from "react-native";
import Card from "../component/Card";
import PrimaryButton from "../component/PrimaryButton";
import { basic_theme } from "../theme";

const CustomTextInput = (props: any) => {
  return (
    <TextInput
      {...props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
      editable
      maxLength={100}
      placeholder="문장을 입력하세요. (길이 제한 100자)"
    />
  );
};

export default function Main() {
  const [sentence, setSentence] = useState<string>("");

  return (
    <SafeAreaView style={styles.container}>
      <CustomTextInput
        multiline
        numberOfLines={4}
        onChangeText={(text: any) => setSentence(text)}
        value={sentence}
        style={styles.input}
      />
      <PrimaryButton>문장 변환</PrimaryButton>
      <Card>
        <Text>변환된 문장이 출력되는 곳 입니다.</Text>
      </Card>
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
    fontSize: 10,
    fontFamily: "notosanskr-bold",
    fontWeight: "400",
    color: "black",
    textAlign: "left",
  },
  input: {
    width: "80%",
    height: 200,
    padding: 10,
    margin: 12,
    borderWidth: 1,
    elevation: 3,
  },
});
