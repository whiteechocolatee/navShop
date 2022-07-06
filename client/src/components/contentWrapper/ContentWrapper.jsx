import React from "react";

export const ContentWrapper = ({ className, children }) => {
  return (
    <div className={`container-lg ${className}`}>
      {children}
    </div>
  );
};
