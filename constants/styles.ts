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
  menuContainer: {
    justifyContent: "center",
    backgroundColor: "lightgrey",
    flex: 0.8,
    alignItems: "center",
    borderWidth: 5,
    borderColor: "black",
    borderStyle: "solid",
  },
  mainText: {
    fontSize: 100,
    fontWeight: "bold",
    backgroundColor: "grey",
    margin: 50,
  },
  buttonText: {
    fontSize: 50,
  },
  buttonContainerBase: {
    borderColor: "black",
    borderStyle: "solid",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    margin: 12,
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
