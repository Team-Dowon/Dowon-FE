import React from "react";
import { StyleSheet, Text, View, FlatList, SafeAreaView } from "react-native";
import { Button, ListItem } from "@rneui/themed";
import { basic_theme } from "../theme";

type Slangtype = {
  name: string;
  mean: string;
  example: string;
  replace: string;
};

export default function SlangList({ navigation }: any) {
  const renderItem = ({ item }: { item: Slangtype }) => {
    return (
      <ListItem
        onPress={() => {
          navigation.navigate("WordInfo");
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
    backgroundColor: basic_theme.bgColor,
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
});

//임시 더미데이터
const ListSlang: Slangtype[] = [
  {
    name: "가즈아",
    mean: "몰?루",
    example: "몰?루",
    replace: "몰?루",
  },
  {
    name: "가봉맨",
    mean: "몰?루",
    example: "몰?루",
    replace: "몰?루",
  },
  {
    name: "급식충",
    mean: "몰?루",
    example: "몰?루",
    replace: "몰?루",
  },
  {
    name: "가불기",
    mean: "몰?루",
    example: "몰?루",
    replace: "몰?루",
  },
  {
    name: "갑분싸",
    mean: "몰?루",
    example: "몰?루",
    replace: "몰?루",
  },
  {
    name: "개돼지",
    mean: "몰?루",
    example: "몰?루",
    replace: "몰?루",
  },
  {
    name: "고소미",
    mean: "몰?루",
    example: "몰?루",
    replace: "몰?루",
  },
  {
    name: "관종",
    mean: "몰?루",
    example: "몰?루",
    replace: "몰?루",
  },
  {
    name: "귀두컷",
    mean: "몰?루",
    example: "몰?루",
    replace: "몰?루",
  },
  {
    name: "극혐",
    mean: "몰?루",
    example: "몰?루",
    replace: "몰?루",
  },
  {
    name: "극딜",
    mean: "몰?루",
    example: "몰?루",
    replace: "몰?루",
  },
  {
    name: "근자감",
    mean: "몰?루",
    example: "몰?루",
    replace: "몰?루",
  },
  {
    name: "깜놀",
    mean: "몰?루",
    example: "몰?루",
    replace: "몰?루",
  },
  {
    name: "깐부",
    mean: "몰?루",
    example: "몰?루",
    replace: "몰?루",
  },
  {
    name: "꿀벅지",
    mean: "몰?루",
    example: "몰?루",
    replace: "몰?루",
  },
  {
    name: "꿀잼",
    mean: "몰?루",
    example: "몰?루",
    replace: "몰?루",
  },
  {
    name: "끌올",
    mean: "몰?루",
    example: "몰?루",
    replace: "몰?루",
  },
];
