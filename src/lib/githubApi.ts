export interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  fork: boolean;
  updated_at: string;
}

export interface GitHubProfile {
  login: string;
  name: string | null;
  avatar_url: string;
  followers: number;
  following: number;
  public_repos: number;
  bio: string | null;
  location: string | null;
  company: string | null;
  blog: string | null;
  created_at: string;
  updated_at: string;
}

export interface GitHubStats {
  totalStars: number;
  totalForks: number;
  totalCommits: number;
  contributions: number;
}

export interface GitHubContributionDay {
  color: string;
  contributionCount: number;
  contributionLevel: string;
  date: string;
}

export interface GitHubContributionResponse {
  contributions: GitHubContributionDay[][];
  totalContributions: number;
}

interface GitHubApiErrorPayload {
  message?: string;
}

interface UnghUserResponse {
  user: {
    id: number;
    username: string;
    name: string | null;
    twitter: string | null;
    avatar: string;
  };
}

interface UnghRepo {
  id: number;
  name: string;
  repo: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
  pushedAt: string;
  stars: number;
  forks: number;
  defaultBranch: string;
}

interface UnghReposResponse {
  repos: UnghRepo[];
}

const GITHUB_USERNAME = "sachinverma95";

export class GitHubApiService {
  private static readonly BASE_URL = "https://api.github.com";
  private static readonly FALLBACK_BASE_URL = "https://ungh.cc";
  private static readonly USERNAME = GITHUB_USERNAME;

  private static async fetchJson<T>(url: string, init?: RequestInit): Promise<T> {
    const response = await fetch(url, {
      headers: {
        Accept: "application/vnd.github+json",
      },
      ...init,
    });

    if (!response.ok) {
      let errorMessage = `${response.status}: ${response.statusText}`;

      try {
        const payload = (await response.json()) as GitHubApiErrorPayload;
        if (payload?.message) {
          errorMessage = `${response.status}: ${payload.message}`;
        }
      } catch {
        // Ignore JSON parsing failures and fall back to the status text.
      }

      throw new Error(`Request to ${url} failed (${errorMessage})`);
    }

    return response.json() as Promise<T>;
  }

  private static async fetchPrimaryProfile(): Promise<GitHubProfile> {
    return this.fetchJson<GitHubProfile>(`${this.BASE_URL}/users/${this.USERNAME}`);
  }

  private static async fetchPrimaryRepos(
    options: {
      sort?: "updated" | "created" | "pushed" | "full_name";
      direction?: "asc" | "desc";
      per_page?: number;
      page?: number;
    } = {},
  ): Promise<GitHubRepo[]> {
    const params = new URLSearchParams({
      sort: options.sort || "updated",
      direction: options.direction || "desc",
      per_page: String(options.per_page || 100),
      page: String(options.page || 1),
    });

    const repos = await this.fetchJson<GitHubRepo[]>(
      `${this.BASE_URL}/users/${this.USERNAME}/repos?${params}`,
    );

    return repos.filter((repo) => !repo.fork);
  }

  private static async fetchFallbackUser(): Promise<UnghUserResponse["user"]> {
    const data = await this.fetchJson<UnghUserResponse>(
      `${this.FALLBACK_BASE_URL}/users/${this.USERNAME}`,
    );

    return data.user;
  }

  private static mapFallbackRepo(repo: UnghRepo): GitHubRepo {
    return {
      id: repo.id,
      name: repo.name,
      description: repo.description,
      html_url: `https://github.com/${repo.repo}`,
      stargazers_count: repo.stars,
      forks_count: repo.forks,
      language: null,
      fork: false,
      updated_at: repo.updatedAt,
    };
  }

  private static async fetchFallbackRepos(): Promise<GitHubRepo[]> {
    const data = await this.fetchJson<UnghReposResponse>(
      `${this.FALLBACK_BASE_URL}/users/${this.USERNAME}/repos`,
    );

    return data.repos.map((repo) => this.mapFallbackRepo(repo));
  }

  private static buildFallbackProfile(
    user: UnghUserResponse["user"],
    repoCount: number,
  ): GitHubProfile {
    return {
      login: user.username,
      name: user.name,
      avatar_url: user.avatar || `https://github.com/${user.username}.png`,
      followers: 0,
      following: 0,
      public_repos: repoCount,
      bio: null,
      location: null,
      company: null,
      blog: user.twitter ? `https://x.com/${user.twitter}` : null,
      created_at: "",
      updated_at: "",
    };
  }

  private static buildStats(
    repos: GitHubRepo[],
    contributions: GitHubContributionResponse,
  ): GitHubStats {
    return {
      totalStars: repos.reduce((sum, repo) => sum + repo.stargazers_count, 0),
      totalForks: repos.reduce((sum, repo) => sum + repo.forks_count, 0),
      totalCommits: 0,
      contributions: contributions.totalContributions,
    };
  }

  static async fetchProfile(): Promise<GitHubProfile> {
    try {
      return await this.fetchPrimaryProfile();
    } catch (error) {
      console.warn("Primary GitHub profile request failed. Using fallback profile data.", error);
      const [user, repos] = await Promise.all([this.fetchFallbackUser(), this.fetchFallbackRepos()]);
      return this.buildFallbackProfile(user, repos.length);
    }
  }

  static async fetchRepos(
    options: {
      sort?: "updated" | "created" | "pushed" | "full_name";
      direction?: "asc" | "desc";
      per_page?: number;
      page?: number;
    } = {},
  ): Promise<GitHubRepo[]> {
    try {
      return await this.fetchPrimaryRepos(options);
    } catch (error) {
      console.warn("Primary GitHub repos request failed. Using fallback repo data.", error);
      return this.fetchFallbackRepos();
    }
  }

  static async fetchContributions(): Promise<GitHubContributionResponse> {
    const response = await fetch(`https://github-contributions-api.deno.dev/${this.USERNAME}.json`);

    if (!response.ok) {
      throw new Error(`GitHub contributions API returned ${response.status}: ${response.statusText}`);
    }

    return response.json();
  }

  static async fetchAllData(): Promise<{
    profile: GitHubProfile;
    repos: GitHubRepo[];
    stats: GitHubStats;
    contributions: GitHubContributionResponse;
  }> {
    try {
      const contributionsPromise = this.fetchContributions().catch((error) => {
        console.warn("GitHub contributions request failed. Showing section without heatmap data.", error);
        return { contributions: [], totalContributions: 0 };
      });

      try {
        const [profile, repos, contributions] = await Promise.all([
          this.fetchPrimaryProfile(),
          this.fetchPrimaryRepos({ per_page: 100 }),
          contributionsPromise,
        ]);

        return {
          profile,
          repos,
          stats: this.buildStats(repos, contributions),
          contributions,
        };
      } catch (primaryError) {
        console.warn(
          "Primary GitHub API hit a limit or failed. Falling back to public mirror data.",
          primaryError,
        );

        const [user, repos, contributions] = await Promise.all([
          this.fetchFallbackUser(),
          this.fetchFallbackRepos(),
          contributionsPromise,
        ]);

        const profile = this.buildFallbackProfile(user, repos.length);

        return {
          profile,
          repos,
          stats: this.buildStats(repos, contributions),
          contributions,
        };
      }
    } catch (error) {
      console.error("Failed to fetch GitHub data:", error);
      throw error;
    }
  }

  static getUsername(): string {
    return this.USERNAME;
  }

  static getProfileUrl(): string {
    return `https://github.com/${this.USERNAME}`;
  }

  static getContributionChartUrl(): string {
    return `https://ghchart.rshah.org/8B5CF6/${this.USERNAME}`;
  }
}
