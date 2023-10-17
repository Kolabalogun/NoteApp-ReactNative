import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  AntDesign,
  Entypo,
  Feather,
  FontAwesome,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import SelectDropdown from "react-native-select-dropdown";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useGlobalContext } from "../Function/Context";

const initialState = {
  id: "",
  title: "",
  text: "",
  category: "Personal",
  favorite: false,
  date: new Date().toLocaleDateString(),
};

// THIS NOTES COMPONENT IS RESPOSIBLE FOR SAVING NEW NOTES
// AS WELL AS UPDATING THEM

const Notes = ({ route, navigation }) => {
  // GET NOTE DETAILS IF EDITING

  const { note, bgColor, id } = route.params;

  // STATE TO BE ABLE EDIT NOTE

  const [editNote, setEditNote] = useState(note ? false : true);

  // GET ALL NOTES FROM CONTEXT

  const { allNotes, allNotesF, allCategory } = useGlobalContext();

  // STATE FOR NOTE

  const [noteState, noteStateF] = useState(note ? note : initialState);

  // GET ID FROM DATE

  // to set timeId
  useEffect(() => {
    const dateId = new Date().getTime();

    if (!note) {
      noteStateF({ ...noteState, id: dateId });
    }
  }, []);

  // FUNCTION HADLING SAVE NEW NOTE

  const handleSubmit = async () => {
    if (noteState.text.trim().length > 0) {
      const allNewNotes = [...allNotes, noteState];

      allNotesF(allNewNotes);

      // Save note to Async Storage

      SaveToAsyncStorage(allNewNotes);

      // Go back to the previous screen
      navigation.goBack();
    }
  };

  // FUCNTION TO DELETE DATA TO REACT ASYNC STORAGE

  function deleteConfimation() {
    Alert.alert("Delete Note", "Are you sure you want to delete this Note?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      { text: "Proceed", onPress: () => handleDelete(id) },
    ]);
  }

  function handleDelete(id) {
    const newNote = allNotes.filter((note) => note.id !== id);
    allNotesF(newNote);

    // Save updated note to Async Storage
    SaveToAsyncStorage(newNote);

    // Go back to the previous screen
    navigation.goBack();
  }

  // FUCNTION TO SAVE DATA TO REACT ASYNC STORAGE
  const SaveToAsyncStorage = async (value) => {
    const jsonValue = JSON.stringify(value);

    try {
      await AsyncStorage.setItem("notes", jsonValue);
      Alert.alert("Note App", "Your Notes have been updated", [
        {
          text: "Ok",

          style: "cancel",
        },
      ]);
    } catch (error) {
      console.error("Error saving array of objects:", error);
    }
  };

  // FUNCTION TO UPDATE NOTE
  const updateNote = () => {
    // Make sure the text is not empty before updating
    if (noteState.text.trim().length > 0) {
      // Find the index of the note in the array using its id
      const noteIndex = allNotes.findIndex((n) => n.id === id);
      if (noteIndex !== -1) {
        // Update the note in the array
        const updatedNotes = [...allNotes];
        updatedNotes[noteIndex] = noteState;
        allNotesF(updatedNotes);

        // Save updated notes to AsyncStorage
        SaveToAsyncStorage(updatedNotes);

        // Go back to the previous screen
        navigation.goBack();
      }
    } else {
      ToastAndroid.showWithGravity(
        "Note can't be empty.",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
    }
  };

  // FUNCTION TO SHARE NOTE

  const onShare = async () => {
    try {
      const result = await Share.share(
        {
          title: noteState?.title,
          message: `${noteState?.title}: ${noteState?.text}`,
        },
        { dialogTitle: noteState?.title }
      );
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  // FUCTION TO MAKE NOTE EDITABLE

  const handleMakeNoteEditable = () => {
    setEditNote(!editNote);
    {
      editNote
        ? ToastAndroid.showWithGravity(
            "You can only view this Note.",
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
          )
        : ToastAndroid.showWithGravity(
            "You can now edit this Note.",
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
          );
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 p-4 relative"
      style={{ backgroundColor: bgColor }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="my-1 flex-row justify-between items-center">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="bg-[#0000001c] rounded-full p-3"
          >
            <Ionicons name="chevron-back-outline" size={24} color="black" />
          </TouchableOpacity>
          {note ? (
            <TouchableOpacity
              onPress={handleMakeNoteEditable}
              className="bg-[#0000001c] rounded-full p-3"
            >
              {editNote ? (
                <Entypo name="eye" size={24} color="black" />
              ) : (
                <AntDesign name="edit" size={24} color="black" />
              )}
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() =>
                noteStateF({ ...noteState, favorite: !noteState.favorite })
              }
              className="bg-[#0000001c] rounded-full p-3"
            >
              {noteState.favorite ? (
                <FontAwesome name="star" size={24} color="black" />
              ) : (
                <Feather name="star" size={24} color="black" />
              )}
            </TouchableOpacity>
          )}
        </View>
        <View className="flex-1 my-4 leading-10">
          <View>
            <TextInput
              className="text-5xl font-semibold leading-[55px] text-black  mb-3"
              multiline
              editable={editNote}
              cursorColor={"black"}
              placeholder="Enter your Title here"
              value={noteState?.title}
              onChangeText={(e) => noteStateF({ ...noteState, title: e })}
            />
          </View>
          <View className="border-y-[1px] border-[#b3b2b2] flex-row justify-between items-center ">
            <View>
              <SelectDropdown
                data={allCategory.map((category) => {
                  if (category.name !== "Add Category") {
                    return category.name;
                  }
                })}
                defaultValue={noteState.category}
                disabled={!editNote && true}
                defaultButtonText="Choose Category"
                renderDropdownIcon={() => (
                  <View>
                    <Ionicons name="chevron-down" size={16} color="black" />
                  </View>
                )}
                buttonStyle={{
                  backgroundColor: bgColor,
                  width: 120,
                  height: 40,
                }}
                buttonTextStyle={{ fontSize: 14, color: "#00000096" }}
                onSelect={(selectedItem, index) => {
                  noteStateF({ ...noteState, category: selectedItem });
                }}
              />
            </View>
            <View>
              <Text className="text-[#636262] font-medium leading-5 text-sm">
                {note && note?.date}
              </Text>
            </View>
          </View>

          <View className="flex-1 my-4 leading-10">
            <TextInput
              className=" text-black  my-3 leading-6 text-[16px]"
              multiline
              editable={editNote}
              cursorColor={"black"}
              value={noteState?.text}
              placeholder="Enter your notes here..."
              onChangeText={(e) => noteStateF({ ...noteState, text: e })}
            />
          </View>
        </View>
      </ScrollView>

      {note ? (
        <View className="bg-[#00000048] p-2 flex-row justify-around  my-4 absolute bottom-1 self-center w-full rounded-lg">
          <TouchableOpacity
            onPress={() => deleteConfimation(id)}
            style={{ backgroundColor: bgColor }}
            className="items-center rounded-full p-1 "
          >
            <MaterialIcons name="delete" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onShare}
            style={{ backgroundColor: bgColor }}
            className="items-center rounded-full p-1 "
          >
            <Entypo name="share" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              noteStateF({ ...noteState, favorite: !noteState.favorite });

              {
                noteState.favorite
                  ? ToastAndroid.showWithGravity(
                      "Note Unsaved to Favourites.",
                      ToastAndroid.SHORT,
                      ToastAndroid.CENTER
                    )
                  : ToastAndroid.showWithGravity(
                      "Note Saved to Favourites.",
                      ToastAndroid.SHORT,
                      ToastAndroid.CENTER
                    );
              }
            }}
            style={{ backgroundColor: bgColor }}
            className="items-center rounded-full p-1 "
          >
            {noteState.favorite ? (
              <FontAwesome name="star" size={24} color="black" />
            ) : (
              <Feather name="star" size={24} color="black" />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => updateNote()}
            style={{ backgroundColor: "black" }}
            className="items-center rounded-full p-1 "
          >
            <Entypo name="check" size={24} color="white" />
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          onPress={() => handleSubmit()}
          className="bg-black absolute bottom-7 right-7 rounded-full p-3"
        >
          <Entypo name="check" size={24} color="white" />
        </TouchableOpacity>
      )}
    </KeyboardAvoidingView>
  );
};

export default Notes;
