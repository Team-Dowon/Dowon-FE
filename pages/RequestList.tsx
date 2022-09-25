import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, SafeAreaView, FlatList } from "react-native";
import { Card } from "@rneui/themed";
import { axios_get, axios_delete } from "../api/api";
import { useIsFocused } from "@react-navigation/native";
import { SimpleLineIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import BottomWindow from "../component/BottomWindow";
import PrimaryButton from "../component/PrimaryButton";

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
  const [ListRequest, setListRequest] = useState<Posttype[]>([]);
  const isFocused = useIsFocused(); // navigation으로 화면 이동시 새로고침하기 위해

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

  const deleteRequest = async (key: number) => {
    axios_delete(`request/${key}`)
      .then((response) => {
        console.log(response.data);
        console.log("신조어 요청 삭제 완료");
        getListRequest();
      })
      .catch(function (error) {
        console.log(error);
        console.log("신조어 요청 삭제 실패");
      });
  };

  // 수정 클릭하면 requestid변수 WordRequest에 파라미터로 전달
  function RequestidHandler(params: number) {
    //console.log(params);
    navigation.navigate("WordRequest", {
      requestid: params,
    });
  }

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
          modifyfunc={() => RequestidHandler(requestid)}
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
