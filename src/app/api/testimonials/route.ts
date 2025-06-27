import { NextRequest, NextResponse } from "next/server"
import { googleSheets } from "@/lib/google-sheets"
import { simpleGoogleSheets } from "@/lib/google-sheets-simple"
import { emailService } from "@/lib/email"
import { testimonialService } from "@/lib/supabase"

// Initialize Google Sheets on startup
googleSheets.initializeSheet().catch(console.error)

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
    
    // Create testimonial record
    const testimonialData = {
      first_name: body.firstName,
      last_name: body.lastName,
      email: body.email,
      phone: body.phone,
      testimonial: body.testimonial,
      consent: body.consent,
      submitted_at: new Date().toISOString(),
      video_submitted: false,
      gift_card_sent: false
    }
    
    // Store in Supabase
    let testimonial
    try {
      testimonial = await testimonialService.create(testimonialData)
    } catch (dbError) {
      console.error("Supabase error:", dbError)
      // Fallback: continue without database
      testimonial = { id: Date.now().toString(), ...testimonialData }
    }
    
    // Save to Google Sheets (optional backup)
    await googleSheets.addTestimonial({
      id: testimonial.id,
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      phone: body.phone,
      testimonial: body.testimonial,
      consent: body.consent,
      submittedAt: testimonial.submitted_at,
      videoSubmitted: false,
      giftCardSent: false
    }).catch(console.error)
    
    // Send confirmation email
    await emailService.sendTestimonialConfirmation(
      body.email,
      `${body.firstName} ${body.lastName}`
    ).catch(console.error)
    
    return NextResponse.json({
      success: true,
      testimonialId: testimonial.id,
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

export async function GET(request: NextRequest) {
  try {
    // Get testimonials from Supabase
    const testimonials = await testimonialService.getAll()
    
    // Transform data for dashboard compatibility
    const transformedTestimonials = testimonials.map(t => ({
      id: t.id,
      firstName: t.first_name,
      lastName: t.last_name,
      email: t.email,
      phone: t.phone,
      testimonial: t.testimonial,
      consent: t.consent,
      submittedAt: t.submitted_at,
      videoSubmitted: t.video_submitted,
      videoUrl: t.video_url,
      giftCardSent: t.gift_card_sent,
      giftCardId: t.gift_card_id
    }))
    
    return NextResponse.json({
      testimonials: transformedTestimonials,
      total: testimonials.length
    })
  } catch (error) {
    console.error("Error fetching testimonials:", error)
    // Fallback to empty array
    return NextResponse.json({
      testimonials: [],
      total: 0
    })
  }
}