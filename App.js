import { StyleSheet, Text, View, StatusBar } from "react-native";
// import Home from "./NoteApp/Home";
import { NavigationContainer } from "@react-navigation/native";
import Navigations from "./src/Function/Navigations";
import { AppProvider } from "./src/Function/Context";
import { ModalPortal } from "react-native-modals";

export default function App() {
  return (
    <AppProvider>
      <NavigationContainer style={styles.container}>
        <Navigations />
        <ModalPortal />
        <StatusBar backgroundColor="#000000" barStyle="light-content" />
      </NavigationContainer>
    </AppProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
