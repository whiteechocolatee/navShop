import React, { useState } from "react";
import { UserAddressForm } from "../UserAddressForm/UserAddressForm";

export const UserChangeAddress = ({
  chosenAddress,
  handleUpdate,
}) => {
  const [values, setValues] = useState({
    area: chosenAddress?.area || "Виберіть область",
    city: chosenAddress?.city || "Виберіть місто",
    index: chosenAddress?.index || "",
    street: chosenAddress?.street || "",
    department:
      chosenAddress?.department || "Виберіть відділення",
    main: chosenAddress?.main || "",
    _id: chosenAddress?._id,
  });

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <UserAddressForm
        handleAddress={handleUpdate}
        handleChange={handleChange}
        values={values}
      />
    </>
  );
};
