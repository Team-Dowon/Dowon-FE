import { View, StyleSheet, Dimensions } from "react-native";

function Card({ children }) {
  return <View style={styles.card}>{children}</View>;
}

export default Card;

const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  card: {
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: deviceWidth < 380 ? 18 : 36,
    marginHorizontal: 24,
    padding: 16,
    borderRadius: 8,
    elevation: 10,
    overflow: "hidden",
    /* iOS에서는 shadowColor, shadowOffset, shadowRadius, shadowOpacity로 그림자 생성*/
  },
});
