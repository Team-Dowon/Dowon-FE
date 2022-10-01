import React, { useState } from "react";
import { StyleSheet, Text, View, SafeAreaView, FlatList } from "react-native";
import { SearchBar } from "@rneui/themed";
import { ListItem } from "@rneui/themed";
import PrimaryButton from "../component/PrimaryButton";
import { axios_post } from "../api/api";

type Slangtype = {
  id: number;
  name: string;
  mean: string;
  example: string;
  replace: string;
};

export default function Search({ navigation }: any) {
  const [searchslang, setSearchSlang] = useState<string>("");
  const [ListSlang, setListSlang] = useState<Slangtype[]>([]);

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

  const renderItem = ({ item }: { item: Slangtype }) => {
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
      <View style={styles.mainContainer}>
        <SearchBar
          containerStyle={styles.search}
          placeholder="Search"
          onChangeText={setSearchSlang}
          value={searchslang}
        />
        {ListSlang.length === 0 ? null : (
          <FlatList
            style={styles.scroll}
            data={ListSlang}
            renderItem={renderItem}
            keyExtractor={(item: Slangtype, index: number) => index.toString()}
          />
        )}
        <PrimaryButton onPress={searchWord}>단어 검색</PrimaryButton>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  mainContainer: {
    flex: 1,
    alignItems: "center",
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
  },
  scroll: {
    width: "100%",
    marginTop: 10,
  },
});
