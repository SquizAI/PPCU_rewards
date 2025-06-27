import { NextResponse } from "next/server"
import { simpleGoogleSheets } from "@/lib/google-sheets-simple"
import { googleSheets } from "@/lib/google-sheets"

export async function GET() {
  try {
    // Check environment variables
    const config = {
      hasSpreadsheetId: !!process.env.GOOGLE_SHEETS_SPREADSHEET_ID,
      hasApiKey: !!process.env.GOOGLE_SHEETS_PRIVATE_KEY,
      hasClientEmail: !!process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
      spreadsheetId: process.env.GOOGLE_SHEETS_SPREADSHEET_ID,
    }
    
    // Test simple connection (read-only with API key)
    const simpleResult = await simpleGoogleSheets.testConnection()
    
    // Test if we can initialize with service account
    let serviceAccountStatus = "Not configured"
    if (config.hasClientEmail && config.hasApiKey) {
      try {
        await googleSheets.initializeSheet()
        serviceAccountStatus = "Service account configured"
      } catch (error: any) {
        serviceAccountStatus = `Error: ${error.message}`
      }
    }
    
    return NextResponse.json({
      config,
      apiKeyConnection: simpleResult,
      serviceAccountStatus,
      instructions: !config.hasClientEmail ? 
        "To enable writing to sheets, follow SERVICE_ACCOUNT_SETUP.md" : 
        "Service account detected. Make sure the sheet is shared with the service account email."
    })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}