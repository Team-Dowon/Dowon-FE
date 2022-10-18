import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, Text, View, SafeAreaView, FlatList } from "react-native";
import { Input, Card } from "@rneui/themed";
import PrimaryButton from "../component/PrimaryButton";
import { axios_get, axios_post, axios_delete, axios_put } from "../api/api";
import { useIsFocused } from "@react-navigation/native";
import UserContext from "../service/UserContext";
import { SimpleLineIcons } from "@expo/vector-icons";
import BottomWindow from "../component/BottomWindow";
import ModalWindow from "../component/ModalWindow";
import Toast from "react-native-toast-message";
import moment from "moment";

type Commenttype = {
  id: number;
  user_nickname: string;
  content: string;
  date: string;
};

export default function Comment({ route }: any) {
  const [BottomVisible, setBottomVisible] = useState(false);
  const [loginModal, setLoginModal] = useState(false);
  const [blankModal, setBlankModal] = useState(false);
  const [ismodify, setIsModify] = useState(false);
  const [commentid, setCommentid] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const [ListComment, setListComment] = useState<Commenttype[]>([]);
  const isFocused = useIsFocused(); // navigation으로 화면 이동시 새로고침하기 위해
  const userContext = useContext(UserContext); // 전역변수 사용하기 위한 변수

  // 댓글 작성 하는 함수
  const PostComment = async () => {
    if (!userContext.userlogin) {
      setLoginModal(true);
    } else if (!comment) {
      setBlankModal(true);
    } else {
      axios_post(`post/${route.params.postid}/comment`, {
        content: comment,
      })
        .then(async (response) => {
          setComment("");
          getListComment();
          Toast.show({
            type: "success",
            text1: "댓글 게시 완료! 🎉",
          });
        })
        .catch(function (error) {
          console.log(error);
          Toast.show({
            type: "error",
            text1: "댓글 게시 실패 😥",
          });
        });
    }
  };

  //댓글 목록 가져오기
  const getListComment = async () => {
    axios_get(`post/${route.params.postid}/comment`)
      .then((response) => {
        console.log(response.data);
        setListComment(response.data.reverse());
      })
      .catch(function (error) {
        console.log(error);
        console.log("댓글 가져오기 실패");
      });
  };

  //댓글 삭제 하는 함수
  const deleteComment = async (key: number) => {
    axios_delete(`post/${route.params.postid}/comment/${key}`)
      .then((response) => {
        console.log(response.data);
        getListComment();
        Toast.show({
          type: "success",
          text1: "댓글 삭제 완료! 🎉",
        });
      })
      .catch(function (error) {
        console.log(error);
        Toast.show({
          type: "error",
          text1: "댓글 삭제 실패 😥",
          text2: "혹시 댓글 작성자 분이 아니신가요?",
        });
      });
  };

  // 특정 댓글 정보 가져오는 함수
  const getComment = async (key: number) => {
    axios_get(`post/${route.params.postid}/comment/${key}`)
      .then((response) => {
        console.log(response.data);
        setComment(response.data.content);
        setIsModify(true);
      })
      .catch(function (error) {
        console.log(error);
        console.log("댓글 가져오기 실패");
      });
  };

  // 특정 댓글 수정하는 함수
  const modifyComment = async (key: number) => {
    if (!userContext.userlogin) {
      setLoginModal(true);
    } else if (!comment) {
      setBlankModal(true);
    } else {
      axios_put(`post/${route.params.postid}/comment/${key}`, {
        content: comment,
      })
        .then((response) => {
          console.log(response.data);
          setComment("");
          getListComment();
          Toast.show({
            type: "success",
            text1: "댓글 수정 완료! 🎉",
          });
        })
        .catch(function (error) {
          console.log(error);
          Toast.show({
            type: "error",
            text1: "댓글 수정 실패 😥",
            text2: "혹시 댓글 작성자 분이 아니신가요?",
          });
        });
    }
  };

  //페이지가 새로고침 될 때마다 댓글 가져옴
  useEffect(() => {
    getListComment();
  }, [isFocused]);

  const renderItem = ({ item }: { item: Commenttype }) => {
    return (
      <Card>
        <Card.Title>
          {item.content}
          <SimpleLineIcons
            name="options-vertical"
            size={24}
            color="black"
            onPress={() => {
              setBottomVisible(true);
              setCommentid(item.id);
            }}
          />
        </Card.Title>
        <Card.Divider />
        <Text>작성자 : {item.user_nickname}</Text>
        <Text>
          작성 일자 : {moment(item.date).format("YYYY년MM월DD일 HH시mm분ss초")}
        </Text>
      </Card>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Input
        style={styles.input}
        placeholder="댓글"
        onChangeText={setComment}
        value={comment}
      />
      {ismodify ? (
        <View style={styles.row}>
          <PrimaryButton
            onPress={() => {
              modifyComment(commentid);
              setIsModify(false);
            }}
          >
            수정하기
          </PrimaryButton>
          <PrimaryButton
            style={{ backgroundColor: "#a7a7a7" }}
            onPress={() => {
              setIsModify(false);
              setComment("");
            }}
          >
            수정 취소
          </PrimaryButton>
        </View>
      ) : (
        <PrimaryButton onPress={PostComment}>등록하기</PrimaryButton>
      )}
      <FlatList
        style={styles.scroll}
        data={ListComment}
        renderItem={renderItem}
        keyExtractor={(item: Commenttype, index: number) => index.toString()}
      />
      {BottomVisible ? (
        <BottomWindow
          BottomVisible={BottomVisible}
          setBottomVisible={setBottomVisible}
          modifyfunc={() => {
            getComment(commentid);
            setBottomVisible(false);
          }}
          deletefunc={() => {
            deleteComment(commentid);
            setBottomVisible(false);
          }}
        />
      ) : null}
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
    padding: 5,
  },
  scroll: {
    width: "100%",
    marginTop: 10,
  },
  row: {
    maxWidth: "60%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
