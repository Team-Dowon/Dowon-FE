import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import { Input } from "@rneui/themed";
import PrimaryButton from "../component/PrimaryButton";
import { axios_post, axios_put, axios_get } from "../api/api";
import UserContext from "../service/UserContext";
import ModalWindow from "../component/ModalWindow";
import Toast from "react-native-toast-message";
import { CompositeScreenProps } from "@react-navigation/native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { StackScreenProps } from "@react-navigation/stack";
import { BottomTabParamList } from "../navigation/BottomTab";
import { RootStackParamList } from "../App";

export type PostProps = CompositeScreenProps<
  BottomTabScreenProps<BottomTabParamList, "Community">,
  StackScreenProps<RootStackParamList>
>;

// 게시글을 작성 및 수정하는 모듈
export default function Post({ navigation, route }: PostProps) {
  // title, content, 로그인 여부, 변경 여부에 따른 설정값 설정 -> useState
  const [loginModal, setLoginModal] = useState(false);
  const [blankModal, setBlankModal] = useState(false);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const userContext = useContext(UserContext); // 전역변수 사용하기 위한 변수

  //게시글 작성 게시
  const postHandler = async () => {
    if (!userContext?.userlogin) {
      setLoginModal(true);
    } else if (!(title && content)) {
      setBlankModal(true);
    } else {
      axios_post("post", {
        title: title,
        content: content,
      })
        .then(async (response) => {
          console.log(response.data); //post 완료
          Toast.show({
            type: "success",
            text1: "게시글 작성 완료! 🎉",
          });
          navigation.navigate("Community");
        })
        .catch(function (error) {
          console.log(error);
          Toast.show({
            type: "error",
            text1: "게시글 작성 실패 😥",
          });
        });
    }
  };

  //게시글 수정
  const modifyPost = async (key: number) => {
    if (!userContext?.userlogin) {
      setLoginModal(true);
    } else if (!(title && content)) {
      setBlankModal(true);
    } else {
      axios_put(`post/${key}`, {
        title: title,
        content: content,
      })
        .then((response) => {
          console.log(response.data);
          Toast.show({
            type: "success",
            text1: "게시글 수정 완료! 🎉",
          });
        })
        .catch(function (error) {
          console.log(error);
          console.log("게시글 수정 실패");
          Toast.show({
            type: "error",
            text1: "게시글 수정 실패 😥",
            text2: "혹시 게시글 작성자 분이 아니신가요?",
          });
        });
    }
  };

  // 게시글 수정 할때 기존에 적혀있던 게시글 내용을 가져오는 함수
  useEffect(() => {
    if (route.params.postid) {
      axios_get(`post/${route.params.postid}`)
        .then((response) => {
          console.log(response.data);
          setTitle(response.data.title);
          setContent(response.data.content);
        })
        .catch(function (error) {
          console.log(error);
          console.log("게시글 가져오기 실패");
        });
    }
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Input
        style={styles.title}
        placeholder="제목을 입력하세요"
        onChangeText={setTitle}
        value={title}
      />
      <Input
        multiline
        style={styles.input}
        placeholder="내용을 입력하세요"
        onChangeText={setContent}
        value={content}
      />
      {/* 파라미터로 넘어온 postid의 여부에 따라 수정하기 or 등록하기로 나뉘어짐 -> 게시글의 최초 등록이냐? 수정이냐? 로 나뉘어짐 */}
      {route.params.postid ? (
        <PrimaryButton
          onPress={() => {
            modifyPost(route.params.postid);
            navigation.navigate("Community");
          }}
        >
          수정하기
        </PrimaryButton>
      ) : (
        <PrimaryButton onPress={postHandler}>등록하기</PrimaryButton>
      )}
      <ModalWindow
        open={loginModal}
        okPress={() => {
          setLoginModal(false), navigation.navigate("Login");
        }}
        text2="로그인 하셔야 합니다!"
      />
      <ModalWindow
        open={blankModal}
        okPress={() => setBlankModal(false)}
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
    fontSize: 48,
    fontFamily: "notosanskr-bold",
    fontWeight: "400",
    color: "black",
    textAlign: "center",
  },
  input: {
    height: 200,
    padding: 5,
    borderWidth: 1,
    backgroundColor: "#ffffff",
    borderColor: "white",
  },
  title: {
    width: "70%",
    height: 40,
    padding: 5,
  },
});
