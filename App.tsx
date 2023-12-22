import { StatusBar } from "expo-status-bar";
import React from "react";
import { View } from "react-native";
import Game from "./screens/Game";
import styles from "./constants/styles";

const App: React.FC = () => {
  console.log("App rendered!");

  return (
    <View style={styles.appContainer}>
      <Game />
      <StatusBar style="auto" />
    </View>
  );
};

export default App;
