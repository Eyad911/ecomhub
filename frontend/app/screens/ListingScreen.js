import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View, ScrollView } from "react-native";

import ActivityIndicator from "../components/ActivityIndicator";
import AppButton from "../components/AppButton";
import Card from "../components/Card";
import product from "../api/product";
import Screen from "../components/Screen";
import AppText from "../components/AppText";
import colors from "../config/colors";
import routes from "../navigation/routes";
import useApi from "../hooks/useApi";
import cartApi from "../api/cart";
import Ionicons from "react-native-vector-icons/Ionicons";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { showMessage } from "react-native-flash-message";

function ListingScreen({ navigation }) {
  const [data, setData] = useState("");
  const [phones, setCPhones] = useState(false);
  const [headphones, setHeadphones] = useState(false);
  const [mic, setMic] = useState(false);
  const [laptop, setLaptop] = useState(false);
  const [pinter, setPinter] = useState(false);
  const [accessories, setAccessories] = useState(false);

  const {
    data: listings,
    error,
    loading,
    request: loadProducts,
    requestPhones: getPhones,
    requestHead: getHead,
    requestMic: getMic,
    requestLaptop: getLaptop,
    requestPinter: getPrinter,
    requestAccessories: getAcc,
  } = useApi(product.getProduct);

  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {
    loadProducts();
  }, []);
  const phone = async () => {
    if (!phones) getPhones();
    else loadProducts();
    setCPhones(!phones);
    setHeadphones(false);
    setMic(false);
    setLaptop(false);
    setPinter(false);
    setAccessories(false);
  };
  const head = async () => {
    if (!headphones) getHead();
    else loadProducts();
    setHeadphones(!headphones);
    setCPhones(false);
    setMic(false);
    setLaptop(false);
    setPinter(false);
    setAccessories(false);
  };

  const microphone = async () => {
    if (!mic) getMic();
    else loadProducts();
    setMic(!mic);
    setCPhones(false);
    setHeadphones(false);
    setLaptop(false);
    setPinter(false);
    setAccessories(false);
  };

  const Laptop = async () => {
    if (!laptop) getLaptop();
    else loadProducts();
    setLaptop(!laptop);
    setMic(false);
    setCPhones(false);
    setHeadphones(false);
    setPinter(false);
    setAccessories(false);
  };

  const Pinter = async () => {
    if (!pinter) getPrinter();
    else loadProducts();
    setPinter(!pinter);
    setLaptop(false);
    setMic(false);
    setCPhones(false);
    setHeadphones(false);
    setAccessories(false);
  };

  const Access = async () => {
    if (!accessories) getAcc();
    else loadProducts();
    setAccessories(!accessories);
    setPinter(false);
    setLaptop(false);
    setMic(false);
    setCPhones(false);
    setHeadphones(false);
  };

  const addOne = () => {
    loadProducts();
    setPinter(false);
    setLaptop(false);
    setMic(false);
    setCPhones(false);
    setHeadphones(false);
    setAccessories(false);
  };
  const [cart, setCart] = useState();
  const [addcart, setAddcart] = useState();

  const openCart = async (product_id, cartdetails) => {
    console.log("====================================");
    console.log(cart);
    console.log("====================================");
    let quantity = 1;
    if (cart == null) {
      const result = await cartApi.cart();
      setAddcart(result.data);
      const add = await cartApi.cartItem(result.data.id, {
        product_id,
        quantity,
      });
      setCart(add.data);
    } else {
      const add = await cartApi.cartItem(addcart.id, { product_id, quantity });
      setCart(add.data);
    }
    showMessage({
      message: "success",
      description: "Add to cart",
      type: "success",
      animationDuration: 10,
    });
  };

  return (
    <>
      <ActivityIndicator visible={loading} />
      <Screen style={styles.screen}>
        <View style={styles.topscreen}>
          <Ionicons name={"search"} style={styles.topicon} />
          <Ionicons
            name={"cart-outline"}
            style={styles.topicon}
            onPress={() => navigation.navigate("Cart", addcart)}
          />
        </View>
        <View style={styles.scrollView}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={true}>
            {!phones ? (
              <Ionicons
                name={"phone-portrait-outline"}
                style={styles.scroll}
                onPress={() => phone()}
              />
            ) : (
              <Ionicons
                name={"phone-portrait-outline"}
                style={styles.notChosen}
                onPress={() => phone()}
              />
            )}
            {!headphones ? (
              <Ionicons
                name={"headset-outline"}
                style={styles.scroll}
                onPress={() => head()}
              />
            ) : (
              <Ionicons
                name={"headset-outline"}
                style={styles.notChosen}
                onPress={() => head()}
              />
            )}
            {!mic ? (
              <Ionicons
                name={"mic"}
                style={styles.scroll}
                onPress={() => microphone()}
              />
            ) : (
              <Ionicons
                name={"mic"}
                style={styles.notChosen}
                onPress={() => microphone()}
              />
            )}
            {!laptop ? (
              <Ionicons
                name={"laptop-outline"}
                style={styles.scroll}
                onPress={() => Laptop()}
              />
            ) : (
              <Ionicons
                name={"laptop-outline"}
                style={styles.notChosen}
                onPress={() => Laptop()}
              />
            )}
            {!pinter ? (
              <Ionicons
                name={"print-outline"}
                style={styles.scroll}
                onPress={() => Pinter()}
              />
            ) : (
              <Ionicons
                name={"print-outline"}
                style={styles.notChosen}
                onPress={() => Pinter()}
              />
            )}
            {!accessories ? (
              <MaterialIcons
                name={"devices-other"}
                style={styles.scroll}
                onPress={() => Access()}
              />
            ) : (
              <MaterialIcons
                name={"devices-other"}
                style={styles.notChosen}
                onPress={() => Access()}
              />
            )}
          </ScrollView>
        </View>
        {error && (
          <>
            <AppText> could't retrive the Products. </AppText>
            <AppButton title="Retry" onPress={loadProducts} />
          </>
        )}

        <FlatList
          data={listings}
          // keyExtractor={(listing) => listing.id.toString()}
          keyExtractor={(listing, index) => index.toString()}
          renderItem={({ item }) => (
            <>
              <Card
                title={item.title}
                subTitle={"$" + item.unit_price}
                image={item.pic}
                icon={item.icon}
                onPress={() =>
                  navigation.navigate(routes.LISTING_DETAILS, item)
                }
              />
              <View style={styles.cart}>
                <Ionicons
                  name={"cart-outline"}
                  style={styles.icon_cart}
                  onPress={() => openCart(item.id)}
                />
              </View>
            </>
          )}
          refreshing={refreshing}
          onRefresh={addOne}
        />
      </Screen>
    </>
  );
}
const styles = StyleSheet.create({
  screen: {
    padding: 20,
    backgroundColor: colors.light,
  },
  scrollView: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  nav: {
    fontSize: 30,
    backgroundColor: colors.white,
    color: colors.black,
  },
  scroll: {
    padding: 18,
    fontSize: 35,
    color: colors.primary,
  },
  notChosen: {
    color: colors.secondary,
    padding: 18,
    fontSize: 35,
  },

  topscreen: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  topicon: {
    fontSize: 30,
    color: colors.primary,
  },
  cart: {
    width: "90%",
    position: "absolute",
    display: "flex",
    alignItems: "flex-end",
    marginTop: 235,
  },
  icon_cart: {
    fontSize: 35,
    color: colors.primary,
  },
});
export default ListingScreen;
