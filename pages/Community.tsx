import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, Text, View, SafeAreaView, FlatList } from "react-native";
import { Card, Avatar } from "@rneui/themed";
import { axios_get, axios_delete } from "../api/api";
import { useIsFocused } from "@react-navigation/native";
import { SimpleLineIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import UserContext from "../service/UserContext";
import BottomWindow from "../component/BottomWindow";
import Toast from "react-native-toast-message";
import moment from "moment";

// type를 통해 게시글 형태 정의
type Posttype = {
  id: number;
  user_nickname: string;
  user_profile_pic: string;
  title: string;
  content: string;
  date: string;
};

// 커뮤니티의 게시글을 관리하는 모듈 -> Post로 넘어가서 게시글을 작성 및 수정하거나 Comment로 넘어가 댓글을 작성할 수 있음
export default function Community({ navigation }: any) {
  // post id, username, Bottom창, ListPost에 따른 설정값 설정 -> useState
  const [BottomVisible, setBottomVisible] = useState(false);
  const [postid, setPostid] = useState<number>(0);
  const [username, setUsername] = useState<string>("");
  const [ListPost, setListPost] = useState<Posttype[]>([]);
  const isFocused = useIsFocused(); // navigation으로 화면 이동시 새로고침하기 위해
  const userContext = useContext(UserContext); // 전역변수 사용하기 위한 변수

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
  function PostidHandler(params: number, username: string) {
    if (userContext.username !== username) {
      Toast.show({
        type: "error",
        text1: "신조어 요청 수정 실패 😥",
        text2: "혹시 작성자 분이 아니신가요?",
      });
    } else {
      navigation.navigate("Post", {
        postid: params,
      });
    }
  }

  // 페이지가 새로고침 될 때 마다 게시글 가져옴
  useEffect(() => {
    getListPost();
  }, [isFocused]);

  // 커뮤니티에 작성된 날짜들을 불러오는 함수
  const renderItem = ({ item }: { item: Posttype }) => {
    const date = moment(item.date).format("YYYY/MM/DD HH:mm");
    return (
      // Card 형태로 게시글들을 표현 -> 제목, 작성자, 게시 날짜, 내용 등으로 구성
      <Card>
        <View style={styles.row}>
          <Text style={styles.titletext}>{item.title}</Text>
          <View style={styles.profile}>
            <View style={styles.who}>
              {item.user_profile_pic ? (
                <Avatar
                  size={32}
                  rounded
                  source={{ uri: item.user_profile_pic }}
                  title={item.user_nickname}
                  containerStyle={{
                    backgroundColor: "#63646d",
                    marginRight: 10,
                  }}
                />
              ) : (
                <Avatar
                  size={32}
                  rounded
                  title={item.user_nickname.slice(-2)}
                  containerStyle={{
                    backgroundColor: "#3d4db7",
                    marginRight: 10,
                  }}
                />
              )}
              <Text style={styles.user}>{item.user_nickname}</Text>
            </View>
            <SimpleLineIcons
              name="options-vertical"
              size={24}
              color="black"
              onPress={() => {
                setBottomVisible(true);
                setPostid(item.id);
                setUsername(item.user_nickname);
              }}
            />
          </View>
        </View>

        <Card.Divider />
        <Text style={styles.date}>{date}</Text>
        <Text>{item.content}</Text>
        <View style={{ alignItems: "flex-end", marginTop: 10 }}>
          {/* 댓글 아이콘 입력 시 onPress를 통해 Comment.tsx로 넘어감, 넘어갈 때 게시글 관련 내용들을 같이 전달 */}
          <MaterialCommunityIcons
            name="comment-text-outline"
            size={24}
            color="black"
            onPress={() => {
              navigation.navigate("Comment", {
                postid: item.id,
                writer: item.user_nickname,
                itemContent: item.content,
                itemProfilePic: item.user_profile_pic,
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
      {/* 게시글들을 FlatList의 형태로 나열, 각 item(게시글)들을 나타내며 index를 통해 구분 가능 */}
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
          modifyfunc={() => {
            PostidHandler(postid, username);
            setBottomVisible(false);
          }}
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
    marginBottom: 5,
  },
  row: {
    flex: 1,
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
  profile: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  who: {
    flexDirection: "row",
  },
});
