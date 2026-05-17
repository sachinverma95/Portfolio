async function testHeatmap() {
  try {
    console.log('Testing Codolio heatmap data extraction...');
    
    const response = await fetch('https://api.codolio.com/profile?userKey=sangam_singh_');
    console.log('Response status:', response.status);
    
    const result = await response.json();
    console.log('Full response keys:', Object.keys(result));
    console.log('Response structure:', JSON.stringify(result, null, 2).substring(0, 1000) + '...');
    
  } catch (error) {
    console.error('Error:', error.message);
  }
}

testHeatmap();
