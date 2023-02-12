import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";

import product from "../api/product";
import userApi from "../api/user";
import Screen from "../components/Screen";
import colors from "../config/colors";

function CommentScreen({ renderRightActions }) {
  const [review, setReview] = useState();
  const [user, setUser] = useState();
  const [refreshing, setRefreshing] = useState(false);
  const [count, setCount] = useState(0);

  const getUser = async () => {
    const result = await userApi.profile();
    console.log(result.data, "--------------------");
    setUser(result.data);
  };

  const getReviews = async () => {
    console.log(user, "---user---");

    if (user == undefined) {
      setCount(count + 1);
    } else {
      const result = await product.getAllReviews();
      setReview(result.data.filter((item) => item.name == user.username));
      console.log(result.data, "----Rev---");
    }
  };

  const addOne = () => {
    getReviews();
  };

  useEffect(() => {
    if (user == null) {
      getUser();
    }
    getReviews();
  }, [user]);

  return (
    <Screen>
      {user && (
        <FlatList
          refreshing={refreshing}
          onRefresh={addOne}
          style={styles.root}
          data={review}
          extraData={(listing) => listing.id.toString()}
          ItemSeparatorComponent={() => {
            return <View style={styles.separator} />;
          }}
          keyExtractor={(item) => {
            return item.id;
          }}
          renderItem={(item) => {
            const Notification = item.item;
            return (
              <View style={styles.container}>
                <TouchableOpacity onPress={() => {}}>
                  <Image
                    style={styles.image}
                    source={require("../assets/profile.png")}
                  />
                </TouchableOpacity>
                <View style={styles.content}>
                  <View style={styles.contentHeader}>
                    <Text style={styles.name}>{Notification.name}</Text>
                    <Text style={styles.time}>{Notification.date}</Text>
                  </View>
                  <Text rkType="primary3 mediumLine">
                    {Notification.description}
                  </Text>
                </View>
              </View>
            );
          }}
        />
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: "#ffffff",
    marginTop: 5,
  },
  container: {
    paddingRight: 16,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  content: {
    marginLeft: 14,
    flex: 1,
  },
  contentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  separator: {
    height: 1,
    backgroundColor: colors.primary,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginLeft: 10,
  },
  time: {
    fontSize: 11,
    color: "#808080",
  },
  name: {
    fontSize: 14,
    fontWeight: "bold",
  },
});
export default CommentScreen;
