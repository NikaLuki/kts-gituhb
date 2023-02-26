import React from "react";

import style from "./Card.module.scss";

export type CardProps = {
  image: string;
  title: React.ReactNode;
  subtitle: React.ReactNode;
  content?: React.ReactNode;

  onClick?: React.MouseEventHandler;
};

const Card: React.FC<CardProps> = ({
  image,
  title,
  subtitle,
  content,
  onClick,
}) => {
  return (
    <div onClick={onClick} className={style.card}>
      <img className={style.image} src={image} alt="avatar" />
      <div className={style.body}>
        <div className={style.title}>{title}</div>
        <div className={style.subtitle}>{subtitle}</div>
        <div className={style.content}>{content} </div>
      </div>
    </div>
  );
};

export default Card;
