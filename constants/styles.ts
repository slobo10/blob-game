import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  gameSvg: {
    backgroundColor: "#008000",
    borderStyle: "solid",
    borderColor: "black",
    borderWidth: 5,
  },
  buttonText: {
    fontSize: 50,
  },
  buttonContainerBase: {
    borderColor: "black",
    borderStyle: "solid",
    borderWidth: 2,
  },
  buttonContainerClicked: {
    backgroundColor: "#4b4b4b",
  },
  buttonContainerHovered: {
    backgroundColor: "#8b8b8b",
  },
  buttonContainer: {
    backgroundColor: "#aaaaaa",
  },
});

export default styles;
