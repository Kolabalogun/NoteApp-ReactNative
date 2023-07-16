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
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import Note from "../Components/Note";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign } from "@expo/vector-icons";
import { useGlobalContext } from "../Function/Context";
import Header from "../Components/Header";

const Home = ({ navigation }) => {
  // GET ALL NOTES FROM CONTEXT

  const { allNotes } = useGlobalContext();

  async function removeAllItemsFromAsyncStorage() {
    try {
      await AsyncStorage.clear();
      console.log("All items have been removed from AsyncStorage.");
    } catch (error) {
      console.error("Error while clearing AsyncStorage:", error);
    }
  }

  // SEARCH NOTES STATE
  const [input, setInput] = useState(""); // Initialize the input state with an empty string

  // FUNCTION TO HANDLE SEARCH NOTES
  const handleSearchNotes = (inputText) => {
    setInput(inputText);
  };

  // Filter notes based on the search input
  const filteredNotes = allNotes.filter(
    (note) =>
      note.title.toLowerCase().includes(input.toLowerCase()) ||
      note.text.toLowerCase().includes(input.toLowerCase())
  );

  const NoteElements = filteredNotes
    .map((note, index) => (
      <Note
        key={note.id}
        idx={index}
        id={note.id}
        date={note.date}
        note={note}
        navigation={navigation}
      />
    ))
    .reverse();

  return (
    <SafeAreaView className="bg-[#fff] flex-1 p-4 relative">
      <ScrollView
        showsVerticalScrollIndicator={false}
        decelerationRate={"fast"}
      >
        <View>
          {/* Header  */}
          <Header txt="My Notes" />

          {/* Search Notes  */}
          <View className="flex-row items-center bg-[#f3f3f9] rounded-lg my-5  p-2 ">
            <AntDesign name="search1" size={21} color="black" />

            <TextInput
              className=" ml-3 flex-1 "
              onChangeText={handleSearchNotes}
              value={input}
              readOnly={!allNotes.length > 0}
              cursorColor={"black"}
              placeholder="Search notes..."
            />
          </View>

          {/* List of All Notes  */}
          <TouchableOpacity onPress={() => removeAllItemsFromAsyncStorage()}>
            <Text className="font-medium">
              {allNotes.length > 0 ? "All Notes" : "Your note is empty!"}
            </Text>
          </TouchableOpacity>
          {allNotes.length > 0 ? (
            <>
              <View className="my-2">{NoteElements}</View>
            </>
          ) : (
            <View className="flex-1 my-5 items-center justify-center">
              <Image
                source={require("../../assets/empty.png")}
                className="h-72 w-72"
              />
              <Text className="font-medium text-base mt-5 z-20">
                Click the plus button below to Start Writing.
              </Text>
              <Image
                source={require("../../assets/underr.gif")}
                className=" h-8 mt-[-8px] w-full "
              />
            </View>
          )}

          {/* Add New Note  */}
        </View>
      </ScrollView>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Notes", {
            note: null,
            bgColor: null,
          })
        }
        className="bg-black absolute bottom-3 right-5 rounded-full p-3"
      >
        <AntDesign name="plus" size={24} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Home;
