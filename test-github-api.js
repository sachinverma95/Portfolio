// Test GitHub API for sangamsingh18
async function testGitHubAPI() {
  console.log('🔍 Testing GitHub API for sangamsingh18...');
  
  try {
    // Test user profile
    const profileResponse = await fetch('https://api.github.com/users/sangamsingh18');
    const profile = await profileResponse.json();
    
    console.log('✅ Profile Response:', {
      login: profile.login,
      name: profile.name,
      public_repos: profile.public_repos,
      followers: profile.followers,
      following: profile.following
    });
    
    // Test repositories
    const reposResponse = await fetch('https://api.github.com/users/sangamsingh18/repos?per_page=10');
    const repos = await reposResponse.json();
    
    console.log(`✅ Found ${repos.length} repositories:`);
    repos.slice(0, 5).forEach((repo, index) => {
      console.log(`   ${index + 1}. ${repo.name}: ⭐ ${repo.stargazers_count} 🍴 ${repo.forks_count}`);
    });
    
    // Check if user exists and has data
    if (profile.login && profile.public_repos > 0) {
      console.log('\n🎉 GitHub API is working correctly!');
      console.log('✅ The frontend should display your data.');
      return true;
    } else {
      console.log('\n❌ GitHub API issue:');
      console.log('❌ User may not exist or has no public repos');
      return false;
    }
  } catch (error) {
    console.error('💥 GitHub API Error:', error.message);
    return false;
  }
}

testGitHubAPI();
