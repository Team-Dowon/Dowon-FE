import React, { useState } from "react";
import { StyleSheet, Text, View, SafeAreaView, FlatList } from "react-native";
import { Input, Card } from "@rneui/themed";
import { basic_theme } from "../theme";

type Commenttype = {
  username: string;
  content: string;
  date: string;
};

export default function Comment() {
  const [comment, setComment] = useState<string>("");

  const renderItem = ({ item }: { item: Commenttype }) => {
    return (
      <Card>
        <Card.Title>{item.content}</Card.Title>
        <Card.Divider />
        <Text>{item.username}</Text>
        <Text>{item.date}</Text>
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
      <FlatList
        style={styles.scroll}
        data={ListComment}
        renderItem={renderItem}
        keyExtractor={(item: Commenttype, index: number) => index.toString()}
      />
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

//임시 더미데이터
const ListComment: Commenttype[] = [
  {
    username: "가즈아",
    content:
      "난 내 마음을 표현할 언어가 없었어 너를 만나기 전에는 멋지고 싶었어 텅 빈 어둠 속에 방황한 내 모습을 어설프게 자랑해도 그걸 받아주는 너라면 아무리 서툴러도 이대로가 너무 좋아 조금은 흐릿해도 I can see my reflection shine Off of your eyes Hello hello how are you It's nice to finally meet you Hello hello how are you It's nice to get to know you 내 이름은 장석훈 (훈 훈)",
    date: "string",
  },
  {
    username: "가봉맨",
    content:
      "하나만 알고 둘은잘 모르는 사람입니다하루는 비틀거리고하루는 뒤뚱거리고월요일 아침이 오면버거운 세수를 하고화요일 점심시간에눈물 물처럼 삼키고 삼키고수요일 밤의 길목에갈 길을 잃고 서 있는그림자 손을 꼭 잡고다시 또 걸었습니다하나만 알고둘은 잘 모르고 살았습니다울어도 나 혼자 울고 웃어도나 혼자 웃고목요일 빈 술잔 안에외로움 가득 채우고금요일 목놓아 부른그리운 추억의 노래여 노래여토요일 바람이 분다춤춰라 머리카락아일요일 나의 식탁에태양이 비칠 때까지월화수목금토일외로움 가득 채우고눈물로 목 놓아 부른그리운 사랑의 노래여 노래여인생에 바람",
    date: "string",
  },
  {
    username: "급식충",
    content:
      "창밖에 문득 멈춘 시선에 낮과 밤 사일 삼킨 그 빛에 물든 넌 리듬 같아 이렇게 Martini 한 잔처럼 나른해 툭 하고 풀린 감각은 Relax 날 이끄는 것 같아 어느새 날 보는 네 눈 널 보는 내 눈 한껏 차오른 Mood 오직 둘만의 Move 가만히 팔을 감아 안을 때 보채듯 품에 파고들곤 해 내 안에 너 하나만 가득해 가볍게 살짝 떠밀지 당겨 더 깊이 얽매이지 은근한 이 긴장감이 단정함 속의 Fancy 밤새 둘이 춤춰 봐 Oh 화려한 그대와 나 날 보는 네 눈 널 보는 내",
    date: "string",
  },
];
