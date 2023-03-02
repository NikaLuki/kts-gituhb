import { RepoItemModel } from "@store/models/gitHub";
import {
  CollectionModel,
  getInitialCollectionModel,
  linearizeCollection,
} from "@store/models/shared/collection";
import { log } from "@utils/log";
import { Meta } from "@utils/meta";
import { ILocalStore } from "@utils/useLocalStore";
import axios from "axios";
import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";

import { normalizeRepoItem } from "./../models/gitHub/repoItem";
import { normalizeCollection } from "./../models/shared/collection";
import { GetCurrentRepoParams, GetOrganizationReposListParams } from "./types";

const BASE_URL = "https://api.github.com";

type PrivateFilds = "_metaCurrent" | "_currentRepo" | "_repoList" | "_metaList";

export default class GitHubStore implements ILocalStore {
  private _currentRepo: RepoItemModel | null = null;
  private _metaCurrent: Meta = Meta.initial;
  private _repoList: CollectionModel<string, RepoItemModel> =
    getInitialCollectionModel();
  private _metaList: Meta = Meta.initial;

  constructor() {
    makeObservable<GitHubStore, PrivateFilds>(this, {
      _currentRepo: observable,
      _metaCurrent: observable,
      _repoList: observable.ref,
      _metaList: observable,
      currentRepo: computed,
      metaCurrent: computed,
      metaList: computed,
      repoList: computed,
      GetOrganizationReposList: action,
      GetCurrentRepo: action,
    });
  }

  get currentRepo(): RepoItemModel | null {
    return this._currentRepo;
  }

  get metaCurrent(): Meta {
    return this._metaCurrent;
  }

  get repoList(): RepoItemModel[] {
    log("list rerender");
    return linearizeCollection(this._repoList);
  }

  get metaList(): Meta {
    return this._metaList;
  }

  GetOrganizationReposList(params: GetOrganizationReposListParams): void {
    this._metaList = Meta.loading;
    axios
      .get(BASE_URL + `/orgs/${params.org}/repos`)
      .then((response) => {
        runInAction(() => {
          try {
            const list: RepoItemModel[] = response.data.map(normalizeRepoItem);
            this._repoList = normalizeCollection(
              list,
              (listItem) => listItem.id
            );
            this._metaList = Meta.success;
          } catch (error) {
            this._metaList = Meta.error;
            this._repoList = getInitialCollectionModel();
          }
        });
      })
      .catch(() => {
        this._metaList = Meta.error;
      });
  }

  GetCurrentRepo(params: GetCurrentRepoParams): void {
    this._metaCurrent = Meta.loading;
    axios
      .get(BASE_URL + `/repos/${params.org}/${params.id}`)
      .then((response) => {
        axios(BASE_URL + `/repos/${params.org}/${params.id}/readme`, {
          headers: { Accept: "application/vnd.github.html" },
        })
          .then((readme) => {
            runInAction(() => {
              this._currentRepo = normalizeRepoItem({
                ...response.data,
                readme: readme.data,
              });
              this._metaCurrent = Meta.success;
            });
          })
          .catch(() => {
            runInAction(() => {
              try {
                this._currentRepo = normalizeRepoItem({ ...response.data });
                this._metaCurrent = Meta.success;
              } catch (error) {
                this._metaCurrent = Meta.error;
                this._currentRepo = null;
              }
            });
          });
      })
      .catch(() => {
        this._metaCurrent = Meta.error;
      });
  }

  destroy(): void {}
}
