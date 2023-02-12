import React, { useEffect, useContext, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

import userApi from "../api/user";
import AuthContext from "../auth/context";
import authStorage from "../auth/storage";
import Icon from "../components/Icon";
import ListItem from "../components/ListItem";
import ListItemSeparator from "../components/ListItemSeparator";
import Screen from "../components/Screen";
import colors from "../config/colors";
import routes from "../navigation/routes";

const menuItem = [
  {
    title: "My Comments",
    icon: {
      name: "format-list-bulleted",
      backgrounColor: colors.primary,
    },
    targetScreen: routes.COMMENTS,
  },
  {
    title: "My Messages",
    icon: {
      name: "email",
      backgrounColor: colors.secondary,
    },
    targetScreen: routes.MESSAGES,
  },
];

function AccountScreen({ navigation }) {
  const { user, setUser } = useContext(AuthContext);
  const [profile, setProfile] = useState();
  const handelLogOut = () => {
    setUser(null);
    authStorage.removeToken();
  };
  const getProfile = async () => {
    const result = await userApi.profile();
    // console.log(result);
    setProfile(result.data);
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <Screen style={styles.screen}>
      <View style={styles.container}>
        {profile && (
          <ListItem
            title={profile.username}
            subTitle={profile.email}
            image={require("../assets/profile.png")}
            onpress={() => navigation.navigate(routes.PROFILE)}
          />
        )}
      </View>
      <View style={styles.container}>
        <FlatList
          data={menuItem}
          keyExtractor={(menuItem) => menuItem.title}
          ItemSeparatorComponent={ListItemSeparator}
          renderItem={({ item }) => (
            <ListItem
              title={item.title}
              IconComponent={
                <Icon
                  name={item.icon.name}
                  backgroundColor={item.icon.backgrounColor}
                />
              }
              onpress={() => navigation.navigate(item.targetScreen)}
            />
          )}
        />
      </View>
      <ListItem
        title="Log Out"
        IconComponent={<Icon name="logout" backgroundColor="#ffe66d" />}
        onpress={handelLogOut}
      />
    </Screen>
  );
}
const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.light,
  },
  container: {
    marginVertical: 20,
  },
});
export default AccountScreen;
