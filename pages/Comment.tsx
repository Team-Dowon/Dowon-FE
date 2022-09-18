import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, SafeAreaView, FlatList } from "react-native";
import { Input, Card } from "@rneui/themed";
import { basic_theme } from "../theme";
import PrimaryButton from "../component/PrimaryButton";
import { axios_get } from "../api/api";

type Commenttype = {
  user_nickname: string;
  content: string;
  date: string;
};

export default function Comment({ route }: any) {
  const [comment, setComment] = useState<string>("");

  function CommentHandler() {
    console.log("댓글 등록");
  }

  //댓글 가져오기 하는중 무시해도 됨
  const [ListComment, setListComment] = useState<Commenttype[]>([]);

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

  useEffect(() => {
    getListComment();
  }, []);

  const renderItem = ({ item }: { item: Commenttype }) => {
    return (
      <Card>
        <Card.Title>{item.content}</Card.Title>
        <Card.Divider />
        <Text>{item.user_nickname}</Text>
        <Text>{item.date}</Text>
      </Card>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Input style={styles.input} placeholder="댓글" onChangeText={setComment} value={comment} />
      <PrimaryButton onPress={CommentHandler}>등록하기</PrimaryButton>
      <FlatList style={styles.scroll} data={ListComment} renderItem={renderItem} keyExtractor={(item: Commenttype, index: number) => index.toString()} />
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
});
