import React from "react";

import { RepoItemModel } from "@store/models/gitHub";
import { Link } from "react-router-dom";

import styles from "./RepoList.module.scss";
import RepoCard from "../RepoCard";
import CardContent from "../RepoCard/components/CardContent";

type RepoListProps = {
  repositories: RepoItemModel[];
};

const RepoList: React.FC<RepoListProps> = ({ repositories }) => {
  return (
    <div className={styles.container}>
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
    </div>
  );
};

export default React.memo(RepoList);
