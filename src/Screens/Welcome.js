import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";

const Welcome = ({ navigation }) => {
  return (
    <SafeAreaView className="p-4 bg-[#f0f2fa] flex-1">
      <View className=" flex-1 items-center justify-center">
        <Image
          className="h-72 w-72"
          source={require("../../assets/note.png")}
        />
      </View>

      <View className="mb-10 ">
        <Text className="font-bold text-[42px] text-center " numberOfLines={2}>
          Write Everything Avoid Oversharing
        </Text>

        <Text className=" text-center text-[#777676] my-3 leading-6 text-[15px]">
          Writing is the compass that allows us to navigate the vast ocean of
          history, capturing the essence of the past and guiding us towards a
          better future.
        </Text>
      </View>

      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate("TabNavigations")}
          className="bg-[#2d2d2d] p-4 items-center rounded-md mb-3"
        >
          <Text className="text-white font-medium text-base">Get Started</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Welcome;

const styles = StyleSheet.create({});
