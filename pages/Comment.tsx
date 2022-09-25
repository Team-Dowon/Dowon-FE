import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, Text, View, SafeAreaView, FlatList } from "react-native";
import { Input, Card } from "@rneui/themed";
import PrimaryButton from "../component/PrimaryButton";
import { axios_get, axios_post, axios_delete, axios_put } from "../api/api";
import { useIsFocused } from "@react-navigation/native";
import UserContext from "../service/UserContext";
import { SimpleLineIcons } from "@expo/vector-icons";
import BottomWindow from "../component/BottomWindow";

type Commenttype = {
  id: number;
  user_nickname: string;
  content: string;
  date: string;
};

export default function Comment({ route }: any) {
  const [BottomVisible, setBottomVisible] = useState(false);
  const [ismodify, setIsModify] = useState(false);
  const [commentid, setCommentid] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const [ListComment, setListComment] = useState<Commenttype[]>([]);
  const isFocused = useIsFocused(); // navigation으로 화면 이동시 새로고침하기 위해
  const userContext = useContext(UserContext); // 전역변수 사용하기 위한 변수

  const PostComment = async () => {
    if (!userContext.userlogin) {
      console.log("로그인 하셔야합니다!");
    } else if (!comment) {
      console.log("빈칸은 다 채워야함!");
    } else {
      axios_post(`post/${route.params.postid}/comment`, {
        content: comment,
      })
        .then(async (response) => {
          setComment("");
          getListComment();
        })
        .catch(function (error) {
          console.log(error);
          console.log("댓글 게시 실패");
        });
    }
  };

  //댓글 가져오기
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

  const deleteComment = async (key: number) => {
    axios_delete(`post/${route.params.postid}/comment/${key}`)
      .then((response) => {
        console.log(response.data);
        console.log("댓글 삭제 완료");
        getListComment();
      })
      .catch(function (error) {
        console.log(error);
        console.log("댓글 삭제 실패");
      });
  };

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

  //댓글 수정
  const modifyComment = async (key: number) => {
    if (!userContext.userlogin) {
      console.log("로그인 하셔야합니다!");
    } else if (!comment) {
      console.log("빈칸은 다 채워야함!");
    } else {
      axios_put(`post/${route.params.postid}/comment/${key}`, {
        content: comment,
      })
        .then((response) => {
          console.log(response.data);
          console.log("댓글 수정 완료");
          setComment("");
          getListComment();
        })
        .catch(function (error) {
          console.log(error);
          console.log("댓글 수정 실패");
        });
    }
  };

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
        <Text>작성 일자 : {item.date}</Text>
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
      {/* 수정 취소 같은거 하나 만들어야 함  */}
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
