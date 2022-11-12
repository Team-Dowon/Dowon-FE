import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import PrimaryButton from "../component/PrimaryButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import UserContext from "../service/UserContext";
import { axios_post, axios_patch } from "../api/api";
import * as ImagePicker from "expo-image-picker";
import { Avatar } from "@rneui/themed";
import Toast from "react-native-toast-message";
import FormData from "form-data";

// 개인 프로필 페이지
export default function Profile({ navigation }: any) {
  const [userProfilePic, setUserProfilePic] = useState(""); // 유저 이미지 저장
  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions(); // 권한 요청을 위한 hooks
  const isFocused = useIsFocused(); // navigation으로 화면 이동시 새로고침하기 위해
  const userContext = useContext(UserContext); // 전역변수 사용하기 위한 변수

  // 로그인 여부 확인
  const islogin = async (key: string) => {
    try {
      const token = await AsyncStorage.getItem(key);
      if (token !== null) {
        userContext.setUserlogin(true);
        getUserData("access");
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  // 유저정보 가져오기
  const getUserData = async (key: string) => {
    axios_post("user", {
      Token: await AsyncStorage.getItem(key),
    })
      .then((response) => {
        console.log("유저정보 불러오기 완료");
        console.log(response.data);
        setUserProfilePic(response.data.profile_pic);
        userContext.setUserId(response.data.u_id);
        userContext.setUserName(response.data.nickname);
        userContext.setUserEmail(response.data.email);
      })
      .catch(function (error) {
        console.log("유저정보 못가져옴");
        console.log(error.message);
        AsyncStorage.clear();
        userContext.setUserlogin(false);
        userContext.setUserId("");
        userContext.setUserName("");
        userContext.setUserEmail("");
        setUserProfilePic("");
        Toast.show({
          type: "success",
          text1: "자동 로그아웃되었습니다! 🖐",
        });
      });
  };

  // 로그아웃
  const logouthandler = async (key: string) => {
    axios_post("user/logout", {
      Token: await AsyncStorage.getItem(key),
    })
      .then((response) => {
        console.log(response.data.message); //로그아웃 성공하면 로그아웃 완료라고 뜸
        AsyncStorage.clear();
        userContext.setUserlogin(false);
        userContext.setUserId("");
        userContext.setUserName("");
        userContext.setUserEmail("");
        setUserProfilePic("");
        Toast.show({
          type: "success",
          text1: "로그아웃되었습니다! 🖐",
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // 이미지 업로드하기
  const uploadImage = async () => {
    // 권한 확인 코드: 권한 없으면 물어보고, 승인하지 않으면 함수 종료
    if (!status?.granted) {
      const permission = await requestPermission();
      if (!permission.granted) {
        return null;
      }
    }

    // 이미지 업로드 기능
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
      aspect: [1, 1],
    });

    if (result.cancelled) {
      return null; // 이미지 업로드 취소한 경우
    }

    // 이미지 업로드 결과 및 이미지 경로 업데이트
    console.log(result);
    const localUri = result.uri;
    const filename = localUri.split("/").pop();
    const match = /\.(\w+)$/.exec(filename ?? "");
    const type = match ? `image/${match[1]}` : "image";
    const formData = new FormData();
    formData.append("profile_pic", { uri: localUri, name: filename, type });

    uploadPicServer(formData);
  };

  const uploadPicServer = async (picUri: FormData) => {
    console.log(picUri);
    axios_patch("user/profile", picUri)
      .then((response) => {
        console.log(response.data.message); //로그아웃 성공하면 로그아웃 완료라고 뜸
        getUserData("access");
        Toast.show({
          type: "success",
          text1: "사진이 변경되었습니다! 🖐",
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // 로그인 페이지로 이동하는 함수
  function goToLogin() {
    navigation.navigate("Login");
  }

  // 회원가입 페이지로 이동하는 함수
  function goToSignUp() {
    navigation.navigate("SignUp");
  }

  // 강제 로그아웃하는 함수
  function reset() {
    AsyncStorage.clear();
    userContext.setUserlogin(false);
    userContext.setUserId("");
    userContext.setUserName("");
    userContext.setUserEmail("");
    setUserProfilePic("");
    Toast.show({
      type: "success",
      text1: "로그아웃되었습니다! 🖐",
    });
  }

  // 로그인 여부 계속 확인
  useEffect(() => {
    islogin("access");
  }, [isFocused]);

  return (
    <SafeAreaView style={styles.container}>
      {/* 로그인 되어있는 경우 or 로그인이 안되있는 경우에 따라 나뉘어짐 */}
      {userContext.userlogin ? (
        <>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              marginBottom: 20,
            }}
          >
            {/* 프로필 사진 여부에 따라 나뉘어짐 -> 사진 or 닉네임 표시  */}
            {userProfilePic ? (
              <Avatar
                size={150}
                rounded
                source={{ uri: userProfilePic }}
                title={userContext.username}
                containerStyle={{ backgroundColor: "#63646d", marginRight: 10 }}
              />
            ) : (
              <Avatar
                size={150}
                rounded
                title={userContext.username.slice(-2)}
                containerStyle={{ backgroundColor: "#3d4db7", marginRight: 10 }}
              />
            )}
            <Avatar.Accessory size={45} onPress={uploadImage} />
          </View>
          <Text style={styles.text}>안녕하세요! {userContext.username}님</Text>
          <PrimaryButton onPress={() => logouthandler("access")}>
            로그아웃
          </PrimaryButton>
          <View style={{ marginTop: 20 }}>
            <Text style={styles.text}>
              <Text style={styles.navitext} onPress={reset}>
                {"로그아웃이 안될경우 클릭"}
              </Text>
            </Text>
          </View>
        </>
      ) : (
        <>
          <Text style={styles.text}>로그인을 해주세요</Text>
          <PrimaryButton onPress={goToLogin}>로그인 </PrimaryButton>
          <Text style={styles.text}>아이디가 없으면?</Text>
          <PrimaryButton onPress={goToSignUp}>회원가입</PrimaryButton>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "DEE8FF",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 30,
    fontFamily: "notosanskr-bold",
    fontWeight: "400",
    color: "black",
    textAlign: "center",
  },
  logo: {
    width: 100,
    height: 100,
  },
  navitext: {
    fontSize: 15,
    fontFamily: "notosanskr-medium",
    color: "#a1a09e",
  },
});
