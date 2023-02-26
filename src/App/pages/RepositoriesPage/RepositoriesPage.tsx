import React, { useEffect, useState } from "react";

import Input from "@components/Input";
import MultiDropdown from "@components/MultiDropdown";
import { Option } from "@components/MultiDropdown/MultiDropdown";
import axios from "axios";

import RepoList from "./components/RepoList";
import SearchButton from "./components/SearchButton";
import style from "./RepositoriesPage.module.scss";

export type Repo = {
  id: string;
  name: string;
  owner: {
    login: string;
    avatar_url: string;
  };
  stargazers_count: string;
  updated_at: string;
  forks_count: string;
  watchers_count: string;
  topics: string[];
  homepage: string | null;
  readme?: string;
};

const options = [
  { key: "public", value: "Public" },
  { key: "private", value: "Private" },
];

const RepositoriesPage = () => {
  const defaultPluralizeOptions = (elements: Option[]) =>
    elements.map((el: Option) => el.key).join();
  const [repositories, setRepositories] = useState<Repo[]>();
  useEffect(() => {
    axios
      .get("https://api.github.com/orgs/ktsstudio/repos")
      .then((response) => {
        setRepositories(response.data);
      });
  }, []);
  return (
    <>
      <div className={style.search}>
        <Input
          onChange={() => " "}
          value=""
          placeholder="Enter organization name"
        />
        <SearchButton />
      </div>
      <div className={style.search}>
        <p className={style.title}>Repositories</p>
        <MultiDropdown
          onChange={() => ""}
          options={options}
          value={[]}
          pluralizeOptions={defaultPluralizeOptions}
          placeholder="Type"
        />
      </div>
      {repositories && <RepoList repositories={repositories} />}
    </>
  );
};

export default RepositoriesPage;
