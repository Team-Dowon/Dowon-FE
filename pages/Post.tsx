import React, { useState } from "react";
import { StyleSheet, Text, View, SafeAreaView, TextInput } from "react-native";
import { Input } from "@rneui/themed";
import { Button } from "@rneui/themed";
import { basic_theme } from "../theme";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function Post() {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

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
      <Button
        containerStyle={{
          width: "80%",
        }}
        buttonStyle={{
          backgroundColor: basic_theme.buttoncolor,
          borderColor: "white",
          borderRadius: 10,
        }}
        titleStyle={{
          fontWeight: "bold",
          fontSize: 20,
        }}
        title="등록하기"
      />
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
