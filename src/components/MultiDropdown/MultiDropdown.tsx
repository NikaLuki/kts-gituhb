import React, { useState } from "react";

import classNames from "classnames";

import styles from "./MultiDropdown.module.scss";

export type Option = {
  /** Ключ варианта, используется для отправки на бек/использования в коде */
  key: string;
  /** Значение варианта, отображается пользователю */
  value: string;
};

/** Пропсы, которые принимает компонент Dropdown */
export type MultiDropdownProps = {
  /** Массив возможных вариантов для выбора */
  options: Option[];
  /** Текущие выбранные значения поля, может быть пустым */
  value: Option[];
  /** Callback, вызываемый при выборе варианта */
  onChange: (value: Option[]) => void;
  /** Заблокирован ли дропдаун */
  disabled?: boolean;
  /** Преобразовать выбранные значения в строку. Отображается в дропдауне в качестве выбранного значения */
  pluralizeOptions: (value: Option[]) => string;
  placeholder?: string;
};

export const MultiDropdown: React.FC<MultiDropdownProps> = ({
  disabled,
  options,
  value,
  onChange,
  pluralizeOptions,
  placeholder,
}) => {
  const [isActive, setIsActive] = useState(false);
  const handleClick = () => {
    setIsActive(!isActive);
  };

  const findValue = (option: Option) => {
    const isVal = value.find((v) => v.key === option.key);
    return isVal
      ? value.filter((v) => v.key !== option.key)
      : [...value, option];
  };
  return (
    <div className={styles.container}>
      <button className={styles["multi-dropdown"]} onClick={handleClick}>
        {value.length > 0 ? pluralizeOptions(value) : placeholder}
      </button>

      {!disabled && isActive && (
        <div className={styles.options}>
          {options.map((o) => (
            <div
              className={classNames(styles.option, {
                [styles.checked]: value.find((v) => v.key === o.key),
              })}
              key={o.key}
              onClick={() =>
                onChange(findValue({ value: o.value, key: o.key }))
              }
            >
              {o.value}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiDropdown;
