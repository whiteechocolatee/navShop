import React, { useEffect } from "react";
import "./app.css";

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { paths } from "./paths";
import { Main } from "./pages/Main/Main";
import { Error } from "./pages/Error/Error";
import { CategoryPage } from "./pages/Category/CategoryPage";
import { SingleItemPage } from "./pages/SingleItem/SingleItemPage";
import { Registration } from "./pages/Registration/Registration";
import { Login } from "./pages/Login/Login";
import { UserAccount } from "./pages/userAccount/UserAccount";
import {
  checkIsAuth,
} from "./store/users/userAuthSlice";
import { useSelector } from "react-redux";

function App() {
  const isAuth = useSelector(checkIsAuth);

  return (
    <BrowserRouter>
      <Routes>
        {isAuth ? (
          <Route
            exact
            path={paths.account}
            element={<UserAccount />}
          />
        ) : (
          <Route
            exact
            path={paths.account}
            element={<Navigate replace to={paths.login} />}
          />
        )}
        <Route exact path={paths.main} element={<Main />} />
        <Route
          exact
          path={`${paths.category}/:categoryName`}
          element={<CategoryPage />}
        />
        <Route
          exact
          path={`${paths.itemPage}/:id`}
          element={<SingleItemPage />}
        />
        <Route
          exact
          path={paths.signup}
          element={<Registration />}
        />
        <Route
          exact
          path={paths.login}
          element={<Login />}
        />
        <Route path='*' element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
