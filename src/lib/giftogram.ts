import axios from 'axios'

interface GiftogramConfig {
  apiKey: string
  campaignId: string
  organizationId?: string
}

interface SendGiftCardParams {
  email: string
  firstName: string
  lastName: string
  amount?: number
  message?: string
}

export class GiftogramClient {
  private apiKey: string
  private campaignId: string
  private baseUrl = 'https://api.giftogram.com/v1'
  
  constructor(config: GiftogramConfig) {
    this.apiKey = config.apiKey || process.env.GIFTOGRAM_API_KEY || ''
    this.campaignId = config.campaignId || process.env.GIFTOGRAM_CAMPAIGN_ID || ''
  }
  
  async sendGiftCard({
    email,
    firstName,
    lastName,
    amount = 50,
    message = "Thank you for sharing your testimonial with Postpartum Care USA!"
  }: SendGiftCardParams) {
    try {
      const response = await axios.post(
        `${this.baseUrl}/campaigns/${this.campaignId}/gifts`,
        {
          recipient: {
            email,
            first_name: firstName,
            last_name: lastName
          },
          amount: amount * 100, // Giftogram expects cents
          message,
          send_immediately: true
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json'
          }
        }
      )
      
      return {
        success: true,
        giftId: response.data.id,
        status: response.data.status,
        trackingUrl: response.data.tracking_url
      }
    } catch (error: any) {
      console.error('Giftogram API Error:', error.response?.data || error.message)
      
      // In development, return mock success
      if (process.env.NODE_ENV === 'development' && !this.apiKey) {
        console.log('Development mode: Simulating gift card send')
        return {
          success: true,
          giftId: `dev-gift-${Date.now()}`,
          status: 'sent',
          trackingUrl: 'https://example.com/track/dev-gift'
        }
      }
      
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to send gift card'
      }
    }
  }
  
  async checkGiftStatus(giftId: string) {
    try {
      const response = await axios.get(
        `${this.baseUrl}/gifts/${giftId}`,
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`
          }
        }
      )
      
      return {
        success: true,
        status: response.data.status,
        deliveredAt: response.data.delivered_at,
        redeemedAt: response.data.redeemed_at
      }
    } catch (error: any) {
      console.error('Giftogram API Error:', error.response?.data || error.message)
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to check gift status'
      }
    }
  }
}

// Export singleton instance
export const giftogram = new GiftogramClient({
  apiKey: process.env.GIFTOGRAM_API_KEY || '',
  campaignId: process.env.GIFTOGRAM_CAMPAIGN_ID || ''
})