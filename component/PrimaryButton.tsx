import { ReactNode } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

/* props.children으로 접근 안해도 들어오는 props 객체에서 children 프로퍼티를 추출할 수 있음 
자고로 children이란 특정 컴포넌트 사이에 있는 컴포넌트(값)를 받아올 수 있음*/
function PrimaryButton({ children, onPress }: { children: ReactNode; onPress: () => void }) {
  return (
    <View style={styles.buttonOuterContainer}>
      <Pressable
        style={({ pressed }) =>
          pressed ? [styles.buttonInnerContainer, styles.pressed] : styles.buttonInnerContainer
        }
        onPress={onPress}
        android_ripple={{ color: "#640233" }}
      >
        <Text style={styles.buttonText}>{children}</Text>
      </Pressable>
    </View>
  );
}

export default PrimaryButton;

const styles = StyleSheet.create({
  buttonOuterContainer: {
    width: "75%",
    borderRadius: 28,
    marginTop: 10,
    overflow: "hidden",
  },
  buttonInnerContainer: {
    backgroundColor: "#72063c",
    paddingVertical: 8,
    paddingHorizontal: 16,
    elevation: 2,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  pressed: {
    opacity: 0.75,
  },
});
