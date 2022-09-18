import React, { useState } from "react";
import { StyleSheet, Text, View, SafeAreaView, TextInput } from "react-native";
import { Input } from "@rneui/themed";
import PrimaryButton from "../component/PrimaryButton";
import { basic_theme } from "../theme";

export default function Post() {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  function postHandler() {
    console.log("게시글 등록");
  }

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
