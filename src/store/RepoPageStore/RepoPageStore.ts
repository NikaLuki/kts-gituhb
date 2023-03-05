import GitHubStore from "@store/GitHubStore";
import { GetCurrentRepoParams } from "@store/GitHubStore/types";
import { RepoItemModel } from "@store/models/gitHub";
import { Meta } from "@utils/meta";
import { ILocalStore } from "@utils/useLocalStore";
import { computed, makeObservable } from "mobx";

export class RepoPageStore implements ILocalStore {
  private _gitHubStore = new GitHubStore();
  constructor() {
    makeObservable<RepoPageStore>(this, {
      meta: computed,
      currentRepo: computed,
    });
  }

  get meta(): Meta {
    return this._gitHubStore.metaCurrent;
  }

  get currentRepo(): RepoItemModel | null {
    return this._gitHubStore.currentRepo;
  }

  getCurrentRepo(params: GetCurrentRepoParams): void {
    this._gitHubStore.GetCurrentRepo(params);
  }

  destroy(): void {}
}
