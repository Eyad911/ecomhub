import React, { useState, useContext } from "react";
import { Image, StyleSheet } from "react-native";

import * as Yup from "yup";
import jwtDecode from "jwt-decode";

import authApi from "../api/auth";
import AuthContext from "../auth/context";
import authStorage from "../auth/storage";
import Screen from "../components/Screen";
import {
  AppForm,
  AppFormField,
  SubmitButton,
  ErrorMessages,
} from "../components/forms";
import ActivityIndicator from "../components/ActivityIndicator";

const validationSchema = Yup.object().shape({
  username: Yup.string().required().label("Username"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

function RegisterScreen() {
  // مانحتاج الهوك لاننا استخدمنا فورم اك
  const registerApi = useApi(authApi.register);
  const loginApi = useApi(authApi.login);
  const [error, setError] = useState();
  const authContext = useContext(AuthContext);

  const handleSubmit = async (userInfo) => {
    const result = await registerApi.request(userInfo);
    // console.log(result,'-------------+++++++++++++______________');

    if (!result.ok) {
      if (result.data)
        setError(
          result.data.username || result.data.email || result.data.password
        );
      else {
        setError("An unexpected error occurred.");
      }
      return;
    }

    const { data: authToken } = await loginApi.request(
      userInfo.username,
      userInfo.password
    );
    const user = jwtDecode(authToken.access);
    authContext.setUser(user);
    authStorage.storeToken(authToken.access);
  };

  return (
    <>
      <ActivityIndicator visible={registerApi.loading || loginApi.loading} />
      <Screen style={styles.container}>
        <Image style={styles.logo} source={require("../assets/logo2.png")} />

        <AppForm
          initialValues={{ username: "", email: "", password: "" }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <ErrorMessages error={error} visible={error} />
          <AppFormField
            autoCorrect={false}
            icon="account"
            name="username"
            placeholder="User Name"
          />
          <AppFormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="email"
            keyboardType="email-address"
            name="email"
            placeholder="Email"
            textContentType="emailAddress"
          />
          <AppFormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="lock"
            name="password"
            placeholder="Password"
            secureTextEntry
            textContentType="password"
          />
          <AppFormField
            autoCorrect={false}
            icon="account"
            name="first_name"
            placeholder="First Name"
          />
          <AppFormField
            autoCorrect={false}
            icon="account"
            name="last_name"
            placeholder="Last Name"
          />

          <SubmitButton title="Register" />
        </AppForm>
      </Screen>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: "center",
    marginTop: 30,
    marginBottom: 20,
  },
});
export default RegisterScreen;
