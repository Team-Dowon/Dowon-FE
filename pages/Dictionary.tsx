import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
} from "react-native";
import PrimaryButton from "../component/PrimaryButton";

// 초성순으로 리스트 나열
const ListConsonant: string[] = [
  "ㄱ",
  "ㄲ",
  "ㄴ",
  "ㄷ",
  "ㄸ",
  "ㄹ",
  "ㅁ",
  "ㅂ",
  "ㅃ",
  "ㅅ",
  "ㅆ",
  "ㅇ",
  "ㅈ",
  "ㅉ",
  "ㅊ",
  "ㅋ",
  "ㅌ",
  "ㅍ",
  "ㅎ",
];

// 신조어 사전 페이지
export default function Dictionary({ navigation }: any) {
  // pressHandler 실행 시 신조어 검색창으로 이동
  function pressHandler() {
    navigation.navigate("Search");
  }

  // 초성클릭하면 초성변수 SlangList에 파라미터(alphabet)로 전달
  function SlangListHandler(params: any) {
    //console.log(params);
    navigation.navigate("SlangList", { alphabet: params });
  }

  return (
    <SafeAreaView style={styles.container}>
      <PrimaryButton onPress={pressHandler}>단어 바로 검색</PrimaryButton>
      <ScrollView style={styles.scroll}>
        {ListConsonant.map((consonant: Partial<string>, i: number) => (
          //  각 map으로 형성된 초성 리스트(ListConsonant)를 클릭시 SlangListHandler 실행
          <Pressable key={i} onPress={() => SlangListHandler(consonant)}>
            <View style={styles.listItem}>
              <Text>{consonant}</Text>
            </View>
          </Pressable>
        ))}
      </ScrollView>
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
    fontSize: 10,
    fontFamily: "notosanskr-black",
    color: "black",
    textAlign: "left",
  },
  input: {
    width: "70%",
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  scroll: {
    width: "100%",
    marginVertical: 5,
    paddingHorizontal: 20,
  },
  listItem: {
    borderColor: "#3b021f",
    borderWidth: 1,
    borderRadius: 40,
    padding: 12,
    marginVertical: 6,
    backgroundColor: "#ddb52f",
    width: "100%",
    elevation: 4,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
  },
});
