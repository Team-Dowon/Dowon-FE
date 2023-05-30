import { ReactNode } from "react";
import { View, StyleSheet, Dimensions } from "react-native";

// 커뮤니티의 게시글에 대한 디자인을 설정하고 재활용하는 식으로 사용
function Card({ children }: { children: ReactNode }) {
  return <View style={styles.card}>{children}</View>;
}

export default Card;

const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  card: {
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: deviceWidth < 380 ? 12 : 30,
    marginHorizontal: 24,
    padding: 16,
    borderRadius: 8,
    elevation: 3,
    overflow: "hidden",
    /* iOS에서는 shadowColor, shadowOffset, shadowRadius, shadowOpacity로 그림자 생성*/
  },
});
