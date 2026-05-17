async function testHeatmap() {
  try {
    console.log('Testing updated Codolio heatmap parsing...');
    
    const response = await fetch('https://api.codolio.com/profile?userKey=sangam_singh_');
    const result = await response.json();
    
    const platforms = result.data?.platformProfiles?.platformProfiles;
    console.log('Found platforms:', platforms?.length || 0);
    
    if (platforms) {
      let totalCalendarEntries = 0;
      let maxStreak = 0;
      let totalSubmissions = 0;
      
      platforms.forEach((p, i) => {
        console.log(`\nPlatform ${i + 1}: ${p.platform}`);
        console.log(`- Handle: ${p.userStats?.handle}`);
        console.log(`- Total questions: ${p.totalQuestionStats?.totalQuestionCounts}`);
        
        const cal = p.dailyActivityStatsResponse?.submissionCalendar;
        if (cal && Object.keys(cal).length > 0) {
          const entries = Object.keys(cal).length;
          totalCalendarEntries += entries;
          maxStreak = Math.max(maxStreak, p.dailyActivityStatsResponse?.maxStreak || 0);
          totalSubmissions += p.totalQuestionStats?.totalQuestionCounts || 0;
          
          console.log(`- Calendar entries: ${entries}`);
          console.log(`- Max streak: ${p.dailyActivityStatsResponse?.maxStreak}`);
          
          // Show sample data
          const sampleEntries = Object.entries(cal).slice(0, 3);
          sampleEntries.forEach(([timestamp, count]) => {
            const date = new Date(parseInt(timestamp) * 1000);
            console.log(`- ${date.toISOString().split('T')[0]}: ${count} submissions`);
          });
        } else {
          console.log('- No calendar data found');
        }
      });
      
      console.log(`\nSummary:`);
      console.log(`- Total calendar entries: ${totalCalendarEntries}`);
      console.log(`- Overall max streak: ${maxStreak}`);
      console.log(`- Total submissions: ${totalSubmissions}`);
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

testHeatmap();
