import React from "react";

import styles from "./Topic.module.scss";

const Topic: React.FC<{ text: string }> = ({ text }) => {
  return <span className={styles.topic}>{text}</span>;
};

export default Topic;
