import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { View } from "react-native";
import Game from "./screens/Game";
import styles from "./constants/styles";
import MainMenu from "./screens/MainMenu";

const App: React.FC = () => {
  let [screenState, setScreenState]: [number, Function] = useState(0);

  let output: React.JSX.Element = <></>;

  switch (screenState) {
    case 0: {
      output = <MainMenu setScreen={setScreenState} />;
      break;
    }
    case 1: {
      output = <Game />;
    }
  }

  return (
    <View style={styles.appContainer}>
      {output}
      <StatusBar style="auto" />
    </View>
  );
};

export default App;
