import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, SafeAreaView, FlatList } from "react-native";
import { Card } from "@rneui/themed";
import { axios_get, axios_delete } from "../api/api";
import { useIsFocused } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

type Posttype = {
  id: number;
  user_nickname: string;
  title: string;
  content: string;
  date: string;
};

export default function Community({ navigation }: any) {
  const [ListPost, setListPost] = useState<Posttype[]>([]);
  const isFocused = useIsFocused(); // navigation으로 화면 이동시 새로고침하기 위해

  // 커뮤니티 게시글 가져오기
  const getListPost = async () => {
    axios_get("post")
      .then((response) => {
        setListPost(response.data.reverse());
      })
      .catch(function (error) {
        console.log(error);
        console.log("게시글 가져오기 실패");
      });
  };

  const deletePost = async (key: number) => {
    axios_delete(`post/${key}`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
        console.log("게시글 삭제 실패");
      });
  };

  useEffect(() => {
    getListPost();
  }, [isFocused]);

  const renderItem = ({ item }: { item: Posttype }) => {
    return (
      <Card>
        <Card.Title
          onPress={() => {
            navigation.navigate("Comment", { postid: item.id });
          }}
        >
          {item.title}
          <Feather
            name="x"
            size={24}
            color="black"
            style={{ marginRight: "auto" }}
            onPress={() => deletePost(item.id)}
          />
        </Card.Title>
        <Card.Divider />
        <Text>내용 : {item.content}</Text>
        <Text>작성자 : {item.user_nickname}</Text>
        <Text>작성 일자 : {item.date}</Text>
      </Card>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        style={styles.scroll}
        data={ListPost}
        renderItem={renderItem}
        keyExtractor={(item: Posttype, index: number) => index.toString()}
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
  scroll: {
    width: "100%",
    marginTop: 10,
  },
});
