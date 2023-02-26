import React from "react";

import { useNavigate } from "react-router-dom";

import styles from "./RepoList.module.scss";
import type { Repo } from "../../RepositoriesPage";
import RepoCard from "../RepoCard";
import CardContent from "../RepoCard/components/CardContent";

type RepoListProps = {
  repositories: Repo[];
};

const RepoList: React.FC<RepoListProps> = ({ repositories }) => {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      {repositories.map((repo) => (
        <RepoCard
          key={repo.id}
          image={repo.owner.avatar_url}
          subtitle={repo.owner.login}
          title={repo.name}
          content={
            <CardContent
              stars={repo.stargazers_count}
              updated={repo.updated_at}
            />
          }
          onClick={() => navigate(`/${repo.owner.login}/${repo.name}`)}
        />
      ))}
    </div>
  );
};

export default RepoList;
