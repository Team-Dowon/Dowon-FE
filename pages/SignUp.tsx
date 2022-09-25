import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, SafeAreaView } from "react-native";
import { Input } from "@rneui/themed";
import { Button } from "@rneui/themed";
import PrimaryButton from "../component/PrimaryButton";
import LogoTitle from "../component/LogoTitle";
import { axios_post } from "../api/api";

export default function Signup({ navigation }: any) {
  const [userid, setUserId] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [checkpassword, setCheckPassword] = useState<string>("");

  // 회원가입 기능 연동
  const submitSignUpData = async () => {
    //modal 같은 거 만들어서 화면에 띄어주게 할 예정
    if (!(userid && nickname && email && phone && password && checkpassword)) {
      console.log("빈칸은 다 채워야함!");
    } else if (password !== checkpassword) {
      console.log("비밀번호가 일치하지 않음!");
    } else {
      axios_post("user/register", {
        u_id: userid,
        nickname: nickname,
        email: email,
        telephone: phone,
        password: password,
      })
        .then((response) => {
          // 중복되는 닉네임입니다, 중복되는 이메일입니다 메세지로 표시하고 싶은데
          // 전부다 예외처리로 들어가서 이건 좀 봐야할듯
          console.log(response.data.message); //회원가입 성공하면 회원가입 완료라고 뜸
          navigation.navigate("Login");
        })
        .catch(function (error) {
          console.log(error);
          console.log("회원가입 실패");
        });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <LogoTitle />
      <Input style={styles.input} placeholder="아이디" onChangeText={setUserId} value={userid} />
      <Input style={styles.input} placeholder="닉네임" onChangeText={setNickname} value={nickname} />
      <Input style={styles.input} placeholder="이메일" onChangeText={setEmail} value={email} />
      <Input style={styles.input} placeholder="전화번호" onChangeText={setPhone} value={phone} />
      <Input style={styles.input} placeholder="비밀번호" onChangeText={setPassword} value={password} />
      <Input style={styles.input} placeholder="비밀번호 확인" onChangeText={setCheckPassword} value={checkpassword} />
      <View style={styles.div} />
      <PrimaryButton onPress={submitSignUpData}>회원가입</PrimaryButton>
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
  input: {
    width: "70%",
    height: 40,
    padding: 5,
  },
  div: {
    marginTop: 12,
  },
});
