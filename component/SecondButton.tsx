import { View, Text, Pressable, StyleSheet } from "react-native";

function SecondButton({ children, onPress }: any) {
  return (
    <View>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => pressed && styles.pressed}
      >
        <View style={[styles.button]}>
          <Text style={[styles.buttonText]}>{children}</Text>
        </View>
      </Pressable>
    </View>
  );
}

export default SecondButton;

const styles = StyleSheet.create({
  button: {
    borderRadius: 4,
    padding: 8,
    backgroundColor: "#3e04c3",
  },
  flat: {
    backgroundColor: "transparent", // 투명 색깔
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  flatText: {
    color: "#a281f0",
  },
  pressed: {
    opacity: 0.75,
    backgroundColor: "#c6affc",
    borderRadius: 4,
  },
});