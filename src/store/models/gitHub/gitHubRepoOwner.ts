export type GitHubRepoOwnerApi = {
  login: string;
  avatar_url: string;
};
export type GitHubRepoOwnerModel = {
  login: string;
  avatarUrl: string;
};

export const normalizeGitHubRepoOwner = (
  from: GitHubRepoOwnerApi
): GitHubRepoOwnerModel => ({
  login: from.login,
  avatarUrl: from.avatar_url,
});
