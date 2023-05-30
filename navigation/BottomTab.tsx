import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, FontAwesome, AntDesign, Feather } from "@expo/vector-icons";
import Community from "../pages/Community";
import Profile from "../pages/Profile";
import WordExtract from "../pages/WordExtract";
import Main from "../pages/Main";
import StackDictionary from "../navigation/StackDictionary";

// BottomTab을 이용하여 페이지를 이동할 수 있음
export default function BottomTab({ navigation }) {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      initialRouteName="Main"
      screenOptions={{
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        tabBarLabelStyle: { color: "#640233" },
      }}
    >
      <Tab.Screen
        name="Main"
        component={Main}
        options={{
          title: "신조어 번역",
          unmountOnBlur: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="ios-home"
              style={{
                color: focused ? "#640233" : "#777676",
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
          tabBarLabelStyle: { color: "#640233" },
          headerShown: false,
          unmountOnBlur: false,
          tabBarIcon: ({ focused }) => (
            <FontAwesome
              name="search"
              style={{
                color: focused ? "#640233" : "#777676",
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
          tabBarLabelStyle: { color: "#640233" },
          unmountOnBlur: false,
          headerRight: () => (
            <Feather
              name="plus-square"
              size={24}
              color="black"
              style={{ paddingRight: 15 }}
              onPress={() => navigation.navigate("Post", { postid: null })}
            />
          ),
          tabBarIcon: ({ focused }) => (
            <AntDesign
              name="eyeo"
              style={{
                color: focused ? "#640233" : "#777676",
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
          title: "신조어 추출",
          tabBarLabelStyle: { color: "#640233" },
          unmountOnBlur: false,
          tabBarIcon: ({ focused }) => (
            <FontAwesome
              name="file-word-o"
              style={{
                color: focused ? "#640233" : "#777676",
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
          tabBarLabelStyle: { color: "#640233" },
          unmountOnBlur: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="person"
              style={{
                color: focused ? "#640233" : "#777676",
              }}
              size={24}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
