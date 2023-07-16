import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useGlobalContext } from "../Function/Context";

const Note = ({ id, date, note, navigation, idx }) => {
  // GET ALL NOTES FROM CONTEXT

  const { allNotes } = useGlobalContext();

  // set background color for each notes
  const backgroundColors = ["#fbe8ff", "#cdeff1", "#f8e7b4", "#e4ffe6"];
  const bgColor = backgroundColors[idx % backgroundColors.length];

  // Determine if this note is the latest one
  const isLatestNote = note.id === allNotes[allNotes.length - 1].id;

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("Notes", {
          note,
          bgColor,
          id,
        })
      }
      className={`p-3 mb-5 rounded-2xl relative ${
        isLatestNote && "border-[1px]  border-[#ff8b65]"
      } `}
      style={{ backgroundColor: bgColor }}
    >
      {isLatestNote && (
        <View className="bg-[#ff8b65] absolute right-0 top-0 p-1 rounded-bl-md rounded-tr-xl">
          <Text className="p-0.5 text-xs font-medium text-white ">NEW</Text>
        </View>
      )}
      <View className="mt-1">
        <Text className="text-lg font-medium pr-7 mb-3" numberOfLines={3}>
          {note?.title}
        </Text>
        {isLatestNote && (
          <Text className="text-[#636262]  leading-5 text-[14px]">
            {note?.text.length <= 200
              ? note?.text
              : note?.text.substring(0, 230) + "..."}
          </Text>
        )}
      </View>

      <View className="flex-row justify-between items-center mt-2.5  mb-1">
        <View className="flex-row  items-center">
          <Text className="text-[#636262] mr-1 font-medium leading-5 text-sm">
            {note?.category}
          </Text>
          {note?.favorite && (
            <View className="flex-row items-center">
              <Text className="text-[#636262] mr-1 leading-5 text-sm">|</Text>
              <Text className="text-[#636262] font-medium leading-5 text-sm">
                Favorite
              </Text>
            </View>
          )}
        </View>

        <Text className="text-[#636262] font-medium leading-5 text-sm">
          {date}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default Note;
