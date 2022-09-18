import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { basic_theme } from "../theme";
import PrimaryButton from "../component/PrimaryButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";

export default function Profile({ navigation }: any) {
  const [userlogin, setUserlogin] = useState<boolean>(false);
  const isFocused = useIsFocused();

  const islogin = async (key: string) => {
    try {
      const token = await AsyncStorage.getItem(key);
      if (token !== null) {
        setUserlogin(true);
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    islogin("access");
  }, [isFocused]);

  function goToLogin() {
    navigation.navigate("Login");
  }

  function goToSignUp() {
    navigation.navigate("SignUp");
  }

  const logouthandler = async (key: string) => {
    try {
      await AsyncStorage.removeItem(key);
      setUserlogin(false);
      console.log("로그아웃 완료");
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {userlogin ? (
        <PrimaryButton onPress={() => logouthandler("access")}>
          로그아웃
        </PrimaryButton>
      ) : (
        <>
          <Text style={styles.text}>로그인을 해주세요</Text>
          <PrimaryButton onPress={goToLogin}>로그인 </PrimaryButton>
          <Text style={styles.text}>아이디가 없으면?</Text>
          <PrimaryButton onPress={goToSignUp}>회원가입</PrimaryButton>
        </>
      )}
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
