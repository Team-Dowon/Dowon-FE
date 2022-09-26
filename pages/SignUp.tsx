import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, SafeAreaView } from "react-native";
import { Input } from "@rneui/themed";
import PrimaryButton from "../component/PrimaryButton";
import LogoTitle from "../component/LogoTitle";
import { axios_post } from "../api/api";
import ModalWindow from "../component/ModalWindow";
import Toast from "react-native-toast-message";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function Signup({ navigation }: any) {
  const [blankModal, setBlankModal] = useState(false);
  const [coincideModal, setCoincideModal] = useState(false);
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
      setBlankModal(true);
    } else if (password !== checkpassword) {
      setCoincideModal(true);
    } else {
      axios_post("user/register", {
        u_id: userid,
        nickname: nickname,
        email: email,
        telephone: phone,
        password: password,
      })
        .then((response) => {
          console.log(response.data.message); //회원가입 성공하면 회원가입 완료라고 뜸
          Toast.show({
            type: "success",
            text1: "회원가입 완료! 🎉",
          });
          navigation.navigate("Login");
        })
        .catch(function (error) {
          console.log(error);
          console.log("회원가입 실패");
          Toast.show({
            type: "error",
            text1: "회원가입 실패 😥",
            text2: "중복된 아이디 혹은 닉네임 또는 이메일이 있습니다",
          });
        });
    }
  };

  return (
    <KeyboardAwareScrollView
      extraHeight={300}
      enableOnAndroid={true}
      contentContainerStyle={{ height: -10 }}
      resetScrollToCoords={{ x: 0, y: 0 }}
      scrollEnabled={true}
      enableAutomaticScroll={true}
      keyboardShouldPersistTaps="always"
      style={{ backgroundColor: "#ffffff" }}
    >
      <SafeAreaView style={styles.container}>
        <LogoTitle />
        <Input style={styles.input} placeholder="아이디" onChangeText={setUserId} value={userid} />
        <Input style={styles.input} placeholder="닉네임" onChangeText={setNickname} value={nickname} />
        <Input style={styles.input} placeholder="이메일" onChangeText={setEmail} value={email} />
        <Input style={styles.input} placeholder="전화번호" onChangeText={setPhone} value={phone} />
        <Input style={styles.input} placeholder="비밀번호" onChangeText={setPassword} secureTextEntry={true} value={password} />
        <Input style={styles.input} placeholder="비밀번호 확인" onChangeText={setCheckPassword} secureTextEntry={true} value={checkpassword} />
        <View style={styles.div} />
        <PrimaryButton onPress={submitSignUpData}>회원가입</PrimaryButton>
        <ModalWindow open={blankModal} okPress={() => setBlankModal(false)} text2="빈칸은 다 채우셔야합니다!" />
        <ModalWindow open={coincideModal} okPress={() => setCoincideModal(false)} text2="비밀번호가 일치하지 않습니다!" />
      </SafeAreaView>
    </KeyboardAwareScrollView>
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
