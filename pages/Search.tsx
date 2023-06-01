import React, { useState } from "react";
import { StyleSheet, TextInput, SafeAreaView, FlatList } from "react-native";
import { ListItem } from "@rneui/themed";
import PrimaryButton from "../component/PrimaryButton";
import { axios_post } from "../api/api";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/StackDictionary";

export type SearchProps = StackScreenProps<RootStackParamList, "Search">;

// type를 통해 신조어 단어 형태 정의
interface SlangType {
  id: number;
  name: string;
  mean: string;
  example: string;
  replace: string;
}

// 초성별로 들어가지 않고도 직접적으로 사용자가 단어를 검색할 수 있는 모듈
export default function Search({ navigation }: SearchProps) {
  const [searchslang, setSearchSlang] = useState<string>("");
  const [ListSlang, setListSlang] = useState<SlangType[]>([]);

  // 검색한 신조어 가져오기
  const searchWord = async () => {
    axios_post("dictionary", {
      search: searchslang,
    })
      .then((response) => {
        console.log(response.data);
        setListSlang(response.data);
      })
      .catch(function (error) {
        console.log(error);
        console.log("신조어 불러오기 실패");
      });
  };

  const renderItem = ({ item }: { item: SlangType }) => {
    return (
      <ListItem
        onPress={() => {
          navigation.navigate("WordInfo", { slang: item.name });
        }}
        bottomDivider
      >
        <ListItem.Content>
          <ListItem.Title>{item.name}</ListItem.Title>
        </ListItem.Content>
      </ListItem>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.search}
        placeholder="검색할 단어를 입력하세요"
        onChangeText={setSearchSlang}
        value={searchslang}
      />
      {ListSlang.length === 0 ? null : (
        <FlatList
          style={styles.scroll}
          data={ListSlang}
          renderItem={renderItem}
          keyExtractor={(item: SlangType, index: number) => index.toString()}
        />
      )}
      <PrimaryButton onPress={searchWord}>단어 검색</PrimaryButton>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    padding: 20,
  },
  text: {
    fontSize: 48,
    fontFamily: "notosanskr-bold",
    fontWeight: "400",
    color: "black",
    textAlign: "center",
  },
  search: {
    width: "90%",
    borderWidth: 1,
    backgroundColor: "#ffffff",
    borderColor: "white",
    borderBottomColor: "gray",
  },
  scroll: {
    width: "100%",
    marginTop: 10,
  },
});
