import React from "react";

import style from "./TopicList.module.scss";
import Topic from "../Topic/Topic";

const TopicList: React.FC<{ topics: string[] }> = ({ topics }) => {
  return (
    <div className={style.topics}>
      {topics.map((topic, i) => (
        <Topic key={i} text={topic} />
      ))}
    </div>
  );
};

export default TopicList;
