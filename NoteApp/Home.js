import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  Platform,
  View,
  StatusBar,
  Button,
  Pressable,
  ScrollView,
} from "react-native";
import React from "react";
import Note from "./Note";
import Modal from "./Modal";

const Home = () => {
  const [madal, madalF] = React.useState(true);

  function closeModal(params) {
    madalF(false);
  }

  React.useEffect(() => {
    setTimeout(() => {
      closeModal();
    }, 5000);
  });

  const [mode, modeF] = React.useState(true);

  const [note, noteF] = React.useState("");
  const [noteAll, noteAllF] = React.useState([]);
  const numberOfWords = 200;

  function submitToState(e) {
    if (numberOfWords - e.length >= 0) {
      noteF(e);
    }
  }

  const handleSubmit = () => {
    if (note.trim().length > 0) {
      const newNote = [
        ...noteAll,
        { date: new Date().toLocaleDateString(), text: note },
      ];

      noteAllF(newNote);

      noteF("");
    }
  };

  function handleDelete(id) {
    const newNote = noteAll.filter((note, index) => index !== id);
    noteAllF(newNote);
  }

  function handleMode() {
    modeF(!mode);
  }

  const noteElements = noteAll.map((note, index) => (
    <Note
      key={index}
      id={index}
      text={note.text}
      date={note.date}
      handleDelete={handleDelete}
    />
  ));

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: mode ? "rgb(240, 248, 255)" : "rgb(34, 38, 44)",
        },
      ]}
    >
      {madal ? (
        <Modal />
      ) : (
        <View>
          <View
            style={[
              styles.header,
              { backgroundColor: mode ? "blue" : "rgb(34, 38, 44)" },
            ]}
          >
            <View style={styles.headerItem}>
              <Text style={styles.headerTxt}>Notes</Text>
              <Pressable
                style={[
                  styles.modee,
                  { backgroundColor: mode ? "white" : "white" },
                ]}
                onPress={handleMode}
              >
                <Text
                  style={[styles.modeTxt, { color: mode ? "black" : "black" }]}
                >
                  Toggle Mode
                </Text>
              </Pressable>
            </View>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            decelerationRate={"fast"}
            style={styles.main}
          >
            <View style={styles.txtInputDiv}>
              <TextInput
                multiline
                style={styles.txtInput}
                onChangeText={submitToState}
                placeholder="Input your notes here..."
                value={note}
              />
              <View style={styles.footNote}>
                <Text>{numberOfWords - note.length} words remaining</Text>
                <Button
                  title="Save"
                  style={styles.delete}
                  onPress={handleSubmit}
                />
              </View>
            </View>

            {noteElements}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    // backgroundColor: "rgb(240, 248, 255)",
  },

  header: {
    height: 70,
    width: "100%",
    backgroundColor: "rgb(0, 0, 255)",
    padding: 10,
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "aliceblue",
  },

  headerItem: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  modee: {
    width: 100,
    height: 35,
    backgroundColor: "black",
    borderRadius: 5,

    alignItems: "center",
    justifyContent: "center",
  },

  modeTxt: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },

  headerTxt: {
    fontSize: 40,
    color: "white",
    fontWeight: "600",
  },

  main: {
    alignContent: "center",
    margin: 10,
  },

  txtInputDiv: {
    backgroundColor: "white",
    height: 170,
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    justifyContent: "space-between",
  },
  txtInput: {
    // padding: 10,
    // height: 150,
  },

  footNote: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
