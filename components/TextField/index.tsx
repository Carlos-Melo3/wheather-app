import styles from "./TextField.module.css";

interface TextFieldProps {
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  value?: string;
  onKeyDown?: (event: any) => void;
  disabled?: boolean;
  onClick?: () => void;
  onBlur?: () => void;
}

export default function TextField({
  onChange,
  placeholder,
  value,
  onKeyDown,
  disabled,
  onClick,
  onBlur,
}: TextFieldProps) {
  return (
    <>
      <input
        className={styles.search}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        onKeyDown={onKeyDown}
        disabled={disabled}
        onClick={onClick}
        onBlur={onBlur}
      />
    </>
  );
}
