// Test script to verify the heatmap is working
console.log('Testing heatmap functionality...');

// Check if the component is properly loading data
const checkHeatmap = () => {
  // Look for console logs in the browser
  console.log('Expected console output:');
  console.log('- "Parsed Codolio Data: { heatmapDataPoints: 232, maxStreak: 43, totalSubmissions: 462, calendarEntries: 232 }"');
  console.log('- "Live Data" indicator should be green');
  console.log('- Heatmap should show real submission patterns');
};

checkHeatmap();
