import { LoaderSize } from "@components/Loader";
import { Loader } from "@components/Loader";
import classNames from "classnames";

import styles from "./Button.module.scss";

export const Button: React.FC<ButtonProps> = ({
  children,
  loading,
  disabled,
  className,
  ...props
}) => {
  return (
    <button
      {...props}
      disabled={loading || disabled}
      className={classNames(
        styles.button,
        { [styles.disabled]: disabled },
        className,
        { [styles.disabled]: loading }
      )}
    >
      {
        <>
          {loading && (
            <div className={styles.loader}>
              <Loader size={LoaderSize.s} />
            </div>
          )}
          {children}
        </>
      }
    </button>
  );
};

export type ButtonProps = React.PropsWithChildren<{
  /**
   * Если true, то внутри кнопки вместе с children отображается компонент Loader
   * Также кнопка должна переходить в состояние disabled
   */
  loading?: boolean;
}> &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

export default Button;
