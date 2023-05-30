import React, { useState } from "react";
import Modal from "react-native-modal";
import { StyleSheet, Text, View, Dimensions, Pressable } from "react-native";

interface IModalWindow {
  open: boolean;
  okPress: () => void;
  cancelPress?: () => void;
  title?: string;
  text1?: string;
  text2?: string;
  cancel?: boolean;
}

// 모달 안내창 띄우게 하는 module
export default function ModalWindow(props: IModalWindow) {
  const { open, okPress, cancelPress, title, text1, text2, cancel } = props;
  return (
    <>
      <Modal isVisible={open} style={styles.modal}>
        <View style={styles.textContainer}>
          {title && <Text style={styles.texttitlestyle}>{title}</Text>}
          {text1 && <Text style={styles.textstyle}>{text1}</Text>}
          <Text style={styles.textstyle}>{text2}</Text>
        </View>

        <View style={styles.modalButtons}>
          <Pressable onPress={okPress}>
            <View style={styles.modalButtonyes}>
              <Text style={styles.buttontextstyle}> 확인 </Text>
            </View>
          </Pressable>
          {cancel && (
            <Pressable onPress={cancelPress}>
              <View style={styles.modalButtonno}>
                <Text style={styles.buttontextstyle}> 취소 </Text>
              </View>
            </Pressable>
          )}
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  modal: {
    backgroundColor: "#ffffff",
    borderRadius: 5,
    alignItems: "stretch",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: Dimensions.get("window").height * 0.3,
    width: 300,
    maxHeight: Dimensions.get("window").height * 0.3,
  },
  textContainer: {
    flex: 0.6,
    marginTop: "10%",
    justifyContent: "center",
  },
  texttitlestyle: {
    textAlign: "left",
    fontSize: 25,
    marginTop: "-5%",
    marginLeft: "20%",
    fontFamily: "notosanskr-bold",
  },
  textstyle: {
    textAlign: "center",
    fontSize: 20,
    marginTop: "-5%",
    fontFamily: "notosanskr-medium",
  },
  buttontextstyle: {
    textAlign: "center",
    fontSize: 20,
    color: "#ffffff",
    marginTop: "-5%",
    fontFamily: "notosanskr-bold",
  },
  modalButtons: {
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    flex: 0.4,
  },
  modalButtonyes: {
    borderRadius: 100,
    height: 45,
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: "#640233",
    width: 90,
  },
  modalButtonno: {
    borderRadius: 100,
    height: 45,
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: "#d3d3d3",
    width: 90,
  },
});
