import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";

const Note = ({ text, handleDelete, id, date }) => {
  return (
    <View style={styles.noteDiv}>
      <View className="top">
        <Text> {text}</Text>
      </View>

      <View style={styles.footNote}>
        <Text>{date}</Text>
        <Button
          title="Delete"
          onPress={() => handleDelete(id)}
          color="rgb(255, 0, 0)"
          style={styles.delete}
        />
      </View>
    </View>
  );
};

export default Note;

const styles = StyleSheet.create({
  noteDiv: {
    backgroundColor: "white",
    height: 170,
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    display: "flex",
    justifyContent: "space-between",
  },

  footNote: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  delete: {
    backgroundColor: "rgb(255, 0, 0)",
  },
});
