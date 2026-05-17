// Comprehensive data sync script for all platform APIs
const USERNAMES = {
  github: 'sangamsingh18',
  leetcode: 'sangamsingh18',
  codolio: 'sangamsingh18'
};

// Color codes for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

async function syncGitHub() {
  log('🔍 Syncing GitHub data...', 'cyan');
  try {
    // Get user profile
    const profileResponse = await fetch(`https://api.github.com/users/${USERNAMES.github}`);
    const profile = await profileResponse.json();
    
    // Get repositories
    const reposResponse = await fetch(`https://api.github.com/users/${USERNAMES.github}/repos?per_page=100&sort=updated`);
    const repos = await reposResponse.json();
    
    log(`✅ GitHub Profile: ${profile.name} (@${profile.login})`, 'green');
    log(`   📁 Public repos: ${profile.public_repos}`, 'green');
    log(`   👥 Followers: ${profile.followers} | Following: ${profile.following}`, 'green');
    log(`   📍 Location: ${profile.location || 'Not specified'}`, 'green');
    log(`   📝 Bio: ${profile.bio || 'No bio'}`, 'green');
    
    log(`   🚀 Recent repositories:`, 'yellow');
    repos.slice(0, 5).forEach((repo, index) => {
      log(`     ${index + 1}. ${repo.name} ⭐ ${repo.stargazers_count} 🍴 ${repo.forks_count}`, 'yellow');
    });
    
    return { success: true, profile, repos };
  } catch (error) {
    log(`❌ GitHub sync failed: ${error.message}`, 'red');
    return { success: false, error: error.message };
  }
}

async function syncLeetCode() {
  log('🔍 Syncing LeetCode data...', 'cyan');
  try {
    // Try multiple LeetCode APIs
    const apis = [
      `https://leetcode-stats-api.herokuapp.com/${USERNAMES.leetcode}`,
      `https://leetcode-api-faisalr.vercel.app/${USERNAMES.leetcode}`,
      `https://alfa-leetcode-api.onrender.com/${USERNAMES.leetcode}`
    ];
    
    let leetcodeData = null;
    let workingApi = null;
    
    for (const api of apis) {
      try {
        log(`   Trying: ${api}`, 'yellow');
        const response = await fetch(api);
        const data = await response.json();
        
        if (data.totalSolved || data.totalSolved !== undefined) {
          leetcodeData = data;
          workingApi = api;
          break;
        }
      } catch (e) {
        log(`   Failed: ${e.message}`, 'red');
      }
    }
    
    if (leetcodeData) {
      log(`✅ LeetCode data from: ${workingApi}`, 'green');
      log(`   🎯 Total Solved: ${leetcodeData.totalSolved || 0}`, 'green');
      log(`   📊 Easy: ${leetcodeData.easySolved || 0} | Medium: ${leetcodeData.mediumSolved || 0} | Hard: ${leetcodeData.hardSolved || 0}`, 'green');
      log(`   🏆 Ranking: ${leetcodeData.ranking || 'N/A'}`, 'green');
      log(`   ⚡ Acceptance Rate: ${leetcodeData.acceptanceRate || 'N/A'}%`, 'green');
      
      return { success: true, data: leetcodeData, api: workingApi };
    } else {
      log('❌ All LeetCode APIs failed', 'red');
      return { success: false, error: 'All APIs failed' };
    }
  } catch (error) {
    log(`❌ LeetCode sync failed: ${error.message}`, 'red');
    return { success: false, error: error.message };
  }
}

async function syncCodolio() {
  log('🔍 Syncing Codolio data...', 'cyan');
  try {
    // Direct API call
    const directResponse = await fetch(`https://api.codolio.com/profile?userKey=${USERNAMES.codolio}`);
    const directData = await directResponse.json();
    
    // Local API call (through Vite proxy)
    const localResponse = await fetch('http://localhost:8080/api/codolio');
    const localData = await localResponse.json();
    
    log(`✅ Codolio Direct API: ${directData.success ? 'Connected' : 'Failed'}`, 'green');
    log(`✅ Codolio Local API: ${localData.success ? 'Connected' : 'Failed'}`, 'green');
    
    if (directData.payload?.data?.platformProfiles?.platformProfiles) {
      const platforms = directData.payload.data.platformProfiles.platformProfiles;
      log(`   📊 Platforms found: ${platforms.length}`, 'yellow');
      
      platforms.forEach(platform => {
        const stats = platform.userStats || {};
        log(`   🎮 ${platform.platform}: Rating ${stats.currentRating || 'N/A'} | Problems ${platform.totalQuestionStats?.totalQuestionCounts || 0}`, 'yellow');
      });
    }
    
    return { success: true, directData, localData };
  } catch (error) {
    log(`❌ Codolio sync failed: ${error.message}`, 'red');
    return { success: false, error: error.message };
  }
}

async function syncAllData() {
  log('🚀 Starting comprehensive data sync...', 'bright');
  log('=' .repeat(60), 'cyan');
  
  const startTime = Date.now();
  
  // Sync all platforms
  const results = {
    github: await syncGitHub(),
    leetcode: await syncLeetCode(),
    codolio: await syncCodolio()
  };
  
  const endTime = Date.now();
  const duration = ((endTime - startTime) / 1000).toFixed(2);
  
  // Summary
  log('=' .repeat(60), 'cyan');
  log('📊 SYNC SUMMARY', 'bright');
  log('=' .repeat(60), 'cyan');
  
  Object.entries(results).forEach(([platform, result]) => {
    const status = result.success ? '✅ SUCCESS' : '❌ FAILED';
    const color = result.success ? 'green' : 'red';
    log(`${platform.toUpperCase()}: ${status}`, color);
  });
  
  const allSuccess = Object.values(results).every(r => r.success);
  log(`\n⏱️  Sync completed in ${duration}s`, 'cyan');
  log(`🎯 Overall Status: ${allSuccess ? 'ALL PLATFORMS SYNCED' : 'SOME SYNC FAILED'}`, allSuccess ? 'green' : 'yellow');
  
  if (allSuccess) {
    log('\n🎉 All data successfully synced! Your portfolio is up to date.', 'green');
  } else {
    log('\n⚠️  Some platforms failed to sync. Check the errors above.', 'yellow');
  }
  
  return results;
}

// Run the sync
syncAllData().catch(error => {
  log(`💥 Critical error during sync: ${error.message}`, 'red');
  process.exit(1);
});
