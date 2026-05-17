async function testDSAStats() {
  try {
    console.log('Testing DSA stats aggregation...');
    
    const response = await fetch('https://api.codolio.com/profile?userKey=sangam_singh_');
    const result = await response.json();
    
    const platforms = result.data?.platformProfiles?.platformProfiles;
    
    if (platforms) {
      let totalEasy = 0;
      let totalMedium = 0;
      let totalHard = 0;
      
      platforms.forEach((p) => {
        console.log(`\n${p.platform}:`);
        console.log(`- Easy: ${p.totalQuestionStats?.easyQuestionCounts || 0}`);
        console.log(`- Medium: ${p.totalQuestionStats?.mediumQuestionCounts || 0}`);
        console.log(`- Hard: ${p.totalQuestionStats?.hardQuestionCounts || 0}`);
        
        totalEasy += p.totalQuestionStats?.easyQuestionCounts || 0;
        totalMedium += p.totalQuestionStats?.mediumQuestionCounts || 0;
        totalHard += p.totalQuestionStats?.hardQuestionCounts || 0;
      });
      
      const total = totalEasy + totalMedium + totalHard;
      
      console.log(`\nAggregated DSA Stats:`);
      console.log(`- Easy: ${totalEasy} (${((totalEasy/total)*100).toFixed(1)}%)`);
      console.log(`- Medium: ${totalMedium} (${((totalMedium/total)*100).toFixed(1)}%)`);
      console.log(`- Hard: ${totalHard} (${((totalHard/total)*100).toFixed(1)}%)`);
      console.log(`- Total: ${total}`);
      
      // Calculate stroke-dasharray values for SVG
      const circumference = 2 * Math.PI * 40; // r=40
      console.log(`\nSVG Values (circumference=${circumference.toFixed(2)}):`);
      console.log(`- Easy dasharray: ${(totalEasy/total)*circumference} ${circumference}`);
      console.log(`- Medium dasharray: ${(totalMedium/total)*circumference} ${circumference}`);
      console.log(`- Hard dasharray: ${(totalHard/total)*circumference} ${circumference}`);
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

testDSAStats();
