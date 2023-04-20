import React from "react";
import styles from "./Button.module.css";

interface ButtonProps {
  disabled?: boolean;
  onClick?: () => void;
  name?: string;
};

export default function Button({
  onClick,
  disabled,
  name
}: ButtonProps) {

  return (
    <>
      <button className={styles.buttonAdd} disabled={disabled} onClick={onClick}>{name}</button>
    </>
  );
};
