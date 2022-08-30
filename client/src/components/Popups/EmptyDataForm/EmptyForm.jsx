import React from "react";
import { Popup } from "../../Popup/Popup";

export const EmptyForm = ({ active, setActive }) => {
  return (
    <Popup active={active} setActive={setActive}>
      <div>
        <h1>Заповніть усі дані!</h1>
      </div>
    </Popup>
  );
};
