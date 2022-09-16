import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, FontAwesome, AntDesign, Feather } from "@expo/vector-icons";
import Community from "../pages/Community";
import Profile from "../pages/Profile";
import WordExtract from "../pages/WordExtract";
import Main from "../pages/Main";
import StackDictionary from "../navigation/StackDictionary";
import { basic_theme } from "../theme";
import LogoTitle from "../component/LogoTitle";

export default function BottomTab({ navigation }: any) {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      initialRouteName="Main"
      screenOptions={{
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Tab.Screen
        name="Main"
        component={Main}
        options={{
          title: "신조어 번역",
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="ios-home"
              style={{
                color: focused ? basic_theme.focusedin : basic_theme.focusedout,
              }}
              size={24}
            />
          ),
        }}
      />
      <Tab.Screen
        name="StackDictionary"
        component={StackDictionary}
        options={{
          title: "신조어 사전",
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <FontAwesome
              name="search"
              style={{
                color: focused ? basic_theme.focusedin : basic_theme.focusedout,
              }}
              size={24}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Community"
        component={Community}
        options={{
          title: "커뮤니티",
          headerRight: () => <Feather name="plus-square" size={24} color="black" style={{ paddingRight: 15 }} onPress={() => navigation.navigate("Post")} />,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <AntDesign
              name="eyeo"
              style={{
                color: focused ? basic_theme.focusedin : basic_theme.focusedout,
              }}
              size={24}
            />
          ),
        }}
      />
      <Tab.Screen
        name="WordExtract"
        component={WordExtract}
        options={{
          title: "추출",
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <FontAwesome
              name="file-word-o"
              style={{
                color: focused ? basic_theme.focusedin : basic_theme.focusedout,
              }}
              size={24}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          title: "프로필",
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="person"
              style={{
                color: focused ? basic_theme.focusedin : basic_theme.focusedout,
              }}
              size={24}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
