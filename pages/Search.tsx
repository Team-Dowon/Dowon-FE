import React, { useState } from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { SearchBar } from "@rneui/themed";
import PrimaryButton from "../component/PrimaryButton";
import { basic_theme } from "../theme";

export default function Search({ navigation }: any) {
  const [searchslang, setSearchSlang] = useState<string>("");

  function searchWord() {
    console.log("단어 검색");
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContainer}>
        <SearchBar
          containerStyle={styles.search}
          placeholder="Search"
          onChangeText={setSearchSlang}
          value={searchslang}
        />
        <PrimaryButton onPress={searchWord}>단어 검색</PrimaryButton>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: basic_theme.bgColor,
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
});
