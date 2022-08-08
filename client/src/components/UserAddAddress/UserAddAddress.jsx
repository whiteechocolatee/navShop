import React, { useState } from "react";
import { UserAddressForm } from "../UserAddressForm/UserAddressForm";

export const UserAddAddress = ({ handleAddress }) => {
  const [values, setValues] = useState({
    area: "Виберіть область",
    city: "Виберіть місто",
    index: "",
    street: "",
    department: "Виберіть відділення",
    main: "",
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
        handleChange={handleChange}
        handleAddress={handleAddress}
        values={values}
      />
    </>
  );
};
