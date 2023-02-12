import React, { useState, useEffect } from "react";
import {
  FlatList,
  StyleSheet,
  View,
  Text,
  Pressable,
  Image,
} from "react-native";
import Cart from "../components/Cart";
import Screen from "../components/Screen";
import colors from "../config/colors";

import cartApi from "../api/cart";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { MaterialIcons } from '@expo/vector-icons'; 
function CartScreen({ route }) {
  const carts = route.params;

  const [cartItem, setCartItem] = useState([]);

  const getCart = async () => {
    const cartinfo = await cartApi.getCart(carts.id);
    console.log(cartinfo.data, "This is the data in cart");
    setCartItem(cartinfo.data);
  };
  const plusone = async (id, quantity) => {
    const addone = await cartApi.quantityUpdate(carts.id, id, { quantity });

    setCartItem(addone.data);
    getCart();
  };
  const minusone = async (id, quantity) => {
    if (quantity >= 1) {
      const addone = await cartApi.quantityUpdate(carts.id, id, { quantity });

      setCartItem(addone.data);
      getCart();
    }
  };

  const deleteProduct = async (id) => {
    const del = await cartApi.deleteProduct(carts.id, id);

    setCartItem(cartItem);
    getCart();
  };
  useEffect(() => {
    getCart();
  }, []);
  return (
    <>
      <Screen style={styles.screen}>
        {cartItem.length === 0  ? (
          <View style={styles.cart}>
            <Image source={require("../assets/cart.png")} />
            <Text style={styles.textcart}> Your Cart is empty</Text>
            <Text style={styles.textdescecart}>
              {" "}
              Add something to make me happy :){" "}
            </Text>
          </View>
        ) : (
          <FlatList
            data={cartItem.items}
            renderItem={({ item }) => (
              <>
                <View style={styles.container}>
                  <MaterialIcons
                    style={styles.close_icon}
                    name={"delete-forever"}
                    onPress={() => deleteProduct(item.id)}
                  />
                </View>
                <Cart
                  image={item.product.pic}
                  title={item.product.title}
                  subTitle={item.product.unit_price}
                  quality={item.quantity}
                />
                <View style={styles.main}>
                  <Text style={styles.totalprice}>
                    {" "}
                    sub_total :{item.total_price}{" "}
                  </Text>
                  <View style={styles.count}>
                    <MaterialCommunityIcons
                      style={styles.count_icon}
                      name={"window-minimize"}
                      onPress={() => minusone(item.id, item.quantity - 1)}
                    />
                    <Text style={styles.count_text}>{item.quantity}</Text>
                    <MaterialCommunityIcons
                      style={styles.count_icon}
                      name={"plus"}
                      onPress={() => plusone(item.id, item.quantity + 1)}
                    />
                  </View>
                </View>
              </>
            )}
          />
        )}
      </Screen>
      <View style={styles.checkout}>
        <View style={styles.amount}>
          <Text style={styles.textcheckout}>
            Total :{cartItem.total_price}{" "}
          </Text>
        </View>
        <Pressable
          style={styles.button}
          onPress={() => alert("To Order you must pay 10000000$ ")}
        >
          <Text style={styles.text}>Checkout</Text>
        </Pressable>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  screen: {
    padding: 20,
    backgroundColor: colors.light,
  },

  cart: {
    width: "100%",
    height: 400,
    marginTop: 100,
    alignItems: "center",
  },
  textcart: {
    marginTop: 20,

    alignItems: "center",
    fontSize: 30,
    color: colors.secondary,
  },
  textdescecart: {
    marginTop: 20,
    alignItems: "center",
    fontSize: 20,
    color: colors.secondary,
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

  count: {
    width: "25%",
    padding: 5,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#A9A9AA",
    borderRadius: 10,
  },
  main: {
    marginTop: 80,
    position: "absolute",
    width: "97%",
    alignItems: "flex-end",
  },
  count_text: {
    fontSize: 15,
  },
  count_icon: {
    fontSize: 20,
    color: colors.secondary,
  },
  container:{
    display: "flex",
    position: "absolute",
    zIndex:1,
    alignItems: "flex-end",
    width:"100%"
  },
  close_icon:{
    fontSize: 30,
    color: colors.primary,    
  },
  totalprice: {
    height: "40%",
  },
  checkout: {
    width: "100%",
    height: 50,
    backgroundColor: colors.white,
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  textcheckout: {
    color: "#202022",
    fontSize: 18,

    marginTop: 15,
    marginLeft: 5,
  },
  button: {
    backgroundColor: colors.primary,
    justifyContent: "center",
    width: 130,
  },
  text: {
    color: colors.white,
    textAlign: "center",
    fontSize: 20,
  },
});
export default CartScreen;
