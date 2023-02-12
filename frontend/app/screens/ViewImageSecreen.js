import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function ViewImageSecreen(props) {
  return (
    <View style={styles.continer}>
      <View style={styles.closeicon}>
        <MaterialCommunityIcons name="close" color="#fff" size={35} />
      </View>
      <View style={styles.deleteicon}>
        <MaterialCommunityIcons
          name="trash-can-outline"
          color="#fff"
          size={35}
        />
      </View>

      <Image
        resizeMode="contain"
        style={styles.image}
        source={require("../assets/iphone-13.png")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  continer: {
    backgroundColor: "#000",
    flex: 1,
  },
  closeicon: {
    position: "absolute",
    top: 40,
    left: 30,
  },
  deleteicon: {
    position: "absolute",
    top: 40,
    right: 30,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

export default ViewImageSecreen;
