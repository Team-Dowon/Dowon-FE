import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  FlatList,
} from "react-native";
import PrimaryButton from "../component/PrimaryButton";
import { AntDesign } from "@expo/vector-icons";
import { Card } from "@rneui/themed";
import { axios_post } from "../api/api";
import Toast from "react-native-toast-message";

// 사용자가 입력한 문장에서 DB에 저장된 신조어 및 은어들을 추출하는 모듈
export default function WordExtract({ navigation }: any) {
  const [sentence, setSentence] = useState<string>("");
  const [extractlist, setExtractList] = useState<string[]>([]);

  // 신조어 추출하기
  const Extract = async (key: string) => {
    axios_post("sentence", {
      text: key,
    })
      .then(async (response) => {
        console.log(response.data); //추출 완료
        setExtractList(response.data.doslang.reverse());
        {
          response.data.normalize === ""
            ? Toast.show({
                type: "success",
                text1: "문장을 입력해주세요! 😥",
              })
            : response.data.doslang.length === 0
            ? Toast.show({
                type: "success",
                text1: "추출할 신조어가 없습니다! 😥",
              })
            : Toast.show({
                type: "success",
                text1: "신조어 추출 완료! 🎉",
              });
        }
      })
      .catch(function (error) {
        console.log(error);
        Toast.show({
          type: "error",
          text1: "신조어 추출 실패 😥",
        });
      });
  };

  function clearInput() {
    setSentence("");
    setExtractList([]);
  }

  const renderItem = ({ item }: { item: string }) => {
    return (
      <Card>
        <Card.Title style={styles.row}>
          <Text style={styles.titletext}>{item}</Text>
          <AntDesign
            name="arrowright"
            size={24}
            color="black"
            onPress={() => {
              navigation.navigate("WordInfo", { slang: item });
            }}
          />
        </Card.Title>
      </Card>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        multiline
        numberOfLines={4}
        style={styles.input}
        placeholder="문장을 입력해 주세요"
        onChangeText={setSentence}
        value={sentence}
      />
      <PrimaryButton onPress={() => Extract(sentence)}>
        신조어 추출
      </PrimaryButton>
      <PrimaryButton onPress={clearInput}>입력 초기화</PrimaryButton>
      {extractlist.length === 0 ? null : (
        <FlatList
          style={styles.scroll}
          data={extractlist}
          renderItem={renderItem}
          keyExtractor={(item: string, index: number) => index.toString()}
        />
      )}
      <View>
        <Text style={styles.textrequest}>
          {"찾으시는 신조어가 없으신가요? "}
        </Text>
      </View>
      <View>
        <Text
          style={styles.navitext}
          onPress={() => navigation.navigate("RequestList")}
        >
          {"신조어 등록 요청하기"}
        </Text>
      </View>
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
  textrequest: {
    fontSize: 20,
    fontFamily: "notosanskr-regular",
    color: "black",
    textAlign: "center",
  },
  input: {
    width: "80%",
    height: 100,
    padding: 10,
    margin: 12,
    borderWidth: 1,
    elevation: 3,
    backgroundColor: "#ffffff",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  titletext: {
    fontSize: 20,
    textAlign: "left",
  },
  scroll: {
    width: "100%",
    marginTop: 10,
  },
  navitext: {
    fontSize: 20,
    fontFamily: "notosanskr-bold",
    color: "#FF7F00",
  },
});
