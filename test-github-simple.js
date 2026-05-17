// Simple GitHub API test
async function testGitHub() {
  try {
    console.log('🔍 Testing GitHub API...');
    
    const response = await fetch('https://api.github.com/users/sangamsingh18');
    
    if (!response.ok) {
      console.log('❌ API Status:', response.status);
      console.log('❌ Response:', await response.text());
      return false;
    }
    
    const data = await response.json();
    console.log('✅ Response Status:', response.status);
    console.log('✅ Raw Response (first 500 chars):', JSON.stringify(data).slice(0, 500));
    
    return data;
  } catch (error) {
    console.error('💥 Error:', error.message);
    return null;
  }
}

testGitHub();
