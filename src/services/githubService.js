export const getGithubData = async () => {
  const username = import.meta.env.VITE_GITHUB_USERNAME;
  if (!username) return { profile: null, repos: [] };

  try {
    const profileRes = await fetch(`https://api.github.com/users/${username}`);
    const profile = await profileRes.json();

    const reposRes = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repos = await reposRes.json();

    return { profile, repos };
  } catch (error) {
    console.error("Error fetching GitHub data:", error);
    return { profile: null, repos: [] };
  }
};
