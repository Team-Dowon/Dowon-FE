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
  TouchableHighlight,
} from "react-native";
import { MaterialIcons, SimpleLineIcons } from "@expo/vector-icons";

// 창 아래에서 modal창 나오게 하는 컴포넌트
export default function BottomWindow(props: any) {
  const { modifyfunc, deletefunc, BottomVisible, setBottomVisible } = props;
  const screenHeight = Dimensions.get("screen").height;
  const panY = useRef(new Animated.Value(screenHeight)).current;
  const translateY = panY.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [0, 0, 1],
  });

  // BottomSheet를 초기 위치로 움직이는 함수입니다.
  const resetBottomSheet = Animated.timing(panY, {
    toValue: 0,
    duration: 300,
    useNativeDriver: true,
  });

  // BottomSheet를 내리는 함수입니다.
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
        if (gestureState.dy > 0 && gestureState.vy > 0.5) {
          closeModal();
        } else {
          resetBottomSheet.start();
        }
      },
    })
  ).current;

  // BottomVisible이면 BottomSheet를 초기 위치로 움직이는 함수 실행
  useEffect(() => {
    if (props.BottomVisible) {
      resetBottomSheet.start();
    }
  }, [props.BottomVisible]);

  // BottomSheet를 닫는 함수입니다.
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
          <View style={{ marginTop: 20 }}>
            <TouchableHighlight onPress={modifyfunc} underlayColor="#acacac">
              <View style={styles.modalButton}>
                <Text style={styles.buttontextstyle}>
                  <SimpleLineIcons name="pencil" size={24} color="black" />
                  &nbsp;&nbsp;수정
                </Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight onPress={deletefunc} underlayColor="#acacac">
              <View style={styles.modalButton}>
                <Text style={styles.buttontextstyle}>
                  <MaterialIcons name="delete" size={24} color="black" />
                  &nbsp;&nbsp;삭제
                </Text>
              </View>
            </TouchableHighlight>
          </View>
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
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  modalButton: {
    borderRadius: 100,
    height: 45,
    alignSelf: "center",
    justifyContent: "flex-start",
    minWidth: "100%",
    flexDirection: "row",
    marginTop: 10,
  },
  buttontextstyle: {
    textAlign: "left",
    fontSize: 30,
    color: "#000000",
    marginLeft: 20,
    marginTop: -25,
    fontFamily: "notosanskr-bold",
  },
});
