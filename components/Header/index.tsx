import React from "react";
import TextField from "../TextField";
import styles from "./Header.module.css";

interface HeaderProps {
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  value?: string;
  onKeyDown?: (event: any) => void;
  disabled?: boolean;
  onHome?: () => void;
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
  onHome,
  elements,
  onElement,
  onClick,
}: HeaderProps) {
  const [showDropdown, setShowDropdown] = React.useState(false);

  const handleTextFieldClick = () => {
    setShowDropdown(true);
  };

  const handleTextFieldBlur = () => {
    setShowDropdown(false);
  };

  const handleElementClick = (city: string) => {
    setShowDropdown(false);
    onElement?.(city);
  };

  return (
    <>
      <div className={styles.header}>
        <div className={styles.title} onClick={onHome}>
          <h1 className={styles.firstName}>Wheather</h1>
          <h1 className={styles.secondName}>App</h1>
        </div>
        <div className={styles.searchContent} onMouseOver={handleTextFieldClick}>
          <TextField
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            onKeyDown={onKeyDown}
            disabled={disabled}
          />
          <div onClick={onClick} className={styles.searchIcon}>
            <img src="/icon/searchIcon.svg"/>
          </div>
        </div>
        <div className={`${styles.dropdown} ${showDropdown ? styles.dropdownOpen : styles.dropdownClose}`} onMouseOver={handleTextFieldClick} onMouseOut={handleTextFieldBlur}>
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
