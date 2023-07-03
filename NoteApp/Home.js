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
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import Note from "./Note";
import Modal from "./Modal";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
  const [noteAll, noteAllF] = useState([]);
  const numberOfWords = 200;

  console.log(noteAll, "noteAll");

  // FUCNTION TO GET SAVED DATA TO REACT ASYNC STORAGE

  const getDataFromAsyncStorage = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("notes");

      const parsedData = jsonValue ? JSON.parse(jsonValue) : [];
      noteAllF(parsedData);
      console.log("Array of objects retrieved:", parsedData);
    } catch (error) {
      console.error("Error retrieving array of objects:", error);
    }
  };

  useEffect(() => {
    getDataFromAsyncStorage();
  }, []);

  console.log(noteAll);

  function submitToState(e) {
    if (numberOfWords - e.length >= 0) {
      noteF(e);
    }
  }

  const handleSubmit = async () => {
    if (note.trim().length > 0) {
      const nNote = { date: new Date().toLocaleDateString(), text: note };

      const newNote = [...noteAll, nNote];
      noteAllF(newNote);

      // SAVE DATA TO REACT ASYNC STORAGE

      SaveToAsyncStorage(newNote);

      noteF("");
    }
  };

  // FUCNTION TO SAVE DATA TO REACT ASYNC STORAGE

  const SaveToAsyncStorage = async (value) => {
    const jsonValue = JSON.stringify(value);

    try {
      await AsyncStorage.setItem("notes", jsonValue);
      Alert.alert("Note Saved");
    } catch (error) {
      console.error("Error saving array of objects:", error);
    }
  };

  function handleDelete(id) {
    const newNote = noteAll.filter((note, index) => index !== id);
    noteAllF(newNote);

    // FUCNTION TO DELETE DATA TO REACT ASYNC STORAGE
    SaveToAsyncStorage(newNote);
  }

  function handleMode() {
    modeF(!mode);
  }

  const noteElements = noteAll?.map((note, index) => (
    <Note
      key={index}
      id={index}
      text={note.text}
      date={note.date}
      handleDelete={handleDelete}
    />
  ));

  return (
    <SafeAreaView
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
              { backgroundColor: mode ? "#2684fc" : "rgb(34, 38, 44)" },
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
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
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
