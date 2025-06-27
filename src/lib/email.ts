import nodemailer from 'nodemailer'
import { format } from 'date-fns'

interface EmailConfig {
  host?: string
  port?: number
  user?: string
  pass?: string
  from?: string
}

interface MonthlyReportData {
  month: string
  year: number
  totalTestimonials: number
  videoTestimonials: number
  conversionRate: number
  totalRewardsSpent: number
  topTestimonials: Array<{
    name: string
    excerpt: string
    hasVideo: boolean
  }>
}

export class EmailService {
  private transporter: nodemailer.Transporter | null = null
  
  constructor(config?: EmailConfig) {
    const emailConfig = {
      host: config?.host || process.env.SMTP_HOST || 'smtp.gmail.com',
      port: config?.port || parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: config?.user || process.env.SMTP_USER,
        pass: config?.pass || process.env.SMTP_PASS
      }
    }
    
    if (emailConfig.auth.user && emailConfig.auth.pass) {
      this.transporter = nodemailer.createTransport(emailConfig)
    }
  }
  
  async sendMonthlyReport(reportData: MonthlyReportData) {
    if (!this.transporter) {
      console.log('Email service not configured, skipping report')
      return { success: false, error: 'Email service not configured' }
    }
    
    const ownerEmail = process.env.OWNER_EMAIL || 'owner@postpartumcareusa.com'
    const fromEmail = process.env.SMTP_USER || 'noreply@postpartumcareusa.com'
    
    const html = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 10px; text-align: center; }
    .stats-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin: 30px 0; }
    .stat-card { background: #f8f9fa; padding: 20px; border-radius: 8px; text-align: center; }
    .stat-number { font-size: 36px; font-weight: bold; color: #667eea; }
    .stat-label { color: #666; margin-top: 5px; }
    .testimonial { background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 15px 0; }
    .testimonial-header { font-weight: bold; margin-bottom: 10px; }
    .video-badge { background: #667eea; color: white; padding: 2px 8px; border-radius: 4px; font-size: 12px; margin-left: 10px; }
    .footer { text-align: center; margin-top: 40px; color: #666; font-size: 14px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Monthly Testimonial Report</h1>
      <p>${reportData.month} ${reportData.year}</p>
    </div>
    
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-number">${reportData.totalTestimonials}</div>
        <div class="stat-label">Total Testimonials</div>
      </div>
      <div class="stat-card">
        <div class="stat-number">${reportData.videoTestimonials}</div>
        <div class="stat-label">Video Testimonials</div>
      </div>
      <div class="stat-card">
        <div class="stat-number">${reportData.conversionRate}%</div>
        <div class="stat-label">Video Conversion Rate</div>
      </div>
      <div class="stat-card">
        <div class="stat-number">$${reportData.totalRewardsSpent}</div>
        <div class="stat-label">Rewards Distributed</div>
      </div>
    </div>
    
    <h2>Top Testimonials This Month</h2>
    ${reportData.topTestimonials.map(testimonial => `
      <div class="testimonial">
        <div class="testimonial-header">
          ${testimonial.name}
          ${testimonial.hasVideo ? '<span class="video-badge">VIDEO</span>' : ''}
        </div>
        <p>${testimonial.excerpt}</p>
      </div>
    `).join('')}
    
    <div class="footer">
      <p>This is an automated report from your Testimonial Collection System.</p>
      <p>Access your dashboard at: <a href="${process.env.NEXT_PUBLIC_APP_URL || 'https://testimonials.postpartumcareusa.com'}/dashboard">View Dashboard</a></p>
    </div>
  </div>
</body>
</html>
    `
    
    try {
      await this.transporter.sendMail({
        from: fromEmail,
        to: ownerEmail,
        subject: `Testimonial Report - ${reportData.month} ${reportData.year}`,
        html
      })
      
      return { success: true }
    } catch (error: any) {
      console.error('Error sending email:', error)
      return { success: false, error: error.message }
    }
  }
  
  async sendTestimonialConfirmation(email: string, name: string) {
    if (!this.transporter) {
      console.log('Email service not configured, skipping confirmation')
      return { success: false, error: 'Email service not configured' }
    }
    
    const fromEmail = process.env.SMTP_USER || 'noreply@postpartumcareusa.com'
    
    const html = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 10px; text-align: center; }
    .content { padding: 30px 0; }
    .button { display: inline-block; background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
    .footer { text-align: center; margin-top: 40px; color: #666; font-size: 14px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Thank You, ${name}!</h1>
      <p>We've received your testimonial</p>
    </div>
    
    <div class="content">
      <p>Thank you for taking the time to share your experience with Postpartum Care USA. Your feedback is invaluable in helping us improve our services and support other mothers in their postpartum journey.</p>
      
      <h2>What's Next?</h2>
      <p>If you recorded a video testimonial, you'll receive a $50 gift card via email within the next 24 hours as our thank you.</p>
      
      <p>Your testimonial may be featured on our website and marketing materials to help other mothers learn about our services.</p>
      
      <p>If you have any questions or concerns, please don't hesitate to reach out to us.</p>
    </div>
    
    <div class="footer">
      <p>With gratitude,<br>The Postpartum Care USA Team</p>
      <p style="font-size: 12px;">This email was sent to ${email} because you submitted a testimonial on our website.</p>
    </div>
  </div>
</body>
</html>
    `
    
    try {
      await this.transporter.sendMail({
        from: fromEmail,
        to: email,
        subject: 'Thank you for your testimonial - Postpartum Care USA',
        html
      })
      
      return { success: true }
    } catch (error: any) {
      console.error('Error sending confirmation email:', error)
      return { success: false, error: error.message }
    }
  }
}

// Export singleton instance
export const emailService = new EmailService()