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
        <Text style={styles.title}>{Slang.name} </Text>
        <Text style={styles.sub}>의미 : </Text>
        <Text style={styles.text}>{Slang.mean}</Text>
        <Text style={styles.sub}>예시문장 :</Text>
        <Text style={styles.text}> {Slang.example}</Text>
        <Text style={styles.sub}>대체단어 :</Text>
        <Text style={styles.text}>{Slang.replace.replace(/⠀/gi, " ")} </Text>
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
  sub: {
    fontSize: 22,
    fontFamily: "notosanskr-bold",
    color: "black",
    textAlign: "center",
  },
  text: {
    fontSize: 30,
    fontFamily: "notosanskr-bold",
    fontWeight: "100",
    color: "black",
    marginBottom: 50,
    textAlign: "center",
  },
  scrollView: {
    marginHorizontal: 20,
  },
  title: {
    fontSize: 40,
    fontFamily: "notosanskr-bold",
    borderBottomWidth: 4,
    borderColor: "#200364",
    marginBottom: 20,
  },
  mean: {
    fontSize: 20,
    fontFamily: "notosanskr-bold",
  },
});
