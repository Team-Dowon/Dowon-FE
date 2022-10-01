import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, SafeAreaView } from "react-native";
import Card from "../component/Card";
import PrimaryButton from "../component/PrimaryButton";
import { axios_post } from "../api/api";
import Toast from "react-native-toast-message";

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
  const [result, setResult] = useState<string>("");

  // 신조어 문장 변환(임시 아직 개발중)
  const Conversion = async (key: string) => {
    axios_post("sentence", {
      text: key,
    })
      .then(async (response) => {
        console.log(response.data); //변환 완료
        setResult(response.data.normalize);
        Toast.show({
          type: "success",
          text1: "문장 변환 완료! 🎉",
        });
      })
      .catch(function (error) {
        console.log(error);
        Toast.show({
          type: "error",
          text1: "문장 변환 실패 😥",
        });
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomTextInput
        multiline
        numberOfLines={4}
        onChangeText={(text: any) => setSentence(text)}
        value={sentence}
        style={styles.input}
      />
      <PrimaryButton onPress={() => Conversion(sentence)}>
        문장 변환
      </PrimaryButton>
      <Card>
        {result ? (
          <Text> {result} </Text>
        ) : (
          <Text>변환된 문장이 출력되는 곳 입니다. {result} </Text>
        )}
      </Card>
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
