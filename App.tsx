import React, { useCallback, useEffect, useState } from "react";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer, NavigatorScreenParams } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./pages/Login";
import Comment from "./pages/Comment";
import SignUp from "./pages/SignUp";
import WordRequest from "./pages/WordRequest";
import Post from "./pages/Post";
import RequestList from "./pages/RequestList";
import BottomTab, { BottomTabParamList } from "./navigation/BottomTab";
import Toast, { BaseToast } from "react-native-toast-message";
import UserContext from "./service/UserContext";
import UnlikeChange from "./pages//UnlikeChange";

// Toast를 이용하여 화면 상단에 메세지 표시
const toastConfig = {
  success: (props: { type?: string; text1?: string }) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: "#D2F39A" }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 15,
      }}
    />
  ),
  error: (props: { type?: string; text1?: string }) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: "#FF5E5E" }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 15,
      }}
    />
  ),
};

export type RootStackParamList = {
  BottomTab: NavigatorScreenParams<BottomTabParamList>;
  Login: undefined;
  SignUp: undefined;
  RequestList: undefined;
  WordRequest: undefined;
  Post: {
    postid: number;
  };
  Comment: {
    writer: string;
    itemContent: string;
    itemDate: string;
    itemProfilePic: string;
    postid: number;
  };
  UnlikeChange: {
    originSentecne: string;
    changeSentence: string;
  };
};

export default function App() {
  const [fontLoad, setFontLoad] = useState(false); // 폰트 불러오기
  const [userId, setUserId] = useState(""); // 전역 아이디 변수
  const [userName, setUserName] = useState(""); // 전역 닉네임 변수
  const [userEmail, setUserEmail] = useState(""); // 전역 이메일 변수
  const [userLogin, setUserLogin] = useState(false); // 전역 로그인 여부 변수
  const Stack = createStackNavigator<RootStackParamList>();
  // prettier-ignore
  const user = { userId, userName, userEmail, userLogin, setUserId, setUserName, setUserEmail, setUserLogin };

  // font 불러오기
  useEffect(() => {
    const Load = async () => {
      try {
        SplashScreen.preventAutoHideAsync();
        Font.loadAsync({
          "notosanskr-black": require("./assets/fonts/NotoSansKR-Black.otf"),
          "notosanskr-bold": require("./assets/fonts/NotoSansKR-Bold.otf"),
          "notosanskr-light": require("./assets/fonts/NotoSansKR-Light.otf"),
          "notosanskr-medium": require("./assets/fonts/NotoSansKR-Medium.otf"),
          "notosanskr-regular": require("./assets/fonts/NotoSansKR-Regular.otf"),
          "notosanskr-thin": require("./assets/fonts/NotoSansKR-Thin.otf"),
        });
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.error(e);
      } finally {
        setFontLoad(true);
      }
    };
    Load();
  }, []);

  const onFontLoadView = useCallback(() => {
    if (fontLoad) {
      SplashScreen.hideAsync();
    }
  }, [fontLoad]);

  // 폰트 로드 안되면 null
  if (!fontLoad) {
    return null;
  }

  // font Loading 여부에 따라 페이지 return
  return (
    <>
      <UserContext.Provider value={user}>
        <NavigationContainer onReady={onFontLoadView}>
          <Stack.Navigator
            initialRouteName="BottomTab"
            screenOptions={{
              headerTitleAlign: "center",
              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
          >
            <Stack.Screen name="BottomTab" component={BottomTab} options={{ headerShown: false }} />
            <Stack.Screen
              name="Login"
              component={Login}
              options={{
                title: "로그인",
              }}
            />
            <Stack.Screen
              name="SignUp"
              component={SignUp}
              options={{
                title: "회원가입",
              }}
            />
            <Stack.Screen
              name="RequestList"
              component={RequestList}
              options={{
                title: "신조어 요청 목록",
              }}
            />
            <Stack.Screen
              name="WordRequest"
              component={WordRequest}
              options={{
                title: "신조어 추가 요청",
              }}
            />
            <Stack.Screen
              name="Post"
              component={Post}
              options={{
                title: "게시글 작성",
              }}
            />
            <Stack.Screen
              name="Comment"
              component={Comment}
              options={{
                title: "댓글",
              }}
            />
            <Stack.Screen
              name="UnlikeChange"
              component={UnlikeChange}
              options={{
                title: "번역 건의사항",
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </UserContext.Provider>
      <Toast config={toastConfig} />
    </>
  );
}
