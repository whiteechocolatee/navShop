import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import "moment/locale/uk";

import styles from "./users.module.css";
import { Navbar } from "../../../components/AdminNav/Navbar";
import { ContentWrapper } from "../../../components/contentWrapper/ContentWrapper";
import { Footer } from "../../../components/Footer/Footer";
import { getUsers } from "../../../store/users/userAuthSlice";
import { Loader } from "../../../components/Loader/Loader";

export const UserList = () => {
  window.scroll(0, 0);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const { users, isLoading } = useSelector(
    (state) => state.userAuthReducer,
  );

  console.log(users);

  return (
    <>
      <Navbar />
      <ContentWrapper className={styles.wrapper}>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <h1>Користувачі</h1>
            <div className={styles.usersContainer}>
              {Array.isArray(users) &&
                users.map((user) => (
                  <div
                    className={`card border-dark ${styles.userCard}`}>
                    <div className='card-header'>
                      {user.isAdmin
                        ? "Адміністратор"
                        : "Користувач"}
                    </div>
                    <div className='card-body text-dark'>
                      <h5 className='card-title'>
                        {user.name} {user.surname}
                      </h5>
                      <p className='card-text'>
                        <a href={`mailto:${user.email}`}>
                          {user.email}
                        </a>
                      </p>
                      <p className='card-text'>
                        <a href={`tel:${user.phoneNumber}`}>
                          {user.phoneNumber}
                        </a>
                      </p>
                      <p className='card-text'>
                        Приєднався:{" "}
                        {moment(user.createdAt).format("L")}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </>
        )}
      </ContentWrapper>
      <Footer />
    </>
  );
};
