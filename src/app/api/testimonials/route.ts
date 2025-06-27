import { NextRequest, NextResponse } from "next/server"
import { googleSheets } from "@/lib/google-sheets"
import { emailService } from "@/lib/email"

// Initialize Google Sheets on startup
googleSheets.initializeSheet().then(() => {
  console.log('Google Sheets initialized')
}).catch(console.error)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate required fields
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'testimonial', 'consent']
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        )
      }
    }
    
    // Create testimonial data
    const testimonialData = {
      id: `PPCU-${Date.now()}`,
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      phone: body.phone,
      testimonial: body.testimonial,
      consent: body.consent,
      submittedAt: new Date().toISOString(),
      videoSubmitted: false,
      giftCardSent: false
    }
    
    // Save to Google Sheets
    const result = await googleSheets.addTestimonial(testimonialData)
    
    if (!result.success) {
      console.error("Failed to save to Google Sheets:", result.error)
      // Continue anyway - we don't want to fail the submission
    }
    
    // Send confirmation email
    await emailService.sendTestimonialConfirmation(
      body.email,
      `${body.firstName} ${body.lastName}`
    ).catch(console.error)
    
    return NextResponse.json({
      success: true,
      testimonialId: testimonialData.id,
      message: "Thank you for your testimonial!"
    })
    
  } catch (error) {
    console.error("Error processing testimonial:", error)
    return NextResponse.json(
      { error: "Failed to process testimonial" },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    // For now, return empty array since we're using Google Sheets
    // The dashboard can read directly from the sheet
    return NextResponse.json({
      testimonials: [],
      total: 0,
      message: "Please view testimonials directly in Google Sheets"
    })
  } catch (error) {
    console.error("Error fetching testimonials:", error)
    return NextResponse.json({
      testimonials: [],
      total: 0,
      error: "Failed to fetch testimonials"
    })
  }
}