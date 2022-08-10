import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiPlus } from "react-icons/fi";

import styles from "./personal.module.css";
import { Button } from "../Button/Button";
import { paths } from "../../paths";
import { Loader } from "../Loader/Loader";
import { UserAddressBlock } from "../UserAddressBlock/UserAddressBlock";

export const PersonalData = ({
  isLoading,
  user,
  handleDelete,
  changeMain,
}) => {
  const navigate = useNavigate();

  const addAddress = () => {
    navigate(`${paths.account}/${paths.addAddress}`);
  };

  return (
    <>
      {isLoading ? (
        <Loader containerClassName={styles.loader} />
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
                  <UserAddressBlock
                    handleDelete={handleDelete}
                    changeMain={changeMain}
                    key={address?._id}
                    address={address}
                  />
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
                  <UserAddressBlock
                    handleDelete={handleDelete}
                    changeMain={changeMain}
                    key={address._id}
                    address={address}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
