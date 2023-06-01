import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList, SafeAreaView, Pressable } from "react-native";
import { axios_post } from "../api/api";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/StackDictionary";

export type SlangListProps = StackScreenProps<RootStackParamList, "SlangList">;

// type를 통해 신조어 단어 형태 정의
interface SlangType {
  id: number;
  name: string;
  mean: string;
  example: string;
  replace: string;
}

// Dictionary에서 선택한 초성으로 시작하는 단어들을 가져오는 모듈
export default function SlangList({ navigation, route }: SlangListProps) {
  const [ListSlang, setListSlang] = useState<SlangType[]>([]);
  // 각 초성으로 시작하는 신조어 가져오기
  const getListSlang = () => {
    axios_post("dictionary_cho", {
      cho: route.params.alphabet,
    })
      .then((response) => {
        //console.log(response.data);
        setListSlang(response.data);
      })
      .catch(function (error) {
        console.log(error);
        console.log("신조어 불러오기 실패");
      });
  };

  // 페이지가 나타날 때 신조어 목록 가져옴
  useEffect(() => {
    getListSlang();
  }, []);

  const renderItem = ({ item }: { item: SlangType }) => {
    return (
      <Pressable
        key={item.id}
        onPress={() => navigation.navigate("WordInfo", { slang: item.name })}
      >
        <View style={styles.listItem}>
          <Text>{item.name}</Text>
        </View>
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        style={styles.scroll}
        data={ListSlang}
        renderItem={renderItem}
        keyExtractor={(item: SlangType, index: number) => index.toString()}
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
    color: "black",
    textAlign: "center",
  },
  scroll: {
    width: "100%",
    marginTop: 10,
  },
  listItem: {
    borderColor: "#3b021f",
    borderWidth: 1,
    borderRadius: 40,
    padding: 12,
    marginVertical: 6,
    backgroundColor: "#ddb52f",
    margin: 12,
    elevation: 4,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
  },
});
