import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import PrimaryButton from "../component/PrimaryButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import UserContext from "../service/UserContext";
import { axios_post, axios_get } from "../api/api";
import Toast from "react-native-toast-message";

export default function Profile({ navigation }: any) {
  const isFocused = useIsFocused(); // navigation으로 화면 이동시 새로고침하기 위해
  const userContext = useContext(UserContext); // 전역변수 사용하기 위한 변수

  // 로그인 여부 확인
  const islogin = async (key: string) => {
    try {
      const token = await AsyncStorage.getItem(key);
      if (token !== null) {
        userContext.setUserlogin(true);
        getUserData("access");
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  // 유저정보 가져오기
  const getUserData = async (key: string) => {
    axios_post("user", {
      Token: await AsyncStorage.getItem(key),
    })
      .then((response) => {
        console.log("유저정보 불러오기 완료");
        console.log(response.data);
        userContext.setUserId(response.data.u_id);
        userContext.setUserName(response.data.nickname);
        userContext.setUserEmail(response.data.email);
      })
      .catch(function (error) {
        console.log("유저정보 못가져옴");
        console.log(error.message);
      });
  };

  //로그아웃
  const logouthandler = async (key: string) => {
    axios_post("user/logout", {
      Token: await AsyncStorage.getItem(key),
    })
      .then((response) => {
        console.log(response.data.message); //로그아웃 성공하면 로그아웃 완료라고 뜸
        AsyncStorage.clear();
        userContext.setUserlogin(false);
        userContext.setUserId("");
        userContext.setUserName("");
        userContext.setUserEmail("");
        Toast.show({
          type: "success",
          text1: "로그아웃되었습니다! 🖐",
        });
      })
      .catch(function (error) {
        console.log(error);
        console.log(error.message);
      });
  };

  function goToLogin() {
    navigation.navigate("Login");
  }

  function goToSignUp() {
    navigation.navigate("SignUp");
  }

  function reset() {
    AsyncStorage.clear();
    userContext.setUserlogin(false);
    userContext.setUserId("");
    userContext.setUserName("");
    userContext.setUserEmail("");
    Toast.show({
      type: "success",
      text1: "로그아웃되었습니다! 🖐",
    });
  }

  useEffect(() => {
    islogin("access");
  }, [isFocused]);

  return (
    <SafeAreaView style={styles.container}>
      {userContext.userlogin ? (
        <>
          <Text style={styles.text}>안녕하세요! {userContext.username}님</Text>
          <PrimaryButton onPress={() => logouthandler("access")}>
            로그아웃
          </PrimaryButton>
          <View style={{ marginTop: 20 }}>
            <Text style={styles.text}>
              <Text style={styles.navitext} onPress={reset}>
                {"로그아웃이 안될경우 클릭"}
              </Text>
            </Text>
          </View>
        </>
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
    backgroundColor: "DEE8FF",
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
  navitext: {
    fontSize: 15,
    fontFamily: "notosanskr-medium",
    color: "#a1a09e",
  },
});
