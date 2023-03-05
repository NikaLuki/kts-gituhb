import { RepoItemModel } from "@store/models/gitHub";
import {
  CollectionModel,
  getInitialCollectionModel,
  linearizeCollection,
} from "@store/models/shared/collection";
import rootStore from "@store/RootStore";
import { Meta } from "@utils/meta";
import { ILocalStore } from "@utils/useLocalStore";
import axios from "axios";
import {
  action,
  computed,
  IReactionDisposer,
  makeObservable,
  observable,
  reaction,
  runInAction,
} from "mobx";

import { normalizeRepoItem } from "./../models/gitHub/repoItem";
import { normalizeCollection } from "./../models/shared/collection";
import { GetCurrentRepoParams } from "./types";

const BASE_URL = "https://api.github.com";

type PrivateFields =
  | "_metaCurrent"
  | "_currentRepo"
  | "_repoList"
  | "_metaList"
  | "_org";

export default class GitHubStore implements ILocalStore {
  private _currentRepo: RepoItemModel | null = null;
  private _metaCurrent: Meta = Meta.initial;
  private _repoList: CollectionModel<string, RepoItemModel> =
    getInitialCollectionModel();
  private _metaList: Meta = Meta.initial;
  private _org: string | string[] | qs.ParsedQs | qs.ParsedQs[] | undefined =
    rootStore.query.getParam("org");
  constructor() {
    makeObservable<GitHubStore, PrivateFields>(this, {
      _currentRepo: observable,
      _metaCurrent: observable,
      _repoList: observable.ref,
      _metaList: observable,
      _org: observable,
      currentRepo: computed,
      metaCurrent: computed,
      metaList: computed,
      repoList: computed,
      org: computed,
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
    return linearizeCollection(this._repoList);
  }

  get metaList(): Meta {
    return this._metaList;
  }

  get org(): string | string[] | qs.ParsedQs | qs.ParsedQs[] | undefined {
    return this._org;
  }

  GetOrganizationReposList(): void {
    if (this._org && this._org !== "") {
      this._metaList = Meta.loading;
      axios
        .get(BASE_URL + `/orgs/${this._org}/repos`)
        .then((response) => {
          runInAction(() => {
            try {
              const list: RepoItemModel[] =
                response.data.map(normalizeRepoItem);
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

  destroy(): void {
    this._qpReaction();
  }
  private readonly _qpReaction: IReactionDisposer = reaction(
    () => rootStore.query.getParam("org"),
    (org) => {
      this._org = org;
      this.GetOrganizationReposList();
    },
    { delay: 1 }
  );
}
