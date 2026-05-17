// Test different Codolio usernames to find the correct one
const possibleUsernames = [
  "sangam_singh_",
  "sangamsingh18", 
  "sangam_singh",
  "sangamsingh_",
  "sangam-singh"
];

async function testUsername(username) {
  console.log(`\n🔍 Testing username: ${username}`);
  try {
    const response = await fetch(`https://api.codolio.com/profile?userKey=${username}`);
    const data = await response.json();
    
    if (data.success && data.payload?.data?.platformProfiles?.platformProfiles) {
      const platforms = data.payload.data.platformProfiles.platformProfiles;
      const totalProblems = platforms.reduce((sum, p) => {
        return sum + (p.totalQuestionStats?.totalQuestionCounts || 0);
      }, 0);
      
      console.log(`✅ Success! Found ${platforms.length} platforms with ${totalProblems} total problems`);
      
      platforms.forEach(platform => {
        const stats = platform.userStats || {};
        const problems = platform.totalQuestionStats || {};
        console.log(`   📊 ${platform.platform}: Rating=${stats.currentRating || 'N/A'}, Problems=${problems.totalQuestionCounts || 0}`);
      });
      
      return true;
    } else {
      console.log(`❌ Failed: ${data.success ? 'No platform data' : 'API error'}`);
      return false;
    }
  } catch (error) {
    console.error(`💥 Error: ${error.message}`);
    return false;
  }
}

async function testAllUsernames() {
  console.log('🚀 Testing all possible usernames...\n');
  
  for (const username of possibleUsernames) {
    const success = await testUsername(username);
    if (success) {
      console.log(`\n🎉 FOUND CORRECT USERNAME: ${username}\n`);
      return username;
    }
  }
  
  console.log('\n❌ No working username found. You may need to:');
  console.log('1. Check your exact Codolio username');
  console.log('2. Make sure your LeetCode is connected to Codolio');
  console.log('3. Create a Codolio account if you don\'t have one');
  
  return null;
}

testAllUsernames();
