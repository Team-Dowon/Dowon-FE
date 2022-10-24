import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  Pressable,
} from "react-native";
import { ListItem } from "@rneui/themed";
import { axios_post } from "../api/api";

type Slangtype = {
  id: number;
  name: string;
  mean: string;
  example: string;
  replace: string;
};

export default function SlangList({ navigation, route }: any) {
  const [ListSlang, setListSlang] = useState<Slangtype[]>([]);

  // 각 초성으로 시작하는 신조어 가져오기
  const getListSlang = async () => {
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

  const renderItem = ({ item }: { item: Slangtype }) => {
    return (
      // <ListItem
      //   onPress={() => {
      //     navigation.navigate("WordInfo", { slang: item.name });
      //   }}
      //   bottomDivider
      // >
      //   <ListItem.Content>
      //     <ListItem.Title>{item.name}</ListItem.Title>
      //   </ListItem.Content>
      // </ListItem>
      <Pressable
        key={item}
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
        keyExtractor={(item: Slangtype, index: number) => index.toString()}
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
