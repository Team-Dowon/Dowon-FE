import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, Text, View, SafeAreaView, TextInput } from "react-native";
import { Input } from "@rneui/themed";
import PrimaryButton from "../component/PrimaryButton";
import { axios_post, axios_put, axios_get } from "../api/api";
import UserContext from "../service/UserContext";

export default function WordRequest({ navigation, route }: any) {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [name, setName] = useState<string>("");
  const userContext = useContext(UserContext); // 전역변수 사용하기 위한 변수

  //신조어 요청
  const RequestHandler = async () => {
    if (!userContext.userlogin) {
      console.log("로그인 하셔야합니다!");
    } else if (!(title && content && name)) {
      console.log("빈칸은 다 채워야함!");
    } else {
      axios_post("request", {
        title: title,
        content: content,
        name: name,
      })
        .then(async (response) => {
          console.log(response.data); //request 게시 완료
          navigation.navigate("RequestList");
        })
        .catch(function (error) {
          console.log(error);
          console.log("신조어 요청 실패");
        });
    }
  };

  //신조어 요청 수정
  const modifyRequest = async (key: number) => {
    if (!userContext.userlogin) {
      console.log("로그인 하셔야합니다!");
    } else if (!(title && content)) {
      console.log("빈칸은 다 채워야함!");
    } else {
      axios_put(`request/${key}`, {
        title: title,
        content: content,
        name: name,
      })
        .then((response) => {
          console.log(response.data);
          console.log("신조어 요청 수정 완료");
        })
        .catch(function (error) {
          console.log(error);
          console.log("신조어 요청 수정 실패");
        });
    }
  };

  // 신조어 요청 수정 할때 기존에 적혀있던 내용들 가져오는 함수
  useEffect(() => {
    if (route.params.requestid) {
      axios_get(`request/${route.params.requestid}`)
        .then((response) => {
          console.log(response.data);
          setTitle(response.data.title);
          setContent(response.data.content);
          setName(response.data.name);
        })
        .catch(function (error) {
          console.log(error);
          console.log("신조어 요청 가져오기 실패");
        });
    }
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Input
        style={styles.little}
        placeholder="요청 제목을 입력하세요"
        onChangeText={setTitle}
        value={title}
      />
      <TextInput
        style={styles.input}
        placeholder="요청 내용을 입력하세요"
        onChangeText={setContent}
        value={content}
      />
      <Input
        style={styles.little}
        placeholder="요청 단어를 입력하세요"
        onChangeText={setName}
        value={name}
      />
      {route.params.requestid ? (
        <PrimaryButton
          onPress={() => {
            modifyRequest(route.params.requestid);
            navigation.navigate("RequestList");
          }}
        >
          수정하기
        </PrimaryButton>
      ) : (
        <PrimaryButton onPress={RequestHandler}>등록하기</PrimaryButton>
      )}
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
  little: {
    width: "70%",
    height: 40,
    padding: 5,
  },
});
