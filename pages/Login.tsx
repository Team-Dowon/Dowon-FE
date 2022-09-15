import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, SafeAreaView } from "react-native";
import { Input } from "@rneui/themed";
import PrimaryButton from "../component/PrimaryButton";
import { basic_theme } from "../theme";
import LogoTitle from "../component/LogoTitle";

export default function Login({ navigation }: any) {
  const [userid, setUserId] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  function logInHandler() {
    console.log("로그인 실행");
  }

  return (
    <SafeAreaView style={styles.container}>
      <LogoTitle />
      <Input
        style={styles.input}
        placeholder="아이디"
        onChangeText={setUserId}
        value={userid}
      />
      <Input
        style={styles.input}
        placeholder="비밀번호"
        onChangeText={setPassword}
        value={password}
      />
      <View style={styles.div} />
      <PrimaryButton onPress={logInHandler}>로그인</PrimaryButton>
      <View>
        <Text style={styles.text}>
          {"아이디가 없으면? "}
          <Text
            style={styles.navitext}
            onPress={() => navigation.navigate("SignUp")}
          >
            {"회원가입"}
          </Text>
        </Text>
      </View>
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
    fontSize: 20,
    fontFamily: "notosanskr-regular",
    color: "black",
    textAlign: "center",
  },
  navitext: {
    fontSize: 20,
    fontFamily: "notosanskr-bold",
    color: "#FF7F00",
  },
  input: {
    width: "70%",
    height: 40,
    padding: 5,
  },
  div: {
    marginTop: 12,
  },
});
