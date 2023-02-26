import classNames from "classnames";

import style from "./Loader.module.scss";

export type LoaderProps = {
  loading?: boolean;
  size?: LoaderSize;
  className?: string;
};
export enum LoaderSize {
  s = "s",
  m = "m",
  l = "l",
}

export const Loader: React.FC<LoaderProps> = ({
  loading = true,
  size = "m",
  className,
}) => {
  if (loading) {
    return (
      <div
        className={classNames(
          style.loader,
          style[`loader_size_${size}`],
          className
        )}
      ></div>
    );
  } else return <></>;
};
