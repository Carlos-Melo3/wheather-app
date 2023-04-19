import React from "react";
import TextField from "../TextField";
import styles from "./Header.module.css";

interface HeaderProps {
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  value?: string;
  onKeyDown?: (event: any) => void;
  disabled?: boolean;
  onClick?: () => void;
  elements?: string[];
  onElement?: (element: string) => void;
};

export default function Header({
  onChange,
  placeholder,
  value,
  onKeyDown,
  disabled,
  onClick,
  elements,
  onElement,
}: HeaderProps) {
  const [showDropdown, setShowDropdown] = React.useState(false);

  const handleTextFieldClick = () => {
    setShowDropdown(true);
  };

  const handleTextFieldBlur = () => {
    setShowDropdown(false);
  };

  const handleElementClick = (city: string) => {
    if(showDropdown) {
      setShowDropdown(false);
      onElement?.(city);
    }
  };

  return (
    <>
      <div className={styles.header}>
        <div className={styles.title} onClick={onClick}>
          <h1 className={styles.firstName}>Wheather</h1>
          <h1 className={styles.secondName}>App</h1>
        </div>
        <TextField
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          onKeyDown={onKeyDown}
          disabled={disabled}
          onClick={handleTextFieldClick}
          onBlur={handleTextFieldBlur}
        />
        <div className={`${styles.dropdown} ${showDropdown ? styles.dropdownOpen : styles.dropdownClose}`}>
          {elements?.map((element) => (
            <div className={styles.itemsDropdown} key={element} onClick={() => handleElementClick(element)}>
              <p>{element}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
