import React, { useEffect } from "react";

import Input from "@components/Input";
import MultiDropdown from "@components/MultiDropdown";
import { Option } from "@components/MultiDropdown/MultiDropdown";
import WithLoader from "@components/WithLoader";
import GitHubStore from "@store/GitHubStore";
import { Meta } from "@utils/meta";
import { useLocalStore } from "@utils/useLocalStore";
import { observer } from "mobx-react-lite";

import RepoList from "./components/RepoList";
import SearchButton from "./components/SearchButton";
import style from "./RepositoriesPage.module.scss";

const options = [
  { key: "public", value: "Public" },
  { key: "private", value: "Private" },
];

const RepositoriesPage = () => {
  const gitHubStore = useLocalStore(() => new GitHubStore());
  const defaultPluralizeOptions = (elements: Option[]) =>
    elements.map((el: Option) => el.key).join();

  useEffect(() => {
    gitHubStore.GetOrganizationReposList({ org: "ktsstudio" });
  }, [gitHubStore]);
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
      <WithLoader loading={gitHubStore.metaList === Meta.loading}>
        {gitHubStore.metaList === Meta.success && (
          <RepoList repositories={gitHubStore.repoList} />
        )}
      </WithLoader>
    </>
  );
};

export default observer(RepositoriesPage);
