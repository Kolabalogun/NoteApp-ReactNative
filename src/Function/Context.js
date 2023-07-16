import { StyleSheet, Text, LogBox, Alert } from "react-native";
import React, { useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AppContext = React.createContext();

LogBox.ignoreLogs([
  "Setting a timer",
  "AsyncStorage has been extracted from react-native core and will be removed in a future release.",
]);

const AppProvider = ({ children }) => {
  const [allNotes, allNotesF] = useState([]);

  // FUCNTION TO GET SAVED NoTES TO REACT ASYNC STORAGE

  const getDataFromAsyncStorage = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("notes");

      const parsedData = jsonValue ? JSON.parse(jsonValue) : [];
      allNotesF(parsedData);
    } catch (error) {
      console.error("Error retrieving array of objects:", error);
    }
  };

  useEffect(() => {
    getDataFromAsyncStorage();
  }, []);

  //  STATE FOR ALL CATEGORIES

  const [allCategory, allCategoryF] = useState([]);

  // INITIAL DATA FOR CATEGORIWS
  const data = [
    {
      id: 1,
      name: "Add Category",
    },
    { id: 2, name: "Personal" },
    { id: 3, name: "Lifestyle" },
    { id: 4, name: "Pending" },
    { id: 5, name: "Budget" },
    { id: 6, name: "Completed" },
  ];

  // FUCNTION TO GET SAVED CATEGORIES TO REACT ASYNC STORAGE

  const getCategoryFromAsyncStorage = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("category");

      if (jsonValue) {
        // Data exists in AsyncStorage, parse and set it to the state
        const parsedData = JSON.parse(jsonValue);
        allCategoryF(parsedData);
      } else {
        // Data does not exist in AsyncStorage, save the initial data and show an alert
        await saveCategoryToAsyncStorage(data);
      }

      console.log("Array of objects retrieved:", allCategory);
    } catch (error) {
      console.error("Error retrieving array of objects:", error);
    }
  };

  const saveCategoryToAsyncStorage = async (data) => {
    const jsonValue = JSON.stringify(data);

    try {
      await AsyncStorage.setItem("category", jsonValue);
      allCategoryF(data);
      console.log("Category data saved to AsyncStorage.");
    } catch (error) {
      console.error("Error saving category data:", error);
    }
  };

  useEffect(() => {
    getCategoryFromAsyncStorage();
  }, []);

  return (
    <AppContext.Provider
      value={{ allNotes, allNotesF, allCategory, allCategoryF }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
