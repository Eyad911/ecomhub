import React, { useEffect, useContext, useState } from "react";
import { View, StyleSheet, Image } from "react-native";
import * as Yup from "yup";

import userApi from "../api/user";
import AuthContext from "../auth/context";

import AppButton from "../components/AppButton";
import { AppForm, AppFormField, SubmitButton } from "../components/forms";
import Screen from "../components/Screen";
import AppText from "../components/AppText";
import colors from "../config/colors";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
});

function ProfileScreen(props) {
  const { user, setUser } = useContext(AuthContext);
  const [profile, setProfile] = useState();
  const [editProfile, setEditProfile] = useState(false);

  const handelSubmit = async ({ email, first_name, last_name }) => {
    const result = await userApi.editProfile({ email, first_name, last_name });

    setProfile(result.data);
    setEditProfile(false);
  };

  const getProfile = async () => {
    const result = await userApi.profile();
    console.log(result.data);
    setProfile(result.data);
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <Screen>
      <View style={styles.main}>
        <View style={styles.containerImage}>
          <Image
            style={styles.image}
            source={require("../assets/profile.png")}
          />
          <View style={styles.containerText}>
            <AppText style={styles.text1}>9</AppText>
            <AppText style={styles.text2}>Post</AppText>
          </View>
        </View>

        {profile && (
          <View style={styles.containerInfo}>
            <AppText style={styles.username}> {profile.username}</AppText>
            <AppText style={styles.email}> {profile.email}</AppText>
            <AppText style={styles.email}>
              {" "}
              <AppText style={styles.title}>First Name:</AppText>{" "}
              {profile.first_name}
            </AppText>
            <AppText style={styles.email}>
              {" "}
              <AppText style={styles.title}>Last Name:</AppText>
              {profile.last_name}
            </AppText>
          </View>
        )}
        <View style={styles.buttonContainer}>
          <AppButton
            color="secondary"
            title="Edit profile"
            onPress={() => setEditProfile(!editProfile)}
          />
        </View>
        {editProfile && (
          <View style={styles.buttonContainer}>
            <AppForm
              initialValues={{ email: "", first_name: "", last_name: "" }}
              onSubmit={handelSubmit}
              validationSchema={validationSchema}
            >
              <AppFormField
                autoCapitalize="none"
                autoCorrect={false}
                icon="email"
                keyboardType="email-address"
                name="email"
                placeholder="Email"
                textContentType="emailAddress" // هذي تكمل الايميل ب نظام الابل
              />

              <AppFormField
                autoCapitalize="none"
                autoCorrect={false}
                icon="account"
                keyboardType="email-address"
                name="first_name"
                placeholder="First Name"
              />

              <AppFormField
                autoCapitalize="none"
                autoCorrect={false}
                icon="account"
                name="last_name"
                placeholder="Last Name"
              />

              <SubmitButton title="edit" />
            </AppForm>
          </View>
        )}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: colors.white,
    height: "100%",
  },
  image: {
    height: 80,
    width: 80,
  },
  containerImage: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginLeft: 10,
  },
  containerText: {
    //   flexDirection: "row",
    alignItems: "center",
    //   marginTop: 20,
    marginLeft: 10,
  },
  text1: {
    fontWeight: "400",
    fontSize: 20,
    color: colors.secondary,
    paddingHorizontal: 10,
    marginLeft: 10,
  },
  text2: {
    fontSize: 20,
    color: "gray",
    paddingHorizontal: 10,
  },
  username: {
    fontSize: 20,
    paddingHorizontal: 10,
    margin: 10,
    fontWeight: "bold",
  },
  email: {
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 13,
    paddingHorizontal: 10,
    margin: 10,
    fontWeight: "bold",
  },
  containerInfo: {
    //   marginTop:5,
    margin: 5,
    borderColor: colors.light,
    borderRadius: 20,
    borderWidth: 1.5,
    borderStyle: "solid",
    //   width:'80%',
  },
  buttonContainer: {
    padding: 10,
    width: "100%",
  },
});
export default ProfileScreen;
