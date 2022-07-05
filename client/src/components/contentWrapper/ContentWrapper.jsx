import React from "react";

export const ContentWrapper = ({ className, children }) => {
  return (
    <div className={`container ${className}`}>
      {children}
    </div>
  );
};
