import React, { useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  Text,
  Modal,
  Animated,
  TouchableWithoutFeedback,
  Dimensions,
  PanResponder,
  Pressable,
} from "react-native";

// 창 아래에서 modal창 나오게 하는 컴포넌트
export default function BottomWindow(props: any) {
  const { modifyfunc, deletefunc, BottomVisible, setBottomVisible } = props;
  const screenHeight = Dimensions.get("screen").height;
  const panY = useRef(new Animated.Value(screenHeight)).current;
  const translateY = panY.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [0, 0, 1],
  });

  const resetBottomSheet = Animated.timing(panY, {
    toValue: 0,
    duration: 300,
    useNativeDriver: true,
  });

  const closeBottomSheet = Animated.timing(panY, {
    toValue: screenHeight,
    duration: 300,
    useNativeDriver: true,
  });

  const panResponders = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => false,
      onPanResponderMove: (event, gestureState) => {
        panY.setValue(gestureState.dy);
      },
      onPanResponderRelease: (event, gestureState) => {
        if (gestureState.dy > 0 && gestureState.vy > 1.5) {
          closeModal();
        } else {
          resetBottomSheet.start();
        }
      },
    })
  ).current;

  useEffect(() => {
    if (props.BottomVisible) {
      resetBottomSheet.start();
    }
  }, [props.BottomVisible]);

  const closeModal = () => {
    closeBottomSheet.start(() => {
      setBottomVisible(false);
    });
  };

  return (
    <Modal
      visible={BottomVisible}
      animationType={"fade"}
      transparent
      statusBarTranslucent
    >
      <View style={styles.overlay}>
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.background} />
        </TouchableWithoutFeedback>
        <Animated.View
          style={{
            ...styles.bottomSheetContainer,
            transform: [{ translateY: translateY }],
          }}
          {...panResponders.panHandlers}
        >
          <Pressable onPress={modifyfunc}>
            <View style={styles.modalButtonyes}>
              <Text style={styles.buttontextstyle}> 수정 </Text>
            </View>
          </Pressable>
          <Pressable onPress={deletefunc}>
            <View style={styles.modalButtonyes}>
              <Text style={styles.buttontextstyle}> 삭제 </Text>
            </View>
          </Pressable>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  background: {
    flex: 1,
  },
  bottomSheetContainer: {
    height: 300,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  modalButtonyes: {
    borderRadius: 100,
    height: 45,
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: "#640233",
    width: 90,
  },
  buttontextstyle: {
    textAlign: "center",
    fontSize: 20,
    color: "#ffffff",
    marginTop: "-5%",
    fontFamily: "notosanskr-bold",
  },
});
