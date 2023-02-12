import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import CartScreen from "../screens/CartScreen";
import ListingScreen from "../screens/ListingScreen";
import ListingDetailsSecreen from "../screens/ListingDetailsSecreen";

const Stack = createStackNavigator();

const FeedNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Listing" component={ListingScreen} />
    <Stack.Screen name="listingsDetails" component={ListingDetailsSecreen} />
    <Stack.Screen
      name="Cart"
      component={CartScreen}
      options={{ headerShown: true }}
    />
  </Stack.Navigator>
);

export default FeedNavigator;
