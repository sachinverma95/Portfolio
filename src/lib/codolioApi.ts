export interface CodolioBadge {
  name: string;
  shortName?: string | null;
  displayName?: string | null;
  hoverText?: string | null;
  icon?: string | null;
  stars?: number | null;
  category?: string | null;
}

export interface CodolioCertificate {
  name: string;
  type: string;
  imageUrl?: string | null;
}

export interface CodolioUserStats {
  handle?: string;
  currentRating?: number;
  globalRank?: number;
  countryRank?: number;
  contestRating?: number;
  contestGlobalRanking?: number;
  totalContests?: number;
  bestRank?: number;
  highestRating?: number;
}

export interface CodolioQuestionStats {
  totalQuestionCounts?: number;
  easyQuestionCounts?: number;
  mediumQuestionCounts?: number;
  hardQuestionCounts?: number;
}

export interface CodolioPlatformProfile {
  platform: string;
  username?: string;
  userStats?: CodolioUserStats;
  totalQuestionStats?: CodolioQuestionStats;
  badgeStats?: {
    badgeList: CodolioBadge[];
  };
  certificateStats?: {
    certificates: CodolioCertificate[];
  };
}

export interface CodolioResponse {
  success?: boolean;
  status?: {
    success?: boolean;
    code?: number;
    message?: string;
    error?: string;
    errorDetails?: string;
  };
  data?: {
    platformProfiles?: {
      platformProfiles: CodolioPlatformProfile[];
    };
  };
  payload?: {
    status?: {
      success?: boolean;
      code?: number;
      message?: string;
      error?: string;
      errorDetails?: string;
    };
    data?: {
      platformProfiles?: {
        platformProfiles: CodolioPlatformProfile[];
      };
    };
  };
}

export interface CodolioActivityData {
  date: string;
  count: number;
  platform: string;
  type: 'submission' | 'contest' | 'badge' | 'certificate';
}

const CODOLIO_USERNAME = "sachin.verma";

export class CodolioApiService {
  private static readonly BASE_URL = "https://api.codolio.com";
  private static readonly USERNAME = CODOLIO_USERNAME;

  static async fetchProfileData(): Promise<CodolioResponse> {
    const response = await fetch(`${this.BASE_URL}/profile?userKey=${this.USERNAME}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      }
    });

    if (!response.ok) {
      throw new Error(`Codolio API returned ${response.status}: ${response.statusText}`);
    }

    return response.json();
  }

  static async scrapeProfileData(): Promise<any> {
    const response = await fetch(`https://codolio.com/profile/V_Patel`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      }
    });

    if (!response.ok) {
      throw new Error(`Codolio scraping returned ${response.status}: ${response.statusText}`);
    }

    const html = await response.text();
    const nextDataMatch = html.match(/id="__NEXT_DATA__" type="application\/json">({.*?})<\/script>/);
    
    if (nextDataMatch && nextDataMatch[1]) {
      return JSON.parse(nextDataMatch[1]);
    } else {
      throw new Error('No Next.js data found in the HTML response');
    }
  }

  static extractPlatformData(response: CodolioResponse): CodolioPlatformProfile[] {
    const platforms =
      response.data?.platformProfiles?.platformProfiles ||
      response.payload?.data?.platformProfiles?.platformProfiles;
    return platforms || [];
  }

  static getLeetCodeData(platforms: CodolioPlatformProfile[]): CodolioPlatformProfile | null {
    return platforms.find(p => p.platform === 'leetcode') || null;
  }

  static getCodeChefData(platforms: CodolioPlatformProfile[]): CodolioPlatformProfile | null {
    return platforms.find(p => p.platform === 'codechef') || null;
  }

  static getHackerRankData(platforms: CodolioPlatformProfile[]): CodolioPlatformProfile | null {
    return platforms.find(p => p.platform === 'hackerrank') || null;
  }

  static async fetchAllPlatformData(): Promise<{
    leetcode?: CodolioPlatformProfile;
    codechef?: CodolioPlatformProfile;
    hackerrank?: CodolioPlatformProfile;
    allPlatforms: CodolioPlatformProfile[];
  }> {
    try {
      const response = await this.fetchProfileData();
      const platforms = this.extractPlatformData(response);

      return {
        leetcode: this.getLeetCodeData(platforms),
        codechef: this.getCodeChefData(platforms),
        hackerrank: this.getHackerRankData(platforms),
        allPlatforms: platforms
      };
    } catch (error) {
      console.error('Failed to fetch Codolio data:', error);
      throw error;
    }
  }

  static getUsername(): string {
    return this.USERNAME;
  }

  static getProfileUrl(): string {
    return `https://codolio.com/profile/sachin.verma`;
  }

  static async fetchActivityData(): Promise<CodolioActivityData[]> {
    // This would need to be implemented based on Codolio's activity API
    // For now, return empty array as placeholder
    return [];
  }

  static transformToAwardData(platform: CodolioPlatformProfile): {
    badges: CodolioBadge[];
    certificates: CodolioCertificate[];
    stats: CodolioUserStats;
    questionStats: CodolioQuestionStats;
  } {
    return {
      badges: platform.badgeStats?.badgeList || [],
      certificates: platform.certificateStats?.certificates || [],
      stats: platform.userStats || {},
      questionStats: platform.totalQuestionStats || {}
    };
  }
}
