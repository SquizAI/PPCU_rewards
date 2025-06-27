import { format } from 'date-fns'

interface TestimonialData {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  testimonial: string
  submittedAt: string
  videoSubmitted: boolean
  videoUrl?: string
  videoTranscript?: string
  giftCardSent: boolean
  giftCardId?: string
  consent: boolean
}

export class SimpleGoogleSheetsClient {
  private spreadsheetId: string
  private apiKey: string
  private baseUrl = 'https://sheets.googleapis.com/v4/spreadsheets'
  
  constructor() {
    this.spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID || ''
    this.apiKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY || ''
  }
  
  async testConnection() {
    if (!this.spreadsheetId || !this.apiKey) {
      return { success: false, error: 'Missing Google Sheets configuration' }
    }
    
    try {
      const response = await fetch(
        `${this.baseUrl}/${this.spreadsheetId}?key=${this.apiKey}`
      )
      
      if (!response.ok) {
        const error = await response.json()
        return { 
          success: false, 
          error: error.error?.message || 'Failed to connect to Google Sheets',
          details: error
        }
      }
      
      const data = await response.json()
      return { 
        success: true, 
        sheetTitle: data.properties?.title,
        sheets: data.sheets?.map((s: any) => s.properties?.title)
      }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }
  
  async appendTestimonial(data: TestimonialData) {
    if (!this.spreadsheetId || !this.apiKey) {
      console.log('Google Sheets not configured')
      return { success: false, error: 'Not configured' }
    }
    
    const values = [[
      data.id,
      format(new Date(data.submittedAt), 'yyyy-MM-dd HH:mm:ss'),
      data.firstName,
      data.lastName,
      data.email,
      data.phone,
      data.testimonial,
      data.consent ? 'Yes' : 'No',
      data.videoSubmitted ? 'Yes' : 'No',
      data.videoUrl || '',
      data.videoTranscript || '',
      data.giftCardSent ? 'Yes' : 'No',
      data.giftCardId || '',
      data.videoSubmitted && data.giftCardSent ? '$50' : ''
    ]]
    
    try {
      // Note: With just an API key, we can only READ from public sheets
      // To WRITE, we need either:
      // 1. OAuth2 authentication (user login)
      // 2. Service account credentials
      // 3. Use Google Forms as a workaround
      
      console.log('Note: Writing to Google Sheets requires proper authentication.')
      console.log('Data that would be written:', values[0])
      
      return { 
        success: false, 
        error: 'Writing requires service account. See GOOGLE_SHEETS_SETUP.md',
        data: values[0]
      }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }
}

// Export singleton instance
export const simpleGoogleSheets = new SimpleGoogleSheetsClient()