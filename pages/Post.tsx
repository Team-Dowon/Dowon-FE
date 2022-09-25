import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, Text, View, SafeAreaView, TextInput } from "react-native";
import { Input } from "@rneui/themed";
import PrimaryButton from "../component/PrimaryButton";
import { axios_post, axios_put, axios_get } from "../api/api";
import UserContext from "../service/UserContext";
import ModalWindow from "../component/ModalWindow";

export default function Post({ navigation, route }: any) {
  const [loginModal, setLoginModal] = useState(false);
  const [blankModal, setBlankModal] = useState(false);
  const [failpostModal, setFailPostModal] = useState(false);
  const [failmodifyModal, setFailModifyModal] = useState(false);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const userContext = useContext(UserContext); // 전역변수 사용하기 위한 변수

  //게시글 작성 게시
  const postHandler = async () => {
    if (!userContext.userlogin) {
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
          navigation.navigate("Community");
        })
        .catch(function (error) {
          console.log(error);
          console.log("게시 실패");
          setFailPostModal(true);
        });
    }
  };

  //게시글 수정
  const modifyPost = async (key: number) => {
    if (!userContext.userlogin) {
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
          console.log("게시글 수정 완료");
        })
        .catch(function (error) {
          console.log(error);
          console.log("게시글 수정 실패");
          setFailModifyModal(true);
        });
    }
  };

  // 게시글 수정 할때 기존에 적혀있던 내용들 가져오는 함수
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
      <TextInput
        style={styles.input}
        placeholder="내용을 입력하세요"
        onChangeText={setContent}
        value={content}
      />
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
        okPress={() => setLoginModal(false)}
        text2="로그인 하셔야 합니다!"
      />
      <ModalWindow
        open={blankModal}
        okPress={() => setBlankModal(false)}
        text2="빈칸을 다 채워주세요!"
      />
      <ModalWindow
        open={failpostModal}
        okPress={() => setFailPostModal(false)}
        text2="게시글 게시 실패!"
      />
      <ModalWindow
        open={failmodifyModal}
        okPress={() => setFailModifyModal(false)}
        text2="게시글 수정 실패!"
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
    width: "70%",
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  title: {
    width: "70%",
    height: 40,
    padding: 5,
  },
});
