import React from "react";

import { RepoItemModel } from "@store/models/gitHub";
import { log } from "@utils/log";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";

import styles from "./RepoList.module.scss";
import RepoCard from "../RepoCard";
import CardContent from "../RepoCard/components/CardContent";

type RepoListProps = {
  repositories: RepoItemModel[];
};

const RepoList: React.FC<RepoListProps> = ({ repositories }) => {
  log("List rerender");
  return (
    <div className={styles.container}>
      <InfiniteScroll
        dataLength={repositories.length}
        next={() => {}}
        hasMore={false}
        loader={false}
        height={500}
        style={{
          overflowX: "hidden",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {repositories.map((repo) => (
          <Link
            key={repo.id}
            to={`/${repo.owner.login}/${repo.name}`}
            className={styles.link}
          >
            <RepoCard
              image={repo.owner.avatarUrl}
              subtitle={repo.owner.login}
              title={repo.name}
              content={
                <CardContent
                  stars={repo.stargazersCount}
                  updated={repo.updatedAt}
                />
              }
            />
          </Link>
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default React.memo(RepoList);
