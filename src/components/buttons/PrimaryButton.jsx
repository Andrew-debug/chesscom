import React from "react";

const PrimaryButton = ({ text, handleClick }) => {
  return <button onClick={handleClick}>{text}</button>;
};

export default PrimaryButton;
