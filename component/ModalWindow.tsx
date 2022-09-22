import React, { useState } from "react";
import Modal from "react-native-modal";
import { StyleSheet, Text, View, Dimensions, Pressable } from "react-native";

export default function ModalWindow({
  open,
  okPress,
  cancelPress,
  title,
  text1,
  text2,
  confirmText,
  cancelText,
}: any) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <Modal isVisible={open}>
      <View>
        {/*{title && <Text style={styles.textstyle}>{title}</Text>}
        {text1 && <Text style={styles.textstyle}>{text1}</Text>}*/}
        <Text>{text2}</Text>
      </View>
      {/*  
      <View style={styles.modalButtons}>
        <Pressable onPress={okPress}>
          <View style={styles.modalButton}>
            <Text style={styles.textstyle}>{confirmText}</Text>
          </View>
        </Pressable>
        {cancelText && (
          <Pressable onPress={cancelPress}>
            <View style={styles.modalButton}>
              <Text style={styles.textstyle}>{cancelText}</Text>
            </View>
          </Pressable>
        )}
      </View>
      */}
    </Modal>
  );
}

// 이쪽이 문제 여기 좀 손봐야댐
const styles = StyleSheet.create({
  modal: {
    backgroundColor: "#ffffff",
    flex: 0.3,
    alignItems: "stretch",
    justifyContent: "center",
    alignSelf: "center",
    width: Dimensions.get("window").width * 0.85,
  },
  textContainer: {
    flex: 0.6,
    marginTop: "10%",
    justifyContent: "center",
  },
  textstyle: {
    textAlign: "center",
    fontSize: 20,
    marginEnd: "5px",
  },
  modalButtons: {
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    flex: 0.4,
  },
  modalButton: {
    borderRadius: 100,
    height: 45,
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    width: 90,
  },
});
