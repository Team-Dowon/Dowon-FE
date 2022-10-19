import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, SafeAreaView, FlatList } from "react-native";
import { Card } from "@rneui/themed";
import { axios_get, axios_delete } from "../api/api";
import { useIsFocused } from "@react-navigation/native";
import { SimpleLineIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import BottomWindow from "../component/BottomWindow";
import Toast from "react-native-toast-message";
import moment from "moment";

type Posttype = {
  id: number;
  user_nickname: string;
  title: string;
  content: string;
  date: string;
};

export default function Community({ navigation }: any) {
  const [BottomVisible, setBottomVisible] = useState(false);
  const [postid, setPostid] = useState<number>(0);
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

  //게시글 삭제
  const deletePost = async (key: number) => {
    axios_delete(`post/${key}`)
      .then((response) => {
        console.log(response.data);
        getListPost();
        Toast.show({
          type: "success",
          text1: "게시글 삭제 완료! 🎉",
        });
      })
      .catch(function (error) {
        console.log(error);
        Toast.show({
          type: "error",
          text1: "게시글 삭제 실패 😥",
          text2: "혹시 게시글 작성자 분이 아니신가요?",
        });
      });
  };

  // 수정 클릭하면 postid변수 Post에 파라미터로 전달
  function PostidHandler(params: number) {
    navigation.navigate("Post", {
      postid: params,
    });
  }

  // 페이지가 새로고침 될 때 마다 게시글 가져옴
  useEffect(() => {
    getListPost();
  }, [isFocused]);

  const renderItem = ({ item }: { item: Posttype }) => {
    const date = moment(item.date).format("YYYY/MM/DD HH:mm");
    return (
      <Card>
        <View style={styles.row}>
          <View>
            <Text style={styles.titletext}>{item.title}</Text>
            <Text style={styles.user}>{item.user_nickname}</Text>
          </View>
          <SimpleLineIcons
            name="options-vertical"
            size={24}
            color="black"
            onPress={() => {
              setBottomVisible(true);
              setPostid(item.id);
            }}
          />
        </View>

        <Card.Divider />
        <Text style={styles.date}>{date}</Text>
        <Text>{item.content}</Text>
        <View style={{ alignItems: "flex-end", marginTop: 10 }}>
          <MaterialCommunityIcons
            name="comment-text-outline"
            size={24}
            color="black"
            onPress={() => {
              navigation.navigate("Comment", {
                postid: item.id,
                writer: item.user_nickname,
                itemContent: item.content,
                itemDate: date,
              });
            }}
          />
        </View>
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
      {BottomVisible ? (
        <BottomWindow
          BottomVisible={BottomVisible}
          setBottomVisible={setBottomVisible}
          modifyfunc={() => PostidHandler(postid)}
          deletefunc={() => {
            deletePost(postid);
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
  scroll: {
    width: "100%",
    marginTop: 10,
  },
  titletext: {
    fontSize: 20,
    textAlign: "left",
  },
  row: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  user: {
    fontSize: 12,
    fontFamily: "notosanskr-bold",
  },
  date: {
    fontSize: 11,
    textAlign: "right",
    marginBottom: 20,
  },
});
