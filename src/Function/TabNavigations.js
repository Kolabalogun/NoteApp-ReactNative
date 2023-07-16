import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

import React from "react";

import {
  AntDesign,
  Entypo,
  Feather,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";

import Favorite from "../Screens/Favorite";
import Category from "../Screens/Category";
import Home from "../Screens/Home";

const TabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "black",
          height: 70,
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
        },
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Entypo name="home" size={28} color="#fff" />
            ) : (
              <AntDesign name="home" size={24} color="#767676" />
            ),
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={Favorite}
        options={{
          tabBarLabel: "Favorites",

          tabBarIcon: ({ focused }) =>
            focused ? (
              <FontAwesome name="star" size={28} color="#fff" />
            ) : (
              <Feather name="star" size={26} color="#767676" />
            ),
        }}
      />

      <Tab.Screen
        name="Category"
        component={Category}
        options={{
          tabBarLabel: "Category",
          tabBarIcon: ({ focused }) =>
            focused ? (
              <MaterialIcons name="category" size={28} color="white" />
            ) : (
              <MaterialIcons name="category" size={26} color="#767676" />
            ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
