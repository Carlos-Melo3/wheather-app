import TextField from "../TextField";
import styles from "./SearchBar.module.css";

interface HeaderProps {
  date?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  value?: string;
  onKeyDown?: (event: any) => void;
  disabled?: boolean;
}

export default function SearchBar({
  date,
  onChange,
  placeholder,
  value,
  onKeyDown,
  disabled,
}: HeaderProps) {
  return (
    <>
      <div className={styles.header}>
        <div className={styles.dayAndTime}>
          <h2 className={styles.date}>{date}</h2>
        </div>
        <TextField
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          onKeyDown={onKeyDown}
          disabled={disabled}
        />
      </div>
    </>
  );
}
