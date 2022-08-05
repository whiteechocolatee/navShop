import React from "react";
import styles from "./personal.module.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button } from "../Button/Button";
import { Link } from "react-router-dom";
import { paths } from "../../paths";
import { Loader } from "../Loader/Loader";

import { FiPlus } from "react-icons/fi";

export const PersonalData = () => {
  const navigate = useNavigate();
  const { user, isLoading } = useSelector(
    (state) => state.userAuthReducer,
  );

  const addAddress = () => {
    navigate(`${paths.account}/${paths.addAddress}`);
  };

  console.log(user);

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={styles.personalBlock}>
          <div className={styles.personalData}>
            <div>
              <p>
                {user.name} {user.surname}
              </p>
              <p>{user.email}</p>
              <p>{user.phoneNumber}</p>
            </div>
            <Button
              containerClassName={styles.btn}
              children={
                <Link
                  className={styles.link}
                  to={`${paths.account}${paths.changeUserData}`}>
                  Змінити
                </Link>
              }
            />
          </div>
          <div className={styles.addressesContainer}>
            {user?.addresses?.length < 3 ? (
              <div className={styles.addressesWithBtn}>
                {user?.addresses?.map((address) => (
                  <div className={styles.address}>
                    <div className={styles.addressInfo}>
                      <div>isMain</div>
                      <span>{address.area}</span>
                      <span>{address.city}</span>
                      <span>{address.department}</span>
                      <span>{address.index}</span>
                    </div>
                    <div className={styles.addressNav}>
                      <Button
                        containerClassName={styles.btn}
                        children='Змінити'
                      />
                      <div className={styles.deleteAddress}>
                        Видалити
                      </div>
                    </div>
                  </div>
                ))}
                <div className={styles.addAddress}>
                  <p>Додати адресу</p>
                  <div
                    onClick={addAddress}
                    className={styles.icon}>
                    <div className={styles.outline}>
                      <FiPlus />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className={styles.addresses}>
                {user?.addresses?.map((address) => (
                  <div className={styles.address}>
                    <div className={styles.addressInfo}>
                      <div>isMain</div>
                      <span>{address.area}</span>
                      <span>{address.city}</span>
                      <span>{address.department}</span>
                      <span>{address.index}</span>
                    </div>
                    <div className={styles.addressNav}>
                      <Button
                        containerClassName={styles.btn}
                        children='Змінити'
                      />
                      <div className={styles.deleteAddress}>
                        Видалити
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
