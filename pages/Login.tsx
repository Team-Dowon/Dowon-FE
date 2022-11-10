import React, { useState } from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Input } from "@rneui/themed";
import PrimaryButton from "../component/PrimaryButton";
import ModalWindow from "../component/ModalWindow";
import LogoTitle from "../component/LogoTitle";
import { axios_post } from "../api/api";
import Toast from "react-native-toast-message";
import axios from "axios";

// 사용자가 앱에 로그인 하는 모듈
export default function Login({ navigation }: any) {
  // 유저 id, password, 로그인 모달에 따른 설정값 설정 -> useState
  const [userid, setUserId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loginModal, setLoginModal] = useState(false);

  // Bearer 토큰을 이용한 로그인 기능 연동
  const logInHandler = async () => {
    if (!(userid && password)) {
      setLoginModal(true);
    } else {
      axios_post("user/login", {
        u_id: userid,
        password: password,
      })
        .then(async (response) => {
          await AsyncStorage.setItem("access", response.data.access);
          await AsyncStorage.setItem("refresh", response.data.refresh);
          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${response.data.access}`;
          navigation.navigate("Profile");
          //console.log(response.data);
          Toast.show({
            type: "success",
            text1: `로그인되었습니다 ${response.data.nickname}님! 😊`,
          });
        })
        .catch(function (error) {
          //console.log(error);
          //console.log("로그인 실패");
          Toast.show({
            type: "error",
            text1: "로그인 실패 😥",
            text2: "아이디가 없거나 비밀번호가 일치하지 않습니다",
          });
        });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <LogoTitle />
      {/* 아이디와 비밀번호는 Input에 설정된 onChangeText와 value를 통해 관리되며 로그인 함수인 logInHandler에 의해 활용됨 */}
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
        secureTextEntry={true}
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
      <ModalWindow
        open={loginModal}
        okPress={() => setLoginModal(false)}
        text2="빈칸을 다 채워주세요!"
      />
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
