import fetch from 'node-fetch';

async function testHeatmap() {
  try {
    console.log('Testing Codolio heatmap data extraction...');
    
    const response = await fetch('https://api.codolio.com/profile?userKey=sangam_singh_');
    const result = await response.json();
    
    if (result.success && result.payload) {
      const platforms = result.payload.data?.platformProfiles?.platformProfiles;
      console.log('Found platforms:', platforms?.map(p => p.platform));
      
      platforms.forEach((p, i) => {
        const cal = p.dailyActivityStatsResponse?.submissionCalendar;
        if (cal && Object.keys(cal).length > 0) {
          console.log(`\nPlatform ${i + 1} (${p.platform}):`);
          console.log(`- Calendar entries: ${Object.keys(cal).length}`);
          console.log(`- Max streak: ${p.dailyActivityStatsResponse?.maxStreak}`);
          console.log(`- Total questions: ${p.totalQuestionStats?.totalQuestionCounts}`);
          
          // Show sample data
          const entries = Object.entries(cal).slice(0, 3);
          entries.forEach(([timestamp, count]) => {
            const date = new Date(parseInt(timestamp) * 1000);
            console.log(`- ${date.toISOString().split('T')[0]}: ${count} submissions`);
          });
        }
      });
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

testHeatmap();
