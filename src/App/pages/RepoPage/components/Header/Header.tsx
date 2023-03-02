import React from "react";

import { useNavigate } from "react-router-dom";

import style from "./Header.module.scss";

type HeaderProps = {
  className?: string | undefined;
  owner: string;
  name: string;
};

const Header: React.FC<HeaderProps> = ({ className, owner, name }) => {
  const navigate = useNavigate();
  return (
    <div className={style.header}>
      <svg
        onClick={() => navigate(-1)}
        width="16"
        height="25"
        viewBox="0 0 16 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16 2.2125L13.5939 0L0 12.5L13.5939 25L16 22.7875L4.81223 12.5L16 2.2125Z"
          fill="#FF0000"
        />
      </svg>
      <p className={style.title}>{owner + "/" + name}</p>
    </div>
  );
};

export default Header;
