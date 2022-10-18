import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, Text, View, SafeAreaView, FlatList } from "react-native";
import { Card } from "@rneui/themed";
import { axios_get, axios_delete } from "../api/api";
import { useIsFocused } from "@react-navigation/native";
import { SimpleLineIcons } from "@expo/vector-icons";
import UserContext from "../service/UserContext";
import BottomWindow from "../component/BottomWindow";
import PrimaryButton from "../component/PrimaryButton";
import Toast from "react-native-toast-message";

type Posttype = {
  id: number;
  user_nickname: string;
  name: string;
  title: string;
  content: string;
  date: string;
};

export default function RequestList({ navigation }: any) {
  const [BottomVisible, setBottomVisible] = useState(false);
  const [requestid, setRequestid] = useState<number>(0);
  const [username, setUsername] = useState<string>("");
  const [ListRequest, setListRequest] = useState<Posttype[]>([]);
  const isFocused = useIsFocused(); // navigation으로 화면 이동시 새로고침하기 위해
  const userContext = useContext(UserContext); // 전역변수 사용하기 위한 변수

  // 신조어 요청 목록 가져오기
  const getListRequest = async () => {
    axios_get("request")
      .then((response) => {
        setListRequest(response.data.reverse());
      })
      .catch(function (error) {
        console.log(error);
        console.log("신조어 요청 목록 가져오기 실패");
      });
  };

  // 신조어 요청 삭제
  const deleteRequest = async (key: number) => {
    axios_delete(`request/${key}`)
      .then((response) => {
        console.log(response.data);
        getListRequest();
        Toast.show({
          type: "success",
          text1: "신조어 요청 삭제 완료! 🎉",
        });
      })
      .catch(function (error) {
        console.log(error);
        Toast.show({
          type: "error",
          text1: "신조어 요청 삭제 실패 😥",
          text2: "혹시 작성자 분이 아니신가요?",
        });
      });
  };

  // 수정 클릭하면 requestid변수를 WordRequest에 파라미터로 전달
  function RequestidHandler(params: number, username: string) {
    if (userContext.username !== username) {
      Toast.show({
        type: "error",
        text1: "신조어 요청 수정 실패 😥",
        text2: "혹시 작성자 분이 아니신가요?",
      });
    } else {
      navigation.navigate("WordRequest", {
        requestid: params,
      });
    }
  }

  // 페이지가 새로고침 될 때마다 신조어 요청 목록 가져오기
  useEffect(() => {
    getListRequest();
  }, [isFocused]);

  const renderItem = ({ item }: { item: Posttype }) => {
    return (
      <Card>
        <Card.Title style={styles.row}>
          <Text style={styles.titletext}>{item.title}</Text>
          <SimpleLineIcons
            name="options-vertical"
            size={24}
            color="black"
            onPress={() => {
              setBottomVisible(true);
              setRequestid(item.id);
              setUsername(item.user_nickname);
            }}
          />
        </Card.Title>
        <Card.Divider />
        <Text>신조어 : {item.name}</Text>
        <Text>내용 : {item.content}</Text>
        <Text>작성자 : {item.user_nickname}</Text>
        <Text>작성 일자 : {item.date}</Text>
      </Card>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <PrimaryButton
        onPress={() =>
          navigation.navigate("WordRequest", {
            requestid: null,
          })
        }
      >
        신조어 요청
      </PrimaryButton>
      <FlatList
        style={styles.scroll}
        data={ListRequest}
        renderItem={renderItem}
        keyExtractor={(item: Posttype, index: number) => index.toString()}
      />
      {BottomVisible ? (
        <BottomWindow
          BottomVisible={BottomVisible}
          setBottomVisible={setBottomVisible}
          modifyfunc={() => {
            RequestidHandler(requestid, username);
            setBottomVisible(false);
          }}
          deletefunc={() => {
            deleteRequest(requestid);
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
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
