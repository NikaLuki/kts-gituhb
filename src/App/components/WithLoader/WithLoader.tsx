import styles from "./WithLoader.module.scss";
import { Loader } from "../Loader";

const WithLoader: React.FC<WithLoaderProps> = ({ children, loading }) => {
  return (
    <>
      {loading && (
        <div className={styles["loader-container"]}>
          <Loader className={styles.block} />
        </div>
      )}

      {children}
    </>
  );
};
export type WithLoaderProps = React.PropsWithChildren<{
  loading: boolean;
}>;

export default WithLoader;
