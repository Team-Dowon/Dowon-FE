import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from "react-native";
import { axios_get } from "../api/api";

type Slangtype = {
  id: number;
  name: string;
  mean: string;
  example: string;
  replace: string;
};

export default function WordInfo({ route }: any) {
  const [Slang, setSlang] = useState<Slangtype>({
    id: 0,
    name: "",
    mean: "",
    example: "",
    replace: "",
  });

  // 해당 신조어 상세정보 가져오기
  const getSlang = async () => {
    axios_get(`dictionary/${route.params.slang}`)
      .then((response) => {
        console.log(response.data);
        setSlang(response.data);
      })
      .catch(function (error) {
        console.log(error);
        console.log("신조어 정보 가져오기 실패");
      });
  };

  // 페이지가 나타날 때 신조어 상세정보 가져옴
  useEffect(() => {
    getSlang();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.text}>단어 : {Slang.name} </Text>
        <Text style={styles.text}>의미 : {Slang.mean}</Text>
        <Text style={styles.text}>예시문장 : {Slang.example}</Text>
        <Text style={styles.text}>
          대체단어 : {Slang.replace.replace(/⠀/gi, " ")}
        </Text>
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
    fontSize: 48,
    fontFamily: "notosanskr-bold",
    fontWeight: "400",
    color: "black",
    textAlign: "center",
  },
  scrollView: {
    marginHorizontal: 20,
  },
});
