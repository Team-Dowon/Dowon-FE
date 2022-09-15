import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
} from "react-native";
import { ListItem } from "@rneui/themed";
import PrimaryButton from "../component/PrimaryButton";
import { basic_theme } from "../theme";

export default function Dictionary({ navigation }: any) {
  const ListConsonant: string[] = [
    "ㄱ",
    "ㄴ",
    "ㄷ",
    "ㄹ",
    "ㅁ",
    "ㅂ",
    "ㅅ",
    "ㅇ",
    "ㅈ",
    "ㅊ",
    "ㅋ",
    "ㅌ",
    "ㅍ",
    "ㅎ",
  ];

  function pressHandler() {
    navigation.navigate("Search");
  }

  return (
    <SafeAreaView style={styles.container}>
      <PrimaryButton onPress={pressHandler}>단어 바로 검색</PrimaryButton>
      <ScrollView style={styles.scroll}>
        {ListConsonant.map((consonant: Partial<string>, i: number) => (
          // <ListItem
          //   key={i}
          //   onPress={() => {
          //     alert(`${consonant}`);
          //     navigation.navigate("SlangList");
          //   }}
          //   bottomDivider
          //   style={styles.listItem}
          // >
          //   <ListItem.Content>
          //     <ListItem.Title>
          //       <Text>{consonant}</Text>
          //     </ListItem.Title>
          //   </ListItem.Content>
          // </ListItem>
          <Pressable
            key={i}
            onPress={() => {
              navigation.navigate("SlangList");
            }}
          >
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
    backgroundColor: basic_theme.bgColor,
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
    marginTop: 10,
    padding: 20,
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
