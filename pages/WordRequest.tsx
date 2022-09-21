import React, { useState, useContext } from "react";
import { StyleSheet, Text, View, SafeAreaView, TextInput } from "react-native";
import { Input } from "@rneui/themed";
import { basic_theme } from "../theme";
import PrimaryButton from "../component/PrimaryButton";
import { axios_post } from "../api/api";
import UserContext from "../service/UserContext";

export default function WordRequest() {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [name, setName] = useState<string>("");
  const userContext = useContext(UserContext); // 전역변수 사용하기 위한 변수

  const addStart = async ({ navigation }: any) => {
    if (!userContext.userlogin) {
      console.log("로그인 하셔야합니다!");
    } else if (!(title && content && name)) {
      console.log("빈칸은 다 채워야함!");
    } else {
      axios_post("request", {
        title: title,
        content: content,
        name: name,
      })
        .then(async (response) => {
          console.log(response.data); //request 게시 완료
          navigation.navigate("Profile");
        })
        .catch(function (error) {
          console.log(error);
          console.log("신조어 요청 실패");
        });
    }
    console.log("단어 등록 실행");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Input
        style={styles.little}
        placeholder="요청 제목"
        onChangeText={setTitle}
        value={title}
      />
      <TextInput
        style={styles.input}
        placeholder="요청 내용"
        onChangeText={setContent}
        value={content}
      />
      <Input
        style={styles.little}
        placeholder="요청 단어"
        onChangeText={setName}
        value={name}
      />
      <PrimaryButton onPress={addStart}>등록하기</PrimaryButton>
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
  input: {
    width: "70%",
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  little: {
    width: "70%",
    height: 40,
    padding: 5,
  },
});
