import React, { useState } from "react";
import { View, StyleSheet, Image, Text } from "react-native";

import colors from "../config/colors";
import cartApi from "../api/cart";

function Cart({ title, subTitle, image, icon, quality, route, total_price }) {
  const [qty, setQty] = useState(1);

  const quantity = async () => {
    const result = await cartApi.quantity();

    setQty(result.data);
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.detailsContiner}>
            <Image style={styles.image} source={{ uri: image }} />
          </View>

          <View style={styles.text}>
            <Text style={styles.title}>{title}</Text>
            <Text>{subTitle}</Text>
            <Text>qty: {quality}</Text>
          </View>
          <Text>{total_price}</Text>
        </View>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
  card: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    borderRadius: 15,
    backgroundColor: colors.white,
    marginBottom: 20,
    height: 150,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 150,
    resizeMode: "contain",
  },

  detailsContiner: {
    width: "35%",
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
  },
  text: {
    marginTop: 6,
    marginLeft: 3,
    width: "40%",
  },
  title: {
    fontSize: 15,
    color: colors.primary,
    marginBottom: 7,
    padding: 3,
  },
  price: {
    display: "flex",
    width: "25%",
    marginTop: 90,
  },
  count: {
    width: "90%",
    borderRadius: 2,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#A9A9AA",
    borderRadius: 10,
  },
  count_text: {
    fontSize: 15,
  },
  count_icon: {
    fontSize: 20,
    color: colors.secondary,
  },
  payment_text: {
    backgroundColor: "red",
    fontSize: 20,
  },
});

export default Cart;
