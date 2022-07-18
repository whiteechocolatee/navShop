import React from "react";
import { paths } from "../../paths";
import { Header } from "../../components/Header/Header";

export const UserAccount = () => {
  const { isAdmin } = JSON.parse(
    localStorage.getItem("userInfo"),
  );

  console.log(isAdmin);

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    window.location.replace(paths.main);
  };

  return (
    <div>
      <Header />
      <div>Привет , новый польователь</div>
      {isAdmin && (
        <div>
          <h1>Здравствуйте, Администратор!</h1>
        </div>
      )}
      <button onClick={handleLogout}>
        Выйти из аккаунта
      </button>
    </div>
  );
};
