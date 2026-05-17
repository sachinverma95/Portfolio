async function testHeatmap() {
  try {
    console.log('Testing Codolio heatmap data extraction...');
    
    const response = await fetch('https://api.codolio.com/profile?userKey=sangam_singh_');
    console.log('Response status:', response.status);
    
    if (!response.ok) {
      console.log('Response not OK:', response.statusText);
      return;
    }
    
    const result = await response.json();
    console.log('Success:', result.success);
    
    if (result.success && result.payload) {
      const platforms = result.payload.data?.platformProfiles?.platformProfiles;
      console.log('Found platforms:', platforms?.length || 0);
      
      if (platforms) {
        platforms.forEach((p, i) => {
          console.log(`\nPlatform ${i + 1}: ${p.platform}`);
          console.log(`- Handle: ${p.userStats?.handle}`);
          console.log(`- Total questions: ${p.totalQuestionStats?.totalQuestionCounts}`);
          
          const cal = p.dailyActivityStatsResponse?.submissionCalendar;
          if (cal && Object.keys(cal).length > 0) {
            console.log(`- Calendar entries: ${Object.keys(cal).length}`);
            console.log(`- Max streak: ${p.dailyActivityStatsResponse?.maxStreak}`);
            
            // Show sample data
            const entries = Object.entries(cal).slice(0, 3);
            entries.forEach(([timestamp, count]) => {
              const date = new Date(parseInt(timestamp) * 1000);
              console.log(`- ${date.toISOString().split('T')[0]}: ${count} submissions`);
            });
          } else {
            console.log('- No calendar data found');
          }
        });
      }
    } else {
      console.log('No payload data found');
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

testHeatmap();
