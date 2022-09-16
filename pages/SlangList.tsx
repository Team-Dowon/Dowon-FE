import React from "react";
import { StyleSheet, Text, View, FlatList, SafeAreaView } from "react-native";
import { Button, ListItem } from "@rneui/themed";
import { basic_theme } from "../theme";

type Slangtype = {
  id: number;
  name: string;
  mean: string;
  example: string;
  replace: string;
};

export default function SlangList({ navigation }: any, { route }: any) {
  console.log(route);

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
      <FlatList style={styles.scroll} data={route} renderItem={renderItem} keyExtractor={(item: Slangtype, index: number) => index.toString()} />
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
