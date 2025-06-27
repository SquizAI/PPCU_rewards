import { google } from 'googleapis'
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

export class GoogleSheetsClient {
  private sheets: any
  private spreadsheetId: string
  
  constructor() {
    this.spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID || ''
    
    // Initialize Google Sheets client
    if (process.env.GOOGLE_SHEETS_PRIVATE_KEY && process.env.GOOGLE_SHEETS_CLIENT_EMAIL) {
      const auth = new google.auth.JWT({
        email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
        key: process.env.GOOGLE_SHEETS_PRIVATE_KEY.replace(/\\n/g, '\n'),
        scopes: ['https://www.googleapis.com/auth/spreadsheets']
      })
      
      this.sheets = google.sheets({ version: 'v4', auth })
    }
  }
  
  async initializeSheet() {
    if (!this.sheets || !this.spreadsheetId) {
      console.log('Google Sheets not configured, skipping initialization')
      return
    }
    
    try {
      // Check if headers exist
      const response = await this.sheets.spreadsheets.values.get({
        spreadsheetId: this.spreadsheetId,
        range: 'A1:N1'
      })
      
      if (!response.data.values || response.data.values.length === 0) {
        // Add headers
        await this.sheets.spreadsheets.values.update({
          spreadsheetId: this.spreadsheetId,
          range: 'A1:N1',
          valueInputOption: 'RAW',
          requestBody: {
            values: [[
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
            ]]
          }
        })
      }
    } catch (error) {
      console.error('Error initializing Google Sheet:', error)
    }
  }
  
  async addTestimonial(data: TestimonialData) {
    if (!this.sheets || !this.spreadsheetId) {
      console.log('Google Sheets not configured, skipping save')
      return { success: false, error: 'Google Sheets not configured' }
    }
    
    try {
      const row = [
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
      ]
      
      await this.sheets.spreadsheets.values.append({
        spreadsheetId: this.spreadsheetId,
        range: 'A:N',
        valueInputOption: 'RAW',
        insertDataOption: 'INSERT_ROWS',
        requestBody: {
          values: [row]
        }
      })
      
      return { success: true }
    } catch (error: any) {
      console.error('Error adding to Google Sheet:', error)
      return { success: false, error: error.message }
    }
  }
  
  async updateTestimonial(id: string, updates: Partial<TestimonialData>) {
    if (!this.sheets || !this.spreadsheetId) {
      console.log('Google Sheets not configured, skipping update')
      return { success: false, error: 'Google Sheets not configured' }
    }
    
    try {
      // First, find the row with this ID
      const response = await this.sheets.spreadsheets.values.get({
        spreadsheetId: this.spreadsheetId,
        range: 'A:A'
      })
      
      const rows = response.data.values || []
      const rowIndex = rows.findIndex((row: string[]) => row[0] === id)
      
      if (rowIndex === -1) {
        return { success: false, error: 'Testimonial not found' }
      }
      
      // Get current row data
      const currentRowResponse = await this.sheets.spreadsheets.values.get({
        spreadsheetId: this.spreadsheetId,
        range: `A${rowIndex + 1}:N${rowIndex + 1}`
      })
      
      const currentRow = currentRowResponse.data.values?.[0] || []
      
      // Update specific fields
      if (updates.videoSubmitted !== undefined) {
        currentRow[8] = updates.videoSubmitted ? 'Yes' : 'No'
      }
      if (updates.videoUrl) {
        currentRow[9] = updates.videoUrl
      }
      if (updates.videoTranscript) {
        currentRow[10] = updates.videoTranscript
      }
      if (updates.giftCardSent !== undefined) {
        currentRow[11] = updates.giftCardSent ? 'Yes' : 'No'
      }
      if (updates.giftCardId) {
        currentRow[12] = updates.giftCardId
        currentRow[13] = '$50'
      }
      
      // Update the row
      await this.sheets.spreadsheets.values.update({
        spreadsheetId: this.spreadsheetId,
        range: `A${rowIndex + 1}:N${rowIndex + 1}`,
        valueInputOption: 'RAW',
        requestBody: {
          values: [currentRow]
        }
      })
      
      return { success: true }
    } catch (error: any) {
      console.error('Error updating Google Sheet:', error)
      return { success: false, error: error.message }
    }
  }
  
  async getMonthlyStats() {
    if (!this.sheets || !this.spreadsheetId) {
      return { success: false, error: 'Google Sheets not configured' }
    }
    
    try {
      const response = await this.sheets.spreadsheets.values.get({
        spreadsheetId: this.spreadsheetId,
        range: 'A:N'
      })
      
      const rows = response.data.values || []
      if (rows.length <= 1) {
        return { success: true, stats: { total: 0, withVideo: 0, totalSpent: 0 } }
      }
      
      // Skip header row
      const dataRows = rows.slice(1)
      const currentMonth = new Date().getMonth()
      const currentYear = new Date().getFullYear()
      
      const monthlyData = dataRows.filter((row: string[]) => {
        const date = new Date(row[1])
        return date.getMonth() === currentMonth && date.getFullYear() === currentYear
      })
      
      const stats = {
        total: monthlyData.length,
        withVideo: monthlyData.filter((row: string[]) => row[8] === 'Yes').length,
        totalSpent: monthlyData.filter((row: string[]) => row[11] === 'Yes').length * 50
      }
      
      return { success: true, stats }
    } catch (error: any) {
      console.error('Error getting monthly stats:', error)
      return { success: false, error: error.message }
    }
  }
}

// Export singleton instance
export const googleSheets = new GoogleSheetsClient()