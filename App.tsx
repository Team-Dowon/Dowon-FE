import React, { useCallback, useEffect, useState } from "react";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { Feather } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./pages/Login";
import Comment from "./pages/Comment";
import SignUp from "./pages/SignUp";
import WordRequest from "./pages/WordRequest";
import Post from "./pages/Post";
import RequestList from "./pages/RequestList";
import BottomTab from "./navigation/BottomTab";
import Toast, { BaseToast } from "react-native-toast-message";
import UserContext from "./service/UserContext";

const toastConfig = {
  // 어떤 type이 들어올지 몰라 type을 any로 설정했음
  // Toast는 짧게 메시지 표시해주는 거
  success: (props: any) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: "#DEE8FF" }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 15,
      }}
    />
  ),
  error: (props: any) => (
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

export default function App() {
  const [fontLoad, setFontLoad] = useState<boolean>(false); // 폰트 불러오기
  const [userId, setUserId] = useState<string | null>(null); // 전역 아이디 변수
  const [username, setUserName] = useState<string | null>(null); // 전역 닉네임 변수
  const [useremail, setUserEmail] = useState<string | null>(null); // 전역 이메일 변수
  const [userlogin, setUserlogin] = useState<boolean>(false); // 전역 로그인 여부 변수
  const Stack = createStackNavigator();
  const user = {
    userId,
    username,
    useremail,
    userlogin,
    setUserId,
    setUserName,
    setUserEmail,
    setUserlogin,
  };

  // font 불러오기
  useEffect(() => {
    const Load = async () => {
      try {
        await SplashScreen.preventAutoHideAsync();
        await Font.loadAsync({
          "notosanskr-black": require("./assets/fonts/NotoSansKR-Black.otf"),
          "notosanskr-bold": require("./assets/fonts/NotoSansKR-Bold.otf"),
          "notosanskr-light": require("./assets/fonts/NotoSansKR-Light.otf"),
          "notosanskr-medium": require("./assets/fonts/NotoSansKR-Medium.otf"),
          "notosanskr-regular": require("./assets/fonts/NotoSansKR-Regular.otf"),
          "notosanskr-thin": require("./assets/fonts/NotoSansKR-Thin.otf"),
        });
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setFontLoad(true);
      }
    };
    Load();
  }, []);

  const onFontLoadView = useCallback(async () => {
    if (fontLoad) {
      await SplashScreen.hideAsync();
    }
  }, [fontLoad]);

  if (!fontLoad) {
    return null;
  }

  // font Loading 여부에 따라 return
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
            <Stack.Screen
              name="BottomTab"
              component={BottomTab}
              options={{ headerShown: false }}
            />
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
          </Stack.Navigator>
        </NavigationContainer>
        <Toast config={toastConfig} />
      </UserContext.Provider>
    </>
  );
}
