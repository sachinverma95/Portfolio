// Test Codolio API
async function testCodolioAPI() {
  try {
    console.log('🔍 Testing Codolio API for sangam_singh_...');
    
    const response = await fetch('https://api.codolio.com/profile?userKey=sangam_singh_');
    const data = await response.json();
    
    console.log('✅ Response Status:', response.status);
    console.log('✅ Response Data:', JSON.stringify(data, null, 2));
    
    if (data.success && data.payload?.data?.platformProfiles?.platformProfiles) {
      const platforms = data.payload.data.platformProfiles.platformProfiles;
      console.log(`📊 Found ${platforms.length} platforms:`);
      
      platforms.forEach(platform => {
        const stats = platform.userStats || {};
        const problems = platform.totalQuestionStats || {};
        
        console.log(`🎮 ${platform.platform}:`);
        console.log(`   Rating: ${stats.currentRating || 'N/A'}`);
        console.log(`   Problems: ${problems.totalQuestionCounts || 0}`);
        console.log(`   Username: ${platform.username || 'N/A'}`);
      });
    } else {
      console.log('❌ No platform data found');
      console.log('❌ Full response:', JSON.stringify(data, null, 2));
    }
  } catch (error) {
    console.error('💥 Error:', error.message);
  }
}

testCodolioAPI();
