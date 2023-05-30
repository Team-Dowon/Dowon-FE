import { useState, useContext } from "react";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import PrimaryButton from "../component/PrimaryButton";
import ModalWindow from "../component/ModalWindow";
import { axios_post } from "../api/api";
import Toast from "react-native-toast-message";
import UserContext from "../service/UserContext";

export default function UnlikeChange({ route, navigation }) {
  const [defaultRating, setdefaultRating] = useState(2);
  const [maxRating, setmaxRating] = useState([1, 2, 3, 4, 5]);
  const [isClicked, setClick] = useState(false);
  const [geonuiModal, setGeonuiModal] = useState(false);
  const [loginModal, setLoginModal] = useState(false);
  const [betterTransfer, setbetterTransfer] = useState("");
  const { originSentence, changeSentence } = route.params;
  const userContext = useContext(UserContext); // 전역변수 사용하기 위한 변수

  const starImgFilled = "https://raw.githubusercontent.com/tranhonghan/images/main/star_filled.png";
  const starImgCorner = "https://raw.githubusercontent.com/tranhonghan/images/main/star_corner.png";

  // 개선문장 post
  const postImprovement = async () => {
    if (!userContext?.userlogin) {
      setLoginModal(true);
    } else {
      axios_post("improvement", {
        star: defaultRating,
        initial_sentence: originSentence,
        trans_sentence: changeSentence,
        request_sentence: betterTransfer,
      })
        .then(async (response) => {
          console.log(response.data); //post 완료
          setGeonuiModal(true);
        })
        .catch(function (error) {
          console.log(error);
          navigation.navigate("Main");
        });
    }
  };

  const CustomRatingBar = () => {
    return (
      <View style={styles.customRatingBarStlye}>
        {maxRating.map((item, key) => {
          return (
            <TouchableOpacity
              activeOpacity={0.7}
              key={item}
              onPress={() => {
                setdefaultRating(item), setClick(true);
              }}
            >
              <Image
                style={styles.starImgStyle}
                source={item <= defaultRating ? { uri: starImgFilled } : { uri: starImgCorner }}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>번역이 마음에 드시지 않으신가요?</Text>
      <Text style={styles.title}>별점을 입력해주세요!</Text>
      <CustomRatingBar />
      <Text style={styles.textStyle}>{defaultRating + " / " + maxRating.length}</Text>
      {isClicked && (
        <>
          <View>
            <Text style={styles.fontStyle}>사용자 입력 문장 : {originSentence}</Text>
            <Text style={styles.fontStyle}>시스템 번역 문장 : {changeSentence}</Text>
          </View>
          <View style={styles.input}>
            <KeyboardAvoidingView>
              <TextInput
                multiline
                numberOfLines={5}
                editable
                maxLength={100}
                onChangeText={(text) => setbetterTransfer(text)}
                placeholder="개선을 위해 깔끔한 번역문장을 입력해주세요&#13;&#10;(100자 이내) &#13;&#10; "
              />
            </KeyboardAvoidingView>
          </View>
        </>
      )}
      {isClicked && (
        <PrimaryButton
          onPress={() => {
            if (betterTransfer.length != 0) {
              postImprovement();
            } else {
              Toast.show({
                text1: `문장을 입력해주세요!`,
              });
            }
          }}
        >
          보내기
        </PrimaryButton>
      )}
      <ModalWindow
        open={geonuiModal}
        okPress={() => {
          setGeonuiModal(false);
          navigation.navigate("Main");
        }}
        title="건의 완료"
        text2="건의 완료되었습니다."
      />
      <ModalWindow
        open={loginModal}
        okPress={() => {
          setLoginModal(false), navigation.navigate("Login");
        }}
        text2="로그인 하셔야 합니다!"
      />
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
    marginBottom: 20,
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
  fontStyle: {
    fontSize: 18,
    fontFamily: "notosanskr-bold",
  },
});
