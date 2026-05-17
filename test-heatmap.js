const { CodolioApiService } = require('./src/lib/codolioApi.ts');

async function testHeatmap() {
  try {
    console.log('Testing Codolio heatmap data extraction...');
    const data = await CodolioApiService.fetchAllPlatformData();
    
    // Find platform with submission calendar
    const platforms = data.allPlatforms;
    console.log('Found platforms:', platforms.map(p => p.platform));
    
    platforms.forEach((p, i) => {
      const cal = p.dailyActivityStatsResponse?.submissionCalendar;
      if (cal && Object.keys(cal).length > 0) {
        console.log(`Platform ${i + 1} (${p.platform}): ${Object.keys(cal).length} calendar entries`);
        console.log('Sample timestamps:', Object.keys(cal).slice(0, 5));
        console.log('Sample counts:', Object.values(cal).slice(0, 5));
        
        // Test date conversion
        const sampleTimestamp = Object.keys(cal)[0];
        const date = new Date(parseInt(sampleTimestamp) * 1000);
        console.log('Sample date:', date.toISOString().split('T')[0]);
      }
    });
  } catch (error) {
    console.error('Error:', error.message);
  }
}

testHeatmap();
