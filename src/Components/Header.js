import { View, Text } from "react-native";
import React from "react";

const Header = ({ txt }) => {
  return (
    <View className="">
      <Text className="font-semibold text-3xl">{txt}</Text>
    </View>
  );
};

export default Header;
