import React from "react";

import style from "./RepoCard.module.scss";

export type RepoCardProps = {
  image: string;
  title: React.ReactNode;
  subtitle: React.ReactNode;
  content: React.ReactNode;

  onClick?: React.MouseEventHandler;
};

const RepoCard: React.FC<RepoCardProps> = ({
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

export default RepoCard;
