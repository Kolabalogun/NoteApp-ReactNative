import Welcome from "../Screens/Welcome";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigation from "./TabNavigations";
import Notes from "../Screens/Notes";

const Stack = createNativeStackNavigator();

const Navigations = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={"TabNavigation"}
    >
      <Stack.Screen name="Welcome" component={Welcome} />

      <Stack.Screen name="TabNavigations" component={TabNavigation} />
      <Stack.Screen name="Notes" component={Notes} />
    </Stack.Navigator>
  );
};

export default Navigations;
