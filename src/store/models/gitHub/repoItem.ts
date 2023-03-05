import {
  GitHubRepoOwnerApi,
  GitHubRepoOwnerModel,
  normalizeGitHubRepoOwner,
} from "./gitHubRepoOwner";
export type RepoItemApi = {
  id: string;
  name: string;
  owner: GitHubRepoOwnerApi;
  stargazers_count: string;
  updated_at: string;
  forks_count: string;
  watchers_count: string;
  topics: string[];
  homepage: string | null;
  readme?: string;
};

export type RepoItemModel = {
  id: string;
  name: string;
  owner: GitHubRepoOwnerModel;
  stargazersCount: string;
  updatedAt: Date;
  forksCount: string;
  watchersCount: string;
  topics: string[];
  homepage: string | null;
  readme?: string;
};

export const normalizeRepoItem = (from: RepoItemApi): RepoItemModel => ({
  id: from.id,
  name: from.name,
  stargazersCount: from.stargazers_count,
  updatedAt: new Date(from.updated_at),
  forksCount: from.forks_count,
  homepage: from.homepage,
  readme: from.readme,
  topics: from.topics,
  watchersCount: from.watchers_count,
  owner: normalizeGitHubRepoOwner(from.owner),
});
