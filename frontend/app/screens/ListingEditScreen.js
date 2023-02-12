import React, { useState } from "react";
import { StyleSheet, Keyboard, Text, ScrollView } from "react-native";
import * as Yup from "yup";

import product from "../api/product";
import CategoryPickerItem from "../components/CategoryPickerItem";
import { AppForm, AppFormField, SubmitButton } from "../components/forms";
import AppPickerForm from "../components/forms/AppPickerForm";
import FormImagePicker from "../components/forms/FormImagePicker";
import Screen from "../components/Screen";
import colors from "../config/colors";
import useLocation from "../hooks/useLocation";
import UploadScreen from "./UploadScreen";

const validationSchema = Yup.object().shape({
  title: Yup.string().required().min(1).label("Title"),
  price: Yup.number().required().min(4).max(10000).label("Price"),
  description: Yup.string().label("Description"),
  category: Yup.object().required().nullable().label("Category"),
  pic: Yup.array().min(1, "Please select at least one image"),
});

const Categories = [
  {
    label: "Phones",
    value: 1,
    backgroundColor: colors.primary,
    icon: "cellphone",
  },
  {
    label: "Headphones",
    value: 2,
    backgroundColor: colors.secondary,
    icon: "headset",
  },
  {
    label: "Mic",
    value: 3,
    backgroundColor: colors.primary,

    icon: "microphone",
  },
  {
    label: "Laptop",
    value: 4,
    backgroundColor: colors.secondary,
    icon: "laptop-chromebook",
  },
  {
    label: "Printer",
    value: 5,
    backgroundColor: colors.primary,
    icon: "printer",
  },
  {
    label: "Accessories",
    value: 6,
    backgroundColor: colors.secondary,
    icon: "apps",
  },
];

function ListingEditScreen() {
  const location = useLocation();
  const [uploadVisible, setUploadVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  const handlSubmit = async (listing, { resetForm }) => {
    setProgress(0);
    setUploadVisible(true);
    const result = await product.addProduct(
      { ...listing, location },
      (progress) => setProgress(progress)
    );

    console.log(result);
    if (!result.ok) {
      setUploadVisible(false);
      return alert("could not save the product.");
    }
    resetForm();
  };

  return (
    <Screen style={styles.container}>
      <ScrollView>
        <UploadScreen
          onDone={() => setUploadVisible(false)}
          progress={progress}
          visible={uploadVisible}
        />
        <AppForm
          initialValues={{
            title: "",
            unit_price: "",
            description: "",
            category: null,
            inventory: "",
            images: [],
            pic: [],
          }}
          onSubmit={handlSubmit}
          validationSchema={validationSchema}
        >
          <Text style={styles.star}>*</Text>
          <FormImagePicker name="pic" />

          {/* <FormImagePicker name="images" /> */}
          <Text style={styles.star}>*</Text>
          <AppFormField maxLength={255} name="title" placeholder="Title" />
          <Text style={styles.star}>*</Text>
          <AppFormField
            keyboardType="numeric"
            maxLength={8}
            name="price"
            placeholder="Price"
            width={120}
          />
          <Text style={styles.star}>*</Text>
          <AppPickerForm
            items={Categories}
            name="category"
            numberOfColumns={3}
            PickerItemComponent={CategoryPickerItem}
            placeholder="Category"
            width="50%"
          />

          <AppFormField
            maxLength={255}
            multiline
            returnKeyType="done"
            // blurOnSubmit={true}
            onSubmitEditing={Keyboard.dismiss}
            name="description"
            numberOfLines={3}
            placeholder="Description"
          />
          <Text style={styles.star}>*</Text>
          <AppFormField
            keyboardType="numeric"
            maxLength={8}
            name="inventory"
            placeholder="Inventory"
            width={120}
          />

          <SubmitButton title="Post" />
        </AppForm>
      </ScrollView>
    </Screen>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 10,
    // flex: 1
  },
  star: {
    color: "red",
    fontSize: 11,
    paddingLeft: 12,
  },
});
export default ListingEditScreen;
