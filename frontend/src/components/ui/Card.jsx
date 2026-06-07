import React from "react";

const Card = ({ children, accent = false, className = "", ...props }) => {
  return (
    <div
      className={`${accent ? "brand-card-accent" : "brand-card"} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
