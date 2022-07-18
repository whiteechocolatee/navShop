import React from "react";
import { paths } from "../../paths";
import { Header } from "../../components/Header/Header";

export const UserAccount = () => {
  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    window.location.replace(paths.main);
  };

  return (
    <div>
      <Header />
      <div>Привет , новый польователь</div>
      <button onClick={handleLogout}>
        Выйти из аккаунта
      </button>
    </div>
  );
};
