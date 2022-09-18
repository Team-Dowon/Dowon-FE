import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, SafeAreaView } from "react-native";
import { Input } from "@rneui/themed";
import PrimaryButton from "../component/PrimaryButton";
import { basic_theme } from "../theme";
import LogoTitle from "../component/LogoTitle";
import { axios_post } from "../api/api";

export default function Login({ navigation }: any) {
  const [userid, setUserId] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  // 로그인 기능 연동
  const logInHandler = async () => {
    //modal 같은 거 만들어서 화면에 띄어주게 할 예정
    if (!(userid && password)) {
      console.log("빈칸은 다 채워야함!");
    } else {
      axios_post("user/login", {
        u_id: userid,
        password: password,
      })
        .then((response) => {
          // 어떤 식으로 오류나는지 메세지로 표시하고 싶은데 아직 잘 안됨 일단 보류
          console.log(response.data.message); //로그인 성공하면 로그인 완료라고 뜸
          console.log(response.data.nickname);
          console.log(response.data.refresh);
          console.log(response.data.access);
          navigation.navigate("Profile");
        })
        .catch(function (error) {
          console.log(error);
          console.log("로그인 실패");
        });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <LogoTitle />
      <Input style={styles.input} placeholder="아이디" onChangeText={setUserId} value={userid} />
      <Input style={styles.input} placeholder="비밀번호" onChangeText={setPassword} value={password} />
      <View style={styles.div} />
      <PrimaryButton onPress={logInHandler}>로그인</PrimaryButton>
      <View>
        <Text style={styles.text}>
          {"아이디가 없으면? "}
          <Text style={styles.navitext} onPress={() => navigation.navigate("SignUp")}>
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
