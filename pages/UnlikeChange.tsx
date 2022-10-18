import { useState } from "react";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
} from "react-native";
import PrimaryButton from "../component/PrimaryButton";

export default function UnlikeChange({ navigation }) {
  const [defaultRating, setdefuaultRating] = useState(2);
  const [maxRating, setmaxRating] = useState([1, 2, 3, 4, 5]);
  const [isClicked, setClick] = useState(false);

  const starImgFilled =
    "https://raw.githubusercontent.com/tranhonghan/images/main/star_filled.png";
  const starImgCorner =
    "https://raw.githubusercontent.com/tranhonghan/images/main/star_corner.png";

  const CustomRatingBar = () => {
    return (
      <View style={styles.customRatingBarStlye}>
        {maxRating.map((item, key) => {
          return (
            <TouchableOpacity
              activeOpacity={0.7}
              key={item}
              onPress={() => {
                setdefuaultRating(item), setClick(true);
              }}
            >
              <Image
                style={styles.starImgStyle}
                source={
                  item <= defaultRating
                    ? { uri: starImgFilled }
                    : { uri: starImgCorner }
                }
              />
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>번역이 맘에 들지 않으셨나요?</Text>
      <Text style={styles.title}>별점을 입력해주세요!</Text>
      <CustomRatingBar />
      <Text style={styles.textStyle}>
        {" "}
        {defaultRating + " / " + maxRating.length}
      </Text>
      {isClicked && (
        <View style={styles.input}>
          <TextInput
            multiline
            numberOfLines={5}
            editable
            maxLength={100}
            placeholder="더 깔끔한 번역문장을 입력해주세요(100자 이내) &#13;&#10; "
          />
        </View>
      )}
      {isClicked && (
        <PrimaryButton
          onPress={() => {
            Alert.alert("건의 완료", "건의 완료되었습니다."),
              navigation.navigate("Main");
          }}
        >
          보내기
        </PrimaryButton>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    textAlign: "center",
    fontSize: 24,
    marginTop: 10,
  },
  customRatingBarStlye: {
    justifyContent: "center",
    flexDirection: "row",
    marginTop: 30,
  },
  starImgStyle: {
    width: 40,
    height: 40,
    resizeMode: "cover",
  },
  textStyle: {
    textAlign: "center",
    fontsize: 20,
    marginTop: 20,
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
});
