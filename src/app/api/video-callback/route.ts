import { NextRequest, NextResponse } from "next/server"
import { giftogram } from "@/lib/giftogram"
import { googleSheets } from "@/lib/google-sheets"
import { emailService } from "@/lib/email"
import crypto from "crypto"

// Verify webhook signature from Vocal Video
function verifyWebhookSignature(payload: string, signature: string): boolean {
  const webhookSecret = process.env.VOCAL_VIDEO_WEBHOOK_SECRET
  if (!webhookSecret) {
    console.warn("No webhook secret configured, skipping verification")
    return true
  }
  
  const expectedSignature = crypto
    .createHmac('sha256', webhookSecret)
    .update(payload)
    .digest('hex')
  
  return signature === expectedSignature
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const signature = request.headers.get('x-vocal-video-signature') || ''
    
    // Verify webhook signature in production
    if (process.env.NODE_ENV === 'production') {
      const payload = JSON.stringify(body)
      if (!verifyWebhookSignature(payload, signature)) {
        return NextResponse.json(
          { error: "Invalid webhook signature" },
          { status: 401 }
        )
      }
    }
    
    // Extract video submission data from Vocal Video webhook
    // The actual field names may vary based on Vocal Video's webhook format
    const {
      respondent_email: email,
      respondent_first_name: firstName,
      respondent_last_name: lastName,
      video_url: videoUrl,
      transcript,
      submission_id: submissionId,
      form_id: formId
    } = body
    
    if (!email || !videoUrl) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }
    
    // Log the video submission
    console.log("Video testimonial received:", {
      email,
      firstName,
      lastName,
      videoUrl,
      transcript,
      submissionId,
      formId,
      receivedAt: new Date().toISOString()
    })
    
    // Send gift card via Giftogram
    const giftCardResponse = await giftogram.sendGiftCard({
      email,
      firstName: firstName || 'Valued',
      lastName: lastName || 'Customer',
      amount: 50,
      message: "Thank you for sharing your video testimonial with Postpartum Care USA!"
    })
    
    // Update Google Sheets with video data
    if (formId) {
      await googleSheets.updateTestimonial(formId, {
        videoSubmitted: true,
        videoUrl,
        videoTranscript: transcript,
        giftCardSent: giftCardResponse.success,
        giftCardId: giftCardResponse.giftId
      }).catch(console.error)
    }
    
    // Send notification email if gift card was sent
    if (giftCardResponse.success) {
      await emailService.sendTestimonialConfirmation(
        email,
        `${firstName || ''} ${lastName || ''}`.trim() || 'Valued Customer'
      )
    }
    
    return NextResponse.json({
      success: true,
      message: "Video testimonial processed successfully",
      giftCardSent: giftCardResponse.success,
      giftCardId: giftCardResponse.giftId
    })
    
  } catch (error) {
    console.error("Error processing video callback:", error)
    return NextResponse.json(
      { error: "Failed to process video callback" },
      { status: 500 }
    )
  }
}