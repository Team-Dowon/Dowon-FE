import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, SafeAreaView } from "react-native";
import Card from "../component/Card";
import PrimaryButton from "../component/PrimaryButton";
import { axios_post } from "../api/api";
import { Switch } from "@rneui/themed";
import Toast from "react-native-toast-message";
import SecondButton from "../component/SecondButton";

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

export default function Main({ navigation }: any) {
  const [sentence, setSentence] = useState<string>("");
  const [result, setResult] = useState<string>("");
  const [checked, setChecked] = useState(false);
  const [isChanged, setChanged] = useState(false);
  // 신조어 문장 변환
  const Conversion = async (key: string) => {
    axios_post("sentence", {
      text: key,
    })
      .then(async (response) => {
        console.log(response.data); //변환 완료
        {
          response.data.normalize === ""
            ? Toast.show({
                type: "success",
                text1: "문장을 입력해주세요! 😥",
              })
            : // 감성 분석 키면 문장 변환 완료 메세지가 안뜨게 했는데 뜨게 할까 고민중
              (setResult(response.data.normalize.replace(/⠀/gi, " ")),
              checked
                ? SentimentAnalysis(response.data.normalize)
                : Toast.show({
                    type: "success",
                    text1: "문장 변환 완료! 🎉",
                  }));
        }
      })
      .catch(function (error) {
        console.log(error);
        Toast.show({
          type: "error",
          text1: "문장 변환 실패 😥",
        });
      });
    if (sentence.length != 0) setChanged(true);
  };

  // 신조어 문장 감성 분석
  const SentimentAnalysis = async (key: string) => {
    axios_post("test", {
      sentence: key,
    })
      .then(async (response) => {
        console.log(response.data); //감성 분석 완료
        Toast.show({
          type: "success",
          text1: `이 문장은 ${response.data.예측값}으로 보여집니다!`,
        });
      })
      .catch(function (error) {
        console.log(error);
        Toast.show({
          type: "error",
          text1: "감성 분석 실패 😥",
        });
      });
  };

  function clearInput() {
    setSentence("");
    setResult("");
    setChanged(false);
  }

  return (
    <SafeAreaView style={styles.container}>
      <CustomTextInput
        multiline
        numberOfLines={4}
        onChangeText={(text: any) => setSentence(text)}
        value={sentence}
        style={styles.input}
      />
      <View style={styles.emotion}>
        <Switch
          value={checked}
          onValueChange={(value) => {
            setChecked(value);
          }}
          color="#640233"
        />
        <Text>감성 분석</Text>
      </View>
      <PrimaryButton onPress={() => Conversion(sentence)}>
        문장 변환
      </PrimaryButton>
      <PrimaryButton onPress={clearInput}>입력 초기화</PrimaryButton>
      <Card>
        {result ? (
          <Text> {result} </Text>
        ) : (
          <Text>변환된 문장이 출력되는 곳 입니다. </Text>
        )}
      </Card>
      {isChanged && (
        <Text style={styles.unlike}>결과가 마음에 드시지 않으신가요?</Text>
      )}
      {isChanged && (
        <SecondButton
          onPress={() => {
            navigation.navigate("UnlikeChange"), clearInput();
          }}
        >
          클릭해주세요!
        </SecondButton>
      )}
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
    backgroundColor: "#ffffff",
    borderColor: "green",
    borderRadius: 15,
  },
  unlike: {
    marginVertical: 15,
    fontSize: 12,
  },
  invalidInput: {
    backgroundColor: "#fcc4e4",
  },
  emotion: {
    flexDirection: "row",
    alignItems: "center",
  },
});
