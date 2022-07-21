import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styles from "./user.module.css";

import Message from "react-message-block";

import { paths } from "../../paths";
import { Header } from "../../components/Header/Header";
import {
  logout,
  userProfile,
} from "../../store/users/userAuthSlice";
import { ContentWrapper } from "../../components/contentWrapper/ContentWrapper";
import { Footer } from "../../components/Footer/Footer";
import { UserInformation } from "../../components/UserInformation/UserInformation";
import { UpdateUserInfo } from "../../components/UpdateForm/UpdateUserInfo";

import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

export const UserAccount = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isError, isChanged, user, errors } = useSelector(
    (state) => state.userAuthReducer,
  );

  if (isChanged) {
    toast.success("Данные успешно изменены!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  } else if (isError) {
    toast.error("Произошла ошибка попробуйте позже!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  useEffect(() => {
    dispatch(userProfile());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    window.localStorage.removeItem("token");
    navigate(paths.main);
  };

  return (
    <div>
      <Header
        handleLogout={handleLogout}
        isAuth={user ? true : false}
      />
      <ToastContainer />
      <ContentWrapper>
        <div className={styles.profile}>
          {errors ? (
            <Message text={errors} type='error' />
          ) : (
            <div className={styles.userInformation}>
              <UserInformation {...user} />
              <div className={styles.userData}>
                <UpdateUserInfo
                  user={user}
                  errors={errors}
                />
              </div>
            </div>
          )}
        </div>
      </ContentWrapper>
      <Footer />
    </div>
  );
};
