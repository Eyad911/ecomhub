import React from "react";
import { View, StyleSheet, Image, TouchableHighlight } from "react-native";

import Swipeable from "react-native-gesture-handler/Swipeable";

import AppText from "./AppText";
import colors from "../config/colors";

function ReviewList({
  title,
  subTitle,
  image,
  IconComponent,
  onpress,
  renderRightActions,
}) {
  return (
    <Swipeable renderRightActions={renderRightActions}>
      <TouchableHighlight underlayColor={colors.light} onPress={onpress}>
        <View style={styles.container}>
          {IconComponent}
          {image && <Image style={styles.image} source={image} />}
          <View style={styles.detilsContainer}>
            <AppText style={styles.title} numberOfLines={1}>
              {title}
            </AppText>
            {subTitle && (
              <AppText style={styles.subtitle} numberOfLines={2}>
                {subTitle}
              </AppText>
            )}
          </View>
        </View>
      </TouchableHighlight>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    padding: 15,
    backgroundColor: colors.white,
    borderColor: colors.primary,
    borderBottomWidth: 1,
  },
  detilsContainer: {
    flex: 1,
    marginLeft: 10,
    justifyContent: "center",
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  title: {
    fontWeight: "500",
  },
  subtitle: {
    color: colors.medium,
  },
});
export default ReviewList;
