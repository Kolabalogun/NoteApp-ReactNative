import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import {
  BottomModal,
  ModalButton,
  ModalContent,
  ModalFooter,
  ModalTitle,
  SlideAnimation,
} from "react-native-modals";
import { useGlobalContext } from "../Function/Context";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Category = () => {
  // GET ALL NOTES FROM CONTEXT

  const { allNotes } = useGlobalContext();

  const backgroundColors = ["#f8e7b4", "#e4ffe6", "#fbe8ff", "#cdeff1"];
  const folderImages = [
    require("../../assets/folder.png"),
    require("../../assets/folder1.png"),
    require("../../assets/folder2.png"),
    require("../../assets/folder3.png"),
  ];

  // FOLDER RENDERED

  const folder = ({ item }) => (
    <TouchableOpacity
      onPress={() => item.name === "Add Category" && setmodalVisible(true)}
      className="flex-1 px-5 py-8 rounded-xl mb-5 items-center justify-center"
      style={{
        backgroundColor: backgroundColors[item.id % backgroundColors.length],
      }}
    >
      <Image
        source={
          item.name === "Add Category"
            ? require("../../assets/folder-plus.png")
            : folderImages[item.id % folderImages.length]
        }
        className="h-16 w-16"
      />
      <Text className="font-medium text-sm">{item.name}</Text>
      {item.name !== "Add Category" && (
        <Text className="font-medium mt-1 text-[#78837a]">
          {allNotes.filter((note) => note.category === item.name).length}{" "}
          Note(s)
        </Text>
      )}
    </TouchableOpacity>
  );

  // STATE FOR MODAL VISIBILITY

  const [modalVisible, setmodalVisible] = useState(false);

  // SAVE CATEGORY TO ASYNC STORAGE

  // get all category form context

  const { allCategory, allCategoryF } = useGlobalContext();

  // state for new category
  const [input, setInput] = useState({ id: allCategory.length + 1, name: "" });

  useEffect(() => {
    setInput({ ...input, id: allCategory.length + 1 });
  }, [allCategory]);

  // FUNCTION HADLING SAVE NEW NOTE

  const handleSubmit = async () => {
    const trimmedName = input.name.trim();
    if (input.name.trim().length > 0) {
      const newCategory = { ...input, name: trimmedName };
      const allNewCategories = [...allCategory, newCategory];

      allCategoryF(allNewCategories);

      // Save note to Async Storage

      SaveToAsyncStorage(allNewCategories);

      // Close modal
      setmodalVisible(false);
    }
  };

  const SaveToAsyncStorage = async (value) => {
    const jsonValue = JSON.stringify(value);

    try {
      await AsyncStorage.setItem("category", jsonValue);
      Alert.alert("Note App", "Your Categories have been updated", [
        {
          text: "Ok",
          style: "cancel",
        },
      ]);
      setInput({
        ...input,
        name: "",
      });
    } catch (error) {
      console.error("Error saving array of objects:", error);
    }
  };

  return (
    <SafeAreaView className="bg-[#fff] flex-1 p-4 relative">
      <Header txt={"Category"} />

      <View className="border-t-[1px] border-[#b3b2b2] flex-row justify-between items-center my-3 "></View>

      <Text className="font-medium">All Categories</Text>

      <View className="flex-1 my-3">
        <FlatList
          data={allCategory}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          renderItem={folder}
          keyExtractor={(item) => item.id}
          columnWrapperStyle={{ justifyContent: "space-between", gap: 15 }}
        />
      </View>
      <BottomModal
        swipeThreshold={200}
        onBackdropPress={() => setmodalVisible(!modalVisible)}
        swipeDirection={["up", "down"]}
        footer={
          <ModalFooter>
            <ModalButton
              text="Save"
              textStyle={{ color: "white", fontSize: 14 }}
              style={{
                marginBottom: 20,
                marginHorizontal: 15,
                backgroundColor: "#000",
                borderRadius: 30,
              }}
              onPress={handleSubmit}
            />
          </ModalFooter>
        }
        modalAnimation={
          new SlideAnimation({
            slideFrom: "bottom",
          })
        }
        onHardwareBackPress={() => setmodalVisible(false)}
        onTouchOutside={() => setmodalVisible(false)}
        visible={modalVisible}
      >
        <ModalContent style={{ height: 150 }}>
          <View className="my-2 gap-1">
            <View style={{ marginTop: 30 }}>
              <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
                Enter New Category
              </Text>

              <View className="flex-row items-center bg-[#eeeefd] rounded-lg my-3  p-2 ">
                <TextInput
                  className="  flex-1 "
                  onChangeText={(e) =>
                    setInput({
                      ...input,
                      name: e,
                    })
                  }
                  value={input.name}
                  cursorColor={"black"}
                  placeholder="Enter new category"
                />
              </View>
            </View>
          </View>
        </ModalContent>
      </BottomModal>
    </SafeAreaView>
  );
};

export default Category;
