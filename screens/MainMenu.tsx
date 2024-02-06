import React from "react";
import { Text, View } from "react-native";
import Button from "../components/Button";
import styles from "../constants/styles";

const MainMenu: React.FC<{ setScreen: Function }> = ({ setScreen }) => {
  return (
    <>
      <View style={styles.menuContainer}>
        <Text style={styles.mainText}>Blob Game</Text>
        <Button
          onPress={() => {
            setScreen(1);
          }}
        >
          Start
        </Button>
      </View>
    </>
  );
};

export default MainMenu;
