import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { useSelector } from "react-redux";

import { paths } from "./paths";
import "./app.css";
import { Main } from "./pages/Main/Main";
import { Error } from "./pages/Error/Error";
import { CategoryPage } from "./pages/Category/CategoryPage";
import { SingleItemPage } from "./pages/SingleItem/SingleItemPage";
import { Registration } from "./pages/Registration/Registration";
import { Login } from "./pages/Login/Login";
import { UserMain } from "./pages/UserMain/UserMain";
import { Order } from "./pages/Order/Order";
import { Delivery } from "./pages/Delivery/Delivery";
import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute";
import { UserOrders } from "./pages/UserOrders/UserOrders";
import { UserUpdate } from "./pages/UpdateUserData/UserUpdate";
import { UserAddress } from "./pages/UserAddress/UserAddress";
import { UserUpdateAddress } from "./pages/UserUpdateAddress/UserUpdateAddress";
import { Favorite } from "./pages/Favorite/Favorite";
import { UserUpdatePassword } from "./pages/UserUpdatePassword/UserUpdatePassword";

import {
  checkIsAuth,
  checkIsAdmin,
} from "./store/users/userAuthSlice";

import { MainAdmin } from "./pages/AdminPages/Main/MainAdmin";
import { SingleOrder } from "./pages/AdminPages/SingleOrder/SingleOrder";
import { AdminOrders } from "./pages/AdminPages/AdminOrders/AdminOrders";
import { UserList } from "./pages/AdminPages/UsersList/UserList";
import { Callbacks } from "./pages/AdminPages/Callbacks/Callbacks";
import { SingleCallback } from "./pages/AdminPages/SingleCallback/SingleCallback";
import { AdminItems } from "./pages/AdminPages/Items/AdminItems";
import { AdminSingleItem } from "./pages/AdminPages/SingleItem/AdminSingleItem";

function App() {
  const isAuth = useSelector(checkIsAuth);
  const isAdmin = useSelector(checkIsAdmin);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={<ProtectedRoute condition={isAuth} />}>
          <Route
            exact
            path={paths.account}
            element={<UserMain />}
          />
          <Route
            exact
            path={`${paths.account}${paths.changeUserData}`}
            element={<UserUpdate />}
          />
          <Route
            exact
            path={`${paths.account}/${paths.addAddress}`}
            element={<UserAddress />}
          />
          <Route
            exact
            path={`${paths.account}/${paths.updateAddress}`}
            element={<UserUpdateAddress />}
          />
          <Route
            exact
            path={paths.updatePassword}
            element={<UserUpdatePassword />}
          />
          <Route
            exact
            path={paths.userOrders}
            element={<UserOrders />}
          />
          <Route
            exact
            path={paths.favorite}
            element={<Favorite />}
          />
        </Route>
        {/* ADMIN ROUTES */}
        <Route
          element={
            <ProtectedRoute condition={isAuth && isAdmin} />
          }>
          <Route
            exact
            path={paths.admin}
            element={<MainAdmin />}
          />
          <Route
            exact
            path={`${paths.admin}/order/:id`}
            element={<SingleOrder />}
          />
          <Route
            exact
            path={`${paths.admin}/recent-orders`}
            element={<AdminOrders />}
          />
          <Route
            exact
            path={`${paths.admin}/users`}
            element={<UserList />}
          />
          <Route
            exact
            path={`${paths.admin}/callbacks`}
            element={<Callbacks />}
          />
          <Route
            exact
            path={`${paths.admin}/callbacks/:id`}
            element={<SingleCallback />}
          />
          <Route
            exact
            path={`${paths.admin}/items`}
            element={<AdminItems />}
          />
          <Route
            exact
            path={`${paths.admin}/items/:id`}
            element={<AdminSingleItem />}
          />
        </Route>
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
        <Route
          exact
          path={paths.order}
          element={<Order />}
        />
        <Route
          exact
          path={`${paths.order}/${paths.delivery}`}
          element={<Delivery />}
        />
        <Route path='*' element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
