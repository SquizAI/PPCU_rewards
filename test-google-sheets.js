const { google } = require('googleapis');
require('dotenv').config({ path: '.env.local' });

async function testConnection() {
  console.log('Testing Google Sheets connection...\n');
  
  // Check environment variables
  console.log('Environment check:');
  console.log('- Client Email:', process.env.GOOGLE_SHEETS_CLIENT_EMAIL ? '✓ Found' : '✗ Missing');
  console.log('- Private Key:', process.env.GOOGLE_SHEETS_PRIVATE_KEY ? '✓ Found' : '✗ Missing');
  console.log('- Spreadsheet ID:', process.env.GOOGLE_SHEETS_SPREADSHEET_ID ? '✓ Found' : '✗ Missing');
  console.log('\n');

  if (!process.env.GOOGLE_SHEETS_CLIENT_EMAIL || !process.env.GOOGLE_SHEETS_PRIVATE_KEY) {
    console.error('❌ Missing required environment variables!');
    return;
  }

  try {
    // Create auth client
    const auth = new google.auth.JWT({
      email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
      key: process.env.GOOGLE_SHEETS_PRIVATE_KEY.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets']
    });

    // Create sheets client
    const sheets = google.sheets({ version: 'v4', auth });
    
    // Test read access
    console.log('Testing read access...');
    const response = await sheets.spreadsheets.get({
      spreadsheetId: process.env.GOOGLE_SHEETS_SPREADSHEET_ID
    });
    
    console.log('✅ Successfully connected to Google Sheets!');
    console.log(`- Sheet Title: ${response.data.properties.title}`);
    console.log(`- Sheet ID: ${response.data.spreadsheetId}`);
    console.log('\n');
    
    // Test write access
    console.log('Testing write access...');
    const testData = [['Test', new Date().toISOString(), 'Connection test']];
    
    try {
      await sheets.spreadsheets.values.append({
        spreadsheetId: process.env.GOOGLE_SHEETS_SPREADSHEET_ID,
        range: 'A:C',
        valueInputOption: 'RAW',
        requestBody: {
          values: testData
        }
      });
      console.log('✅ Write access confirmed!');
    } catch (writeError) {
      console.error('❌ Write access failed:', writeError.message);
      console.log('\n🔧 Fix: Share your Google Sheet with this email:');
      console.log(`   ${process.env.GOOGLE_SHEETS_CLIENT_EMAIL}`);
    }
    
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    if (error.message.includes('invalid_grant')) {
      console.log('\n🔧 Fix: Make sure the private key is correctly formatted in .env.local');
    }
  }
}

testConnection();