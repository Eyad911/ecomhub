import React, { useEffect, useState, useRef } from "react";
import { View, Image, Text, StyleSheet, ScrollView } from "react-native";
import * as Yup from "yup";

import {
  AppForm,
  AppFormField,
  SubmitButton,
  ErrorMessages,
} from "../components/forms";

import Screen from "../components/Screen";
import ListItem from "../components/ListItem";
import ListItemDeleteAction from "../components/ListItemDeleteAction";
import colors from "../config/colors";
import product from "../api/product";
import userApi from "../api/user";
import AppText from "../components/AppText";
import ReviewList from "../components/Reviewlist";

const validationSchema = Yup.object().shape({
  description: Yup.string().required().label("description"),
});

function ListingDetailsSecreen({ route }) {
  const scrollView = useRef();
  const listing = route.params;

  const [review, setReview] = useState();
  const [user, setUser] = useState();
  const [error, setError] = useState();

  const getReviews = async () => {
    const result = await product.getReviews(listing.id);
    setReview(result.data);
  };

  const getUser = async () => {
    const result = await userApi.profile();
    setUser(result.data);
  };

  const handleSubmit = async (commentInfo) => {
    const description = commentInfo.description;
    const name = user.username;
    const result = await product.postReviews(listing.id, { name, description });
    console.log(result, "+++++++ add +++++++");
    getReviews();
  };

  useEffect(() => {
    getReviews();
    getUser();
  }, []);

  const handleDelete = async (rev) => {
    // Delete the Review
    console.log(rev);
    if (user.username !== rev.name) {
      alert("You can not delete this review.");
    } else {
      const result = await product.deleteReviews(listing.id, rev.id);
      console.log(result, "+++++++ delete +++++++");
      getReviews();
    }
  };

  return (
    <Screen>
      <ScrollView>
        <View>
          <Image style={styles.image} source={{ uri: listing.pic }} />
          {/* {console.log(listing)} */}
          <View style={styles.detailsContainer}>
            <Text style={styles.title}>{listing.title}</Text>
            <Text style={styles.price}>${listing.unit_price}</Text>

            <View style={styles.userContainer}>
              <ListItem
                image={require("../assets/profile.png")}
                title="Eyad H"
                subTitle="5 Listing"
              />
            </View>
          </View>
          <View>
            <View style={styles.commentView}>
              <AppText style={styles.comment}>Comments</AppText>
            </View>
            {review &&
              review.map((item) => (
                <View key={item.id}>
                  <ReviewList
                    image={require("../assets/profile.png")}
                    title={item.name}
                    subTitle={item.description}
                    renderRightActions={() => (
                      <ListItemDeleteAction
                        onpress={() => handleDelete(item)}
                      />
                    )}
                  />
                </View>
              ))}
            <View style={styles.addComment}>
              <AppForm
                initialValues={{ description: "" }}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
              >
                <ErrorMessages error={error} visible={error} />

                <AppFormField
                  autoCorrect={false}
                  icon="comment-processing-outline"
                  name="description"
                  placeholder="Comment..."
                />

                <SubmitButton title="Add Comment" />
              </AppForm>
            </View>
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 300,
    resizeMode: "contain",
  },
  detailsContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "500",
  },
  price: {
    color: colors.secondary,
    fontWeight: "bold",
    fontSize: 20,
    marginVertical: 10,
  },
  userContainer: {
    marginVertical: 40,
  },
  commentView: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.light,
  },
  comment: {
    fontSize: 30,
    fontFamily: "Avenir",
    fontStyle: "italic",
  },
  addComment: {
    padding: 10,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ListingDetailsSecreen;
