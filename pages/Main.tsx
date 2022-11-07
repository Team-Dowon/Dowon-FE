import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, SafeAreaView } from "react-native";
import Card from "../component/Card";
import PrimaryButton from "../component/PrimaryButton";
import { axios_post } from "../api/api";
import { Switch, Dialog } from "@rneui/themed";
import Toast from "react-native-toast-message";
import SecondButton from "../component/SecondButton";
import Spinner from "react-native-loading-spinner-overlay";

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
  const [isloading, setLoading] = useState(false);
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
            ? (Toast.show({
                type: "success",
                text1: "문장을 입력해주세요! 😥",
              }),
              setLoading(false))
            : (setResult(response.data.normalize.replace(/⠀/gi, " ")),
              checked
                ? SentimentAnalysis(response.data.normalize)
                : (Toast.show({
                    type: "success",
                    text1: "문장 변환 완료! 🎉",
                  }),
                  setLoading(false)));
        }
      })
      .catch(function (error) {
        console.log(error);
        Toast.show({
          type: "error",
          text1: "문장 변환 실패 😥",
        });
        setLoading(false);
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
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        Toast.show({
          type: "error",
          text1: "감성 분석 실패 😥",
        });
        setLoading(false);
      });
  };

  // 입력초기화를 누를 시 실행되는 함수 -> useState로 관리되는 값들을 초기 상태의 빈 값으로 바꿔줌
  function clearInput() {
    setSentence("");
    setResult("");
    setChanged(false);
    setLoading(false);
  }

  return (
    <SafeAreaView style={styles.container}>
      <CustomTextInput multiline numberOfLines={4} onChangeText={(text: any) => setSentence(text)} value={sentence} style={styles.input} />
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
      <PrimaryButton
        onPress={() => {
          Conversion(sentence);
          setLoading(true);
        }}
      >
        문장 변환
      </PrimaryButton>
      {/* 입력 초기화 버튼을 누를 시 입력된 문장, 변환된 문장 등이 초기화 되어 손 쉽게 다시 문장을 입력할 수 있음 */}
      <PrimaryButton onPress={clearInput}>입력 초기화</PrimaryButton>
      <Card>
        {result ? (
          <Text> {result} </Text>
        ) : isloading ? (
          <Spinner visible={isloading} textContent={"로딩중입니다..."} textStyle={styles.spinnerTextStyle} />
        ) : (
          <Text> 변환된 문장이 출력되는 곳 입니다. </Text>
        )}
      </Card>
      {isChanged && <Text style={styles.unlike}>결과가 마음에 드시지 않으신가요?</Text>}
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
  spinnerTextStyle: {
    color: "#FFF",
  },
});
