import { View, StyleSheet, Dimensions } from "react-native";

function Card({ children }: any) {
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
