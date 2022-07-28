import React from "react";
import styles from "./account.module.css";
import { ContentWrapper } from "../contentWrapper/ContentWrapper";
import { UserInformation } from "../UserInformation/UserInformation";
import { Message } from "react-message-block";

export const UserAccount = ({ errors, children, user }) => {
  return (
    <ContentWrapper>
      <div className={styles.profile}>
        {errors ? (
          <Message text={errors} type='error' />
        ) : (
          <div className={styles.userInformation}>
            <UserInformation {...user} />
            <div className={styles.userData}>
              {children}
            </div>
          </div>
        )}
      </div>
    </ContentWrapper>
  );
};
