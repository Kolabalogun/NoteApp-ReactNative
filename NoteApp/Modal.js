import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Modal = () => {
  return (
    <View style={styles.modal}>
      <View style={styles.modalInit}>
        <Text style={styles.modaltxt}>Notes</Text>
        <Text style={styles.modaltxtcaption}>Developed by Ibrahim</Text>
      </View>
    </View>
  );
};

export default Modal;

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  modalInit: {
    height: 400,
    justifyContent: "space-between",
    alignItems: "center",
  },

  modaltxt: {
    fontSize: 50,
    fontWeight: "700",
    color: "blue",
  },
  modaltxtcaption: {
    borderBottomWidth: 1,
    borderBottomColor: "blue",
    borderTopWidth: 1,
    borderTopColor: "blue",
    padding: 5,
  },
});
