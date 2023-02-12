import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AccountScreen from "../screens/AccountScreen";
import MessageSecreen from "../screens/MessageSecreen";
import ProfileScreen from "../screens/ProfileScreen";
import CommentScreen from "../screens/CommentScreen";

const Stack = createStackNavigator();

const AccountNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Account" component={AccountScreen} />
    <Stack.Screen name="Messages" component={MessageSecreen} />
    <Stack.Screen name="Profile" component={ProfileScreen} />
    <Stack.Screen name="comments" component={CommentScreen} />
  </Stack.Navigator>
);

export default AccountNavigator;
