import GitHubStore from "@store/GitHubStore";
import { RepoItemModel } from "@store/models/gitHub";
import { Meta } from "@utils/meta";
import { ILocalStore } from "@utils/useLocalStore";
import { action, computed, makeObservable, observable } from "mobx";

type PrivateFields = "_value";

export default class RepoListPageStore implements ILocalStore {
  private readonly _gitHubStore = new GitHubStore();
  private _value: string = this._gitHubStore.org
    ? this._gitHubStore.org.toString()
    : "";

  constructor() {
    makeObservable<RepoListPageStore, PrivateFields>(this, {
      _value: observable,
      list: computed,
      meta: computed,
      value: computed,
      setValue: action,
    });
  }
  get meta(): Meta {
    return this._gitHubStore.metaList;
  }

  get list(): RepoItemModel[] {
    return this._gitHubStore.repoList;
  }
  setValue(e: React.ChangeEvent<HTMLInputElement>): void {
    this._value = e.target.value;
  }
  get value(): string {
    return this._value;
  }

  getReposList(): void {
    this._gitHubStore.GetOrganizationReposList();
  }
  destroy(): void {}
}
