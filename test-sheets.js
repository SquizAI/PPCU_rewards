// Test Google Sheets connection
require('dotenv').config({ path: '.env.local' });

const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
const apiKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY;

console.log('Testing Google Sheets connection...');
console.log('Spreadsheet ID:', spreadsheetId);
console.log('Using API Key:', apiKey ? 'Yes' : 'No');

async function testSheets() {
  try {
    // Test 1: Try to get spreadsheet metadata
    console.log('\n1. Testing spreadsheet access...');
    const metadataUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}?key=${apiKey}`;
    const metadataResponse = await fetch(metadataUrl);
    const metadata = await metadataResponse.json();
    
    if (metadata.error) {
      console.error('❌ Error:', metadata.error.message);
      console.log('\nTo fix this:');
      console.log('1. Make sure the sheet is shared with "Anyone with the link"');
      console.log('2. Or create a service account (recommended for write access)');
      return;
    }
    
    console.log('✅ Connected to sheet:', metadata.properties?.title);
    
    // Test 2: Try to read data
    console.log('\n2. Testing data read...');
    const readUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/A1:N1?key=${apiKey}`;
    const readResponse = await fetch(readUrl);
    const readData = await readResponse.json();
    
    if (readData.error) {
      console.error('❌ Read Error:', readData.error.message);
    } else {
      console.log('✅ Can read data');
      console.log('Headers:', readData.values?.[0] || 'No headers found');
    }
    
    // Test 3: Check write access (will fail with API key only)
    console.log('\n3. Testing write access...');
    console.log('⚠️  Note: Writing requires a service account, not just an API key');
    
    console.log('\n📋 Summary:');
    console.log('- Sheet ID: ✅ Valid');
    console.log('- Read Access: ' + (readData.values ? '✅ Working' : '❌ Not working'));
    console.log('- Write Access: ❌ Requires service account');
    
    console.log('\n💡 Next Steps:');
    console.log('1. For read-only access: Share the sheet publicly');
    console.log('2. For write access: Set up a service account (see GOOGLE_SHEETS_SETUP.md)');
    
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
  }
}

testSheets();