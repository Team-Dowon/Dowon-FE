import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, SafeAreaView, FlatList } from "react-native";
import { Card } from "@rneui/themed";
import { basic_theme } from "../theme";
import { axios_get } from "../api/api";

type Posttype = {
  id: number;
  user_nickname: string;
  title: string;
  content: string;
  date: string;
};

export default function Community({ navigation }: any) {
  const [ListPost, setListPost] = useState<Posttype[]>([]);

  // 커뮤니티 게시글 가져오기
  const getListPost = async () => {
    axios_get("post")
      .then((response) => {
        setListPost(response.data);
      })
      .catch(function (error) {
        console.log(error);
        console.log("게시글 가져오기 실패");
      });
  };

  useEffect(() => {
    getListPost();
    console.log(ListPost);
  }, []);

  const renderItem = ({ item }: { item: Posttype }) => {
    return (
      <Card>
        <Card.Title
          onPress={() => {
            navigation.navigate("Comment", { postid: item.id });
          }}
        >
          {item.title}
        </Card.Title>
        <Card.Divider />
        <Text>{item.user_nickname}</Text>
        <Text>{item.date}</Text>
        <Text>{item.content}</Text>
      </Card>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList style={styles.scroll} data={ListPost} renderItem={renderItem} keyExtractor={(item: Posttype, index: number) => index.toString()} />
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
  scroll: {
    width: "100%",
    marginTop: 10,
  },
});

/*
//임시 더미데이터
const ListPost: Posttype[] = [
  {
    username: "가나다",
    title: "아무거나1",
    content:
      "바람따라서 흘러가더라 빗물따라 흘러가더라 세월 가니 약이 되는 그 시간 내게도 오더라 너무 어렸던 그때 모든게 서툴렀던 그 시절 눈물 바보로 살았다네 조금 어른이 되니 시련에 웃는법도 알게되고 내려 놓아 지더라 지나고 보니 되돌아 보니 모든게 그러하더라 이제는 안녕 안녕 힘들었던 순간들 웃으며 안녕 바람따라서 흘러가더라 빗물따라 흘러가더라 세월 가니 약이 되는 그 시간 내게도 오더라 너무 어렸던 그때 모든게 서툴렀던 그 시절 눈물 바보로 살았다네 조금 어른이 되니 시련에 웃는법도 알게되고 내려 놓아 지더",
    date: "2022-01-02 13:35",
  },
  {
    username: "가나다1",
    title: "아무거나2",
    content:
      "기어이 버텨내도 다시 버텨야했어 매일이 하루같이 춥고 메마른 계절 그러던 어느 날에 햇살같은 너를 만나 나 처음으로 따스했어 내 그늘에도 빛이 들어 살고싶은 까닭 살아야 할 이유 나에게 내일이 되어준 너란 사람 기필코 참아내도 좀 더 참으란 세상 날카로운 맘으로 웅크려있던 날들 그러던 어느 날에 기적같은 너를 만나 나 처음으로 따스했어 내 그늘에도 빛이 들어 살고싶은 까닭 살아야 할 이유 나에게 내일이 되어준 너란 사람 지금까지 고마워서 순간순간이 다 감사해서 너 아니면 없었을 오늘이 선물같아 나 처음으",
    date: "2022-01-02 13:36",
  },
  {
    username: "가나다2",
    title: "아무거나3",
    content:
      "울려대는 전화 미리 보기 속 의미 없는 연락 또는 그냥 지인들 할 일이 너무 많아 급한 일이 아니면 좀 이따가 말해줘 미안해 퇴근 후 네 이름만 보이면 Oh 난 어느새 너 아니면 Skip해 본능적으로 네 모든 말을 Keep해 작은 농담까지도 너 아니면 Skip해 그 누가 뭐래도 다른 것은 Skip해 난 너 아니면 Skip해 유난히 지쳤던 오늘 하루에 떠 있는 알림은 귀찮기만 해 그치만 넌 예외 알지? 어느새 새벽 두 시 피곤함조차 모두 날린 네 속삭임 너에게만 반응하잖아 알",
    date: "2022-01-02 13:37",
  },
  {
    username: "가나다3",
    title: "아무거나4",
    content:
      "네덜란드 까지 40시간 네덜란드 까지 40시간 네덜란드 까지 40시간 네덜란드 까지 40시간 네덜란드 까지 가는 짧은 40시간에, 내가 지나쳐야 했던, 무수히 많은 얘기 어느새 다시 찾아온 아침에 빛들도 이 순간만은, 네덜란드 까페 위로 Shine a bright light 네덜란드 까페 4시간째 네덜란드 까페 4시간째 네덜란드 까페 4시간째 네덜란드 까페 4시간째 네덜란드 까페 까지 40시간을 보낸, 네 시간 동안 이라도 날 내 보내야 하는 며칠째 아무 소식도 없었던 사람들 이 순간만은, 네",
    date: "2022-01-02 13:38",
  },
  {
    username: "가나다4",
    title: "아무거나5",
    content:
      "카페 쇼윈도 네온의 밤거리 어디서나 만날수 있는너 슬픈 얼굴 립스틱 헝크러진 머리 오! 사라 오! 사라 와인 붉은 장미 흔들리는 거리 언제라도 사랑해주는 너 짙은 향기 머플러 커보이는 외투 오! 사라 오! 사라 외로운 날은 너무 외로운 날은 혼자서 몰래 울기도 하지만 꿈꾸는 거리 어느 따스한 곳에서 누군가 기다리고 있네 예쁘지는 않지만 귀여운 사람 모두가 사랑해주는 여자 헤어지면 그렇게 지워져 버려도 사라는 영원한 애인 와인 붉은 장미 흔들리는 거리 언제라도 사랑해주는 너 짙은 향기 머플러 커보",
    date: "2022-01-02 13:39",
  },
  {
    username: "가나다5",
    title: "아무거나6",
    content:
      "내겐 아무런 꿈도 없었지 오랜 어둠속을 서성거리며 그저 언제나 생각만으로 모든걸 외면한거야 어딘가 있을거라는 너의 기억마저 지우려 했어 내가 아는 그사람 가면서 그렇게 잊고 싶었어 **하지만 어느날 알게 된거야 아무것도 버릴 수 없는 것 덧히게 흐르게 시간속에서 나는 너의 의미들을 알았어 살아있는 나날들 우릴 아프게 하는 이들은 소중하다는걸 알게된거야** 이제는 용서해야지 너를 처음 만난 그 느낌",
    date: "2022-01-02 13:40",
  },
  {
    username: "가나다6",
    title: "아무거나7",
    content:
      "가끔 이런 생각 들었지 너를 보낸 텅 빈 자리 그 누군가 있어 다시 사랑한다면 항상 낯설었던 너지만 문득 네 안에서 깊어지는 나를 느껴 이젠 힘들던 시간 지나 널 지금 모습 그대로 이해할께 더 이상의 욕심없어 사랑한단 이유로 닮아야 한다고 착각했었지 모두들 쉽게 말하지 사랑은 잠시라고 시간의 틀에 묻혀진다고 하지만 말할께 지난 아픈 과거 잊었어 우리 행복할 수 있다면",
    date: "2022-01-02 13:41",
  },
  {
    username: "가나다7",
    title: "아무거나8",
    content:
      "바람에 옷깃이 날리듯 나도 몰래 먼길에 걸어놓은 나의 마음 밤이면 행여나 그대 오질 않나 내마음 등불이 되고 싶네 해뜨면 부끄러워 얼굴을 붉혀도 그리우면 약해지는 사랑때문에 밤이면 언제나 기다리는 마음 밤길을 거니는 나의 마음 이슬에 물든 제비꽃처럼 기다리는 꽃으로 피어나네 바람에 옷깃이 날리듯 나의 마음은 나도 모르게 그대 떠난 후 알아버린 이 사랑때문에 가슴에 내리는 뜨거운 눈물 즙이 되어 젖어드네 옛날엔 나만을 사랑하던 사람 오늘도 다시 돌아올줄 모르고 달무",
    date: "2022-01-02 13:42",
  },
  {
    username: "가나다8",
    title: "아무거나9",
    content: "string",
    date: "2022-01-02 13:43",
  },
  {
    username: "가나다9",
    title: "아무거나10",
    content: "string",
    date: "2022-01-02 13:44",
  },
  {
    username: "가나다",
    title: "아무거나11",
    content: "string",
    date: "2022-01-02 13:45",
  },
];
*/
