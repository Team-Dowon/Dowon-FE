import React, { useState, useContext } from "react";
import { StyleSheet, Text, View, SafeAreaView, TextInput } from "react-native";
import { Input } from "@rneui/themed";
import PrimaryButton from "../component/PrimaryButton";
import { basic_theme } from "../theme";
import { axios_post } from "../api/api";
import UserContext from "../service/UserContext";

export default function Post({ navigation }: any) {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const userContext = useContext(UserContext); // 전역변수 사용하기 위한 변수

  const postHandler = async () => {
    if (!userContext.userlogin) {
      console.log("로그인 하셔야합니다!");
    } else if (!(title && content)) {
      console.log("빈칸은 다 채워야함!");
    } else {
      axios_post("post", {
        title: title,
        content: content,
      })
        .then(async (response) => {
          console.log(response.data); //post 완료
          navigation.navigate("Community");
        })
        .catch(function (error) {
          console.log(error);
          console.log("게시 실패");
        });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Input
        style={styles.title}
        placeholder="제목을 입력하세요"
        onChangeText={setTitle}
        value={title}
      />
      <TextInput
        style={styles.input}
        placeholder="내용을 입력하세요"
        onChangeText={setContent}
        value={content}
      />
      <PrimaryButton onPress={postHandler}>등록하기</PrimaryButton>
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
  title: {
    width: "70%",
    height: 40,
    padding: 5,
  },
});
