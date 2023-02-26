import React from "react";

import classNames from "classnames";

import styles from "./Input.module.scss";

type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange" | "value"
> & {
  /** Значение поля */
  value: string;
  /** Callback, вызываемый при вводе данных в поле */
  onChange: (value: string) => void;
};

export const Input: React.FC<InputProps> = ({
  value,
  onChange,
  className,
  disabled,
  ...props
}) => {
  return (
    <input
      value={value}
      onChange={(v) => onChange(v.target.value)}
      type="text"
      disabled={disabled}
      className={classNames(
        styles.input,
        { [styles.disabled]: disabled },
        className
      )}
      {...props}
    />
  );
};

export default Input;
