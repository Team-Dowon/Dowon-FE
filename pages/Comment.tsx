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

export default function Comment({ route, navigation }: any) {
  const [BottomVisible, setBottomVisible] = useState(false);
  const [loginModal, setLoginModal] = useState(false);
  const [blankModal, setBlankModal] = useState(false);
  const [ismodify, setIsModify] = useState(false);
  const [commentid, setCommentid] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [ListComment, setListComment] = useState<Commenttype[]>([]);
  const isFocused = useIsFocused(); // navigation으로 화면 이동시 새로고침하기 위해
  const userContext = useContext(UserContext); // 전역변수 사용하기 위한 변수
  const itemUser = route.params.writer;
  const itemContext = route.params.itemContent;
  const itemDate = route.params.itemDate;

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
        setListComment(response.data);
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
    const date = moment(item.date).format("YYYY/MM/DD HH:mm");
    return (
      <>
        <View style={styles.title}>
          <View>
            <Text style={styles.nickname}>{item.user_nickname}</Text>
            <Text style={styles.content}>{item.content}</Text>
          </View>
          <SimpleLineIcons
            name="options-vertical"
            size={24}
            color="black"
            onPress={() => {
              setBottomVisible(true);
              setCommentid(item.id);
              setUsername(item.user_nickname);
            }}
          />
        </View>
        <Text style={styles.date}>{date}</Text>
      </>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Card>
        <View>
          <Text style={styles.parentUser}>{itemUser}</Text>
          <Text style={styles.parentDate}>{itemDate}</Text>
          <Card.Divider />
          <Text style={styles.parentContext}>{itemContext}</Text>
        </View>
      </Card>
      <Input style={styles.input} placeholder="댓글을 입력하세요.." onChangeText={setComment} value={comment} />
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
      <FlatList style={styles.scroll} data={ListComment} renderItem={renderItem} keyExtractor={(item: Commenttype, index: number) => index.toString()} />
      {BottomVisible ? (
        <BottomWindow
          BottomVisible={BottomVisible}
          setBottomVisible={setBottomVisible}
          modifyfunc={() => {
            userContext.username !== username
              ? Toast.show({
                  type: "error",
                  text1: "신조어 요청 수정 실패 😥",
                  text2: "혹시 작성자 분이 아니신가요?",
                })
              : getComment(commentid);
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
        okPress={() => {
          setLoginModal(false), navigation.navigate("Login");
        }}
        text2="로그인 하셔야 합니다!"
      />
      <ModalWindow open={blankModal} okPress={() => setBlankModal(false)} text2="빈칸을 다 채워주세요!" />
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
    height: 40,
    padding: 5,
    marginTop: 30,
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
  title: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    borderWidth: 2,
    borderRadius: 20,
    margin: 10,
    padding: 15,
  },
  nickname: {
    fontFamily: "notosanskr-bold",
  },
  content: {
    marginVertical: 3,
  },

  parentUser: {
    fontSize: 18,
    fontFamily: "notosanskr-bold",
  },
  parentDate: {
    marginTop: -15,
    fontSize: 11,
    marginBottom: 10,
  },
  parentContext: {
    fontSize: 16,
    marginBottom: 20,
  },
  date: {
    marginLeft: 20,
  },
});
