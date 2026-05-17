// Check local API response
async function checkLocalAPI() {
  try {
    console.log('🔍 Checking local API at http://localhost:8080/api/codolio...');
    const response = await fetch('http://localhost:8080/api/codolio');
    const data = await response.json();
    
    console.log('✅ Local API Response:', JSON.stringify(data, null, 2));
    
    if (data.success && data.payload?.data?.platformProfiles?.platformProfiles) {
      const platforms = data.payload.data.platformProfiles.platformProfiles;
      console.log(`\n📊 Found ${platforms.length} platforms:`);
      
      platforms.forEach(platform => {
        console.log(`🎮 ${platform.platform}:`);
        console.log(`   Rating: ${platform.userStats?.currentRating || 'N/A'}`);
        console.log(`   Problems: ${platform.totalQuestionStats?.totalQuestionCounts || 0}`);
        console.log(`   Username: ${platform.username || 'N/A'}`);
        console.log('');
      });
    } else {
      console.log('❌ No platform data found');
    }
  } catch (error) {
    console.error('❌ Error checking local API:', error.message);
  }
}

checkLocalAPI();
