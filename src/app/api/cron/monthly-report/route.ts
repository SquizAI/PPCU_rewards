import { NextRequest, NextResponse } from "next/server"
import { googleSheets } from "@/lib/google-sheets"
import { emailService } from "@/lib/email"
import { format } from "date-fns"

// This endpoint should be called by a cron job service (e.g., Vercel Cron, GitHub Actions)
// It should be protected by a secret token in production
export async function GET(request: NextRequest) {
  try {
    // Verify cron secret
    const authHeader = request.headers.get('authorization')
    const cronSecret = process.env.CRON_SECRET
    
    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }
    
    // Get monthly stats from Google Sheets
    const statsResult = await googleSheets.getMonthlyStats()
    
    if (!statsResult.success) {
      throw new Error("Failed to get monthly stats")
    }
    
    const stats = statsResult.stats || { total: 0, withVideo: 0, totalSpent: 0 }
    const currentDate = new Date()
    const monthName = format(currentDate, 'MMMM')
    const year = currentDate.getFullYear()
    
    // Calculate conversion rate
    const conversionRate = stats.total > 0 
      ? Math.round((stats.withVideo / stats.total) * 100) 
      : 0
    
    // For demo purposes, we'll create sample top testimonials
    // In production, you would fetch these from your database
    const topTestimonials = [
      {
        name: "Sarah Johnson",
        excerpt: "The care I received was exceptional. The team made my recovery so much easier...",
        hasVideo: true
      },
      {
        name: "Emily Davis",
        excerpt: "I can't thank the team enough for their support during my postpartum journey...",
        hasVideo: false
      },
      {
        name: "Jessica Martinez",
        excerpt: "Professional, caring, and always available when I needed them most...",
        hasVideo: true
      }
    ]
    
    // Send monthly report email
    const emailResult = await emailService.sendMonthlyReport({
      month: monthName,
      year,
      totalTestimonials: stats.total,
      videoTestimonials: stats.withVideo,
      conversionRate,
      totalRewardsSpent: stats.totalSpent,
      topTestimonials
    })
    
    return NextResponse.json({
      success: true,
      message: "Monthly report sent successfully",
      stats: {
        month: monthName,
        year,
        ...stats,
        conversionRate
      },
      emailSent: emailResult.success
    })
    
  } catch (error) {
    console.error("Error generating monthly report:", error)
    return NextResponse.json(
      { error: "Failed to generate monthly report" },
      { status: 500 }
    )
  }
}