import React from "react";
import { useFormikContext } from "formik";

import ImageInputList from "../ImageInputList";
import ErrorMessages from "./ErrorMessages";

function FormImagePicker({ name }) {
  const { errors, setFieldValue, touched, values } = useFormikContext();
  const imageUris = values[name];

  const handelAdd = (uri) => {
    setFieldValue(name, [...imageUris, uri]);
  };

  const handelDelete = (uri) => {
    setFieldValue(
      name,
      imageUris.filter((imageUri) => imageUri !== uri)
    );
  };

  return (
    <>
      <ImageInputList
        imgUris={imageUris}
        onAddImage={handelAdd}
        onRemoveImage={handelDelete}
      />
      <ErrorMessages error={errors[name]} visible={touched[name]} />
    </>
  );
}

export default FormImagePicker;
