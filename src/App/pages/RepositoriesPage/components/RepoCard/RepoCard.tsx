import React from "react";

import Card from "@components/Card";

import style from "./RepoCard.module.scss";

export type RepoCardProps = {
  image: string;
  title: React.ReactNode;
  subtitle: React.ReactNode;
  content: React.ReactNode;

  onClick: React.MouseEventHandler;
};

const RepoCard: React.FC<RepoCardProps> = ({ ...props }) => {
  return (
    <div className={style.container}>
      <Card {...props} />
    </div>
  );
};

export default RepoCard;
