const { google } = require('googleapis');
require('dotenv').config({ path: '.env.local' });

async function initializeSheet() {
  console.log('Initializing Google Sheet with headers and formatting...\n');

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
    const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;

    // Clear existing content
    console.log('Clearing existing content...');
    await sheets.spreadsheets.values.clear({
      spreadsheetId,
      range: 'A:Z'
    });

    // Add headers
    const headers = [[
      'ID',
      'Submitted At',
      'First Name',
      'Last Name',
      'Email',
      'Phone',
      'Written Testimonial',
      'Consent Given',
      'Video Submitted',
      'Video URL',
      'Video Transcript',
      'Gift Card Sent',
      'Gift Card ID',
      'Gift Card Amount'
    ]];

    console.log('Adding headers...');
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: 'A1:N1',
      valueInputOption: 'RAW',
      requestBody: {
        values: headers
      }
    });

    // Format the header row
    console.log('Formatting headers...');
    const requests = [{
      repeatCell: {
        range: {
          sheetId: 0,
          startRowIndex: 0,
          endRowIndex: 1
        },
        cell: {
          userEnteredFormat: {
            backgroundColor: {
              red: 0.98,
              green: 0.65,
              blue: 0.51
            },
            textFormat: {
              bold: true,
              fontSize: 12,
              foregroundColor: {
                red: 1,
                green: 1,
                blue: 1
              }
            },
            horizontalAlignment: 'CENTER',
            verticalAlignment: 'MIDDLE'
          }
        },
        fields: 'userEnteredFormat(backgroundColor,textFormat,horizontalAlignment,verticalAlignment)'
      }
    }, {
      // Auto-resize columns
      autoResizeDimensions: {
        dimensions: {
          sheetId: 0,
          dimension: 'COLUMNS',
          startIndex: 0,
          endIndex: 14
        }
      }
    }, {
      // Freeze header row
      updateSheetProperties: {
        properties: {
          sheetId: 0,
          gridProperties: {
            frozenRowCount: 1
          }
        },
        fields: 'gridProperties.frozenRowCount'
      }
    }, {
      // Set column widths
      updateDimensionProperties: {
        range: {
          sheetId: 0,
          dimension: 'COLUMNS',
          startIndex: 6,
          endIndex: 7
        },
        properties: {
          pixelSize: 400
        },
        fields: 'pixelSize'
      }
    }];

    await sheets.spreadsheets.batchUpdate({
      spreadsheetId,
      requestBody: {
        requests
      }
    });

    // Add a sample testimonial
    console.log('Adding sample testimonial...');
    const sampleData = [[
      'SAMPLE-001',
      new Date().toISOString(),
      'Jane',
      'Doe',
      'jane.doe@example.com',
      '(555) 123-4567',
      'The care I received from Postpartum Care USA was exceptional. The team was incredibly supportive during a challenging time, and I felt truly heard and cared for.',
      'Yes',
      'No',
      '',
      '',
      'No',
      '',
      ''
    ]];

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'A:N',
      valueInputOption: 'RAW',
      insertDataOption: 'INSERT_ROWS',
      requestBody: {
        values: sampleData
      }
    });

    console.log('\n✅ Google Sheet initialized successfully!');
    console.log(`View your sheet: https://docs.google.com/spreadsheets/d/${spreadsheetId}/`);

  } catch (error) {
    console.error('❌ Error initializing sheet:', error.message);
  }
}

initializeSheet();