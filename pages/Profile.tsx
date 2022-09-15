import React from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { basic_theme } from "../theme";
import PrimaryButton from "../component/PrimaryButton";
// import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function Profile({ navigation }: any) {
  function goToLogin() {
    navigation.navigate("Login");
  }

  function goToSignUp() {
    navigation.navigate("SignUp");
  }
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>로그인을 해주세요</Text>
      <PrimaryButton onPress={goToLogin}>로그인 </PrimaryButton>
      <Text style={styles.text}>아이디가 없으면?</Text>
      <PrimaryButton onPress={goToSignUp}>회원가입</PrimaryButton>
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
    fontSize: 30,
    fontFamily: "notosanskr-bold",
    fontWeight: "400",
    color: "black",
    textAlign: "center",
  },
  logo: {
    width: 100,
    height: 100,
  },
});
