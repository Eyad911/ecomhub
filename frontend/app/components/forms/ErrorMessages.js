import React from "react";
import { StyleSheet } from "react-native";

import AppText from "../AppText";

function ErrorMessages({ error, visible }) {
  if (!visible || !error) return null;

  return <AppText style={styles.error}>{error}</AppText>;
  props;
}
const styles = StyleSheet.create({
  error: {
    color: "red",
  },
});
export default ErrorMessages;
