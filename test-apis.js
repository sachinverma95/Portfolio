// Test script to verify API integrations
const USERNAMES = {
  github: 'sangamsingh18',
  leetcode: 'sangamsingh18',
  codolio: 'sangamsingh18'
};

async function testGitHubAPI() {
  console.log('🔍 Testing GitHub API...');
  try {
    const response = await fetch(`https://api.github.com/users/${USERNAMES.github}`);
    const data = await response.json();
    console.log('✅ GitHub API Response:', {
      login: data.login,
      public_repos: data.public_repos,
      followers: data.followers,
      following: data.following
    });
    return true;
  } catch (error) {
    console.error('❌ GitHub API Error:', error.message);
    return false;
  }
}

async function testLeetCodeAPI() {
  console.log('🔍 Testing LeetCode API...');
  try {
    const response = await fetch(`https://leetcode-stats-api.herokuapp.com/${USERNAMES.leetcode}`);
    const data = await response.json();
    console.log('✅ LeetCode API Response:', {
      totalSolved: data.totalSolved,
      easySolved: data.easySolved,
      mediumSolved: data.mediumSolved,
      hardSolved: data.hardSolved,
      ranking: data.ranking
    });
    return true;
  } catch (error) {
    console.error('❌ LeetCode API Error:', error.message);
    return false;
  }
}

async function testCodolioAPI() {
  console.log('🔍 Testing Codolio API...');
  try {
    const response = await fetch(`https://api.codolio.com/profile?userKey=${USERNAMES.codolio}`);
    const data = await response.json();
    console.log('✅ Codolio API Response:', {
      success: data.success,
      hasData: !!data.payload?.data,
      platforms: data.payload?.data?.platformProfiles?.platformProfiles?.length || 0
    });
    return true;
  } catch (error) {
    console.error('❌ Codolio API Error:', error.message);
    return false;
  }
}

async function testLocalAPI() {
  console.log('🔍 Testing Local Codolio API...');
  try {
    const response = await fetch('http://localhost:8080/api/codolio');
    const data = await response.json();
    console.log('✅ Local API Response:', {
      success: data.success,
      hasData: !!data.payload?.data,
      platforms: data.payload?.data?.platformProfiles?.platformProfiles?.length || 0
    });
    return true;
  } catch (error) {
    console.error('❌ Local API Error:', error.message);
    return false;
  }
}

async function runAllTests() {
  console.log('🚀 Starting API Integration Tests...\n');
  
  const results = {
    github: await testGitHubAPI(),
    leetcode: await testLeetCodeAPI(),
    codolio: await testCodolioAPI(),
    localAPI: await testLocalAPI()
  };
  
  console.log('\n📊 Test Results Summary:');
  Object.entries(results).forEach(([api, success]) => {
    console.log(`${success ? '✅' : '❌'} ${api.toUpperCase()}: ${success ? 'PASS' : 'FAIL'}`);
  });
  
  const allPassed = Object.values(results).every(result => result);
  console.log(`\n${allPassed ? '🎉' : '⚠️'} Overall Status: ${allPassed ? 'ALL TESTS PASSED' : 'SOME TESTS FAILED'}`);
}

runAllTests();
