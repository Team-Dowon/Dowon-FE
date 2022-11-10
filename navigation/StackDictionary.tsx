import { createStackNavigator } from "@react-navigation/stack";
import WordInfo from "../pages/WordInfo";
import Search from "../pages/Search";
import Dictionary from "../pages/Dictionary";
import SlangList from "../pages/SlangList";

// Stack을 쌓아가면서 페이지를 이동 시킬 수 있음
export default function StackDictionary() {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName="Dictionary"
      screenOptions={{
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen
        name="Dictionary"
        component={Dictionary}
        options={{
          title: "신조어 사전",
        }}
      />
      <Stack.Screen
        name="SlangList"
        component={SlangList}
        options={{
          title: "초성별 신조어 목록",
        }}
      />
      <Stack.Screen
        name="Search"
        component={Search}
        options={{
          title: "검색",
        }}
      />
      <Stack.Screen
        name="WordInfo"
        component={WordInfo}
        options={{
          title: "상세정보",
        }}
      />
    </Stack.Navigator>
  );
}
