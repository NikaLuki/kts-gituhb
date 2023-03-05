import React, { useCallback, useEffect } from "react";

import Input from "@components/Input";
import MultiDropdown from "@components/MultiDropdown";
import { Option } from "@components/MultiDropdown/MultiDropdown";
import WithLoader from "@components/WithLoader";
import RepoListPageStore from "@store/RepoListPageStore";
import { Meta } from "@utils/meta";
import { useLocalStore } from "@utils/useLocalStore";
import { observer } from "mobx-react-lite";
import { createSearchParams, useNavigate } from "react-router-dom";

import RepoList from "./components/RepoList";
import SearchButton from "./components/SearchButton";
import style from "./RepositoriesPage.module.scss";

const options = [
  { key: "public", value: "Public" },
  { key: "private", value: "Private" },
];

const RepositoriesPage = () => {
  const navigate = useNavigate();
  const reposPageStore = useLocalStore(() => new RepoListPageStore());
  const defaultPluralizeOptions = (elements: Option[]) =>
    elements.map((el: Option) => el.key).join();

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => reposPageStore.setValue(e),
    [reposPageStore]
  );
  const newOrg = reposPageStore.value;
  useEffect(() => {
    reposPageStore.getReposList();
  }, [reposPageStore]);

  const handleClick = () => {
    const options = {
      search: `?${createSearchParams({ org: newOrg })}`,
    };
    navigate(options);
  };

  return (
    <>
      <div className={style.search}>
        <Input
          onChange={handleChange}
          value={newOrg}
          placeholder="Enter organization name"
        />
        <SearchButton onClick={handleClick} />
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

      <WithLoader loading={reposPageStore.meta === Meta.loading}>
        {reposPageStore.meta === Meta.success && (
          <RepoList repositories={reposPageStore.list} />
        )}
      </WithLoader>
    </>
  );
};

export default observer(RepositoriesPage);
