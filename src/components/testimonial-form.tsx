"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Loader2, Video, CheckCircle } from "lucide-react"

const formSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  testimonial: z.string().min(20, "Please share more about your experience"),
  consent: z.boolean().refine((val) => val === true, {
    message: "You must consent to share your testimonial"
  })
})

type FormData = z.infer<typeof formSchema>

export function TestimonialForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isVideoStep, setIsVideoStep] = useState(false)
  const [formData, setFormData] = useState<FormData | null>(null)
  const { toast } = useToast()
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FormData>({
    resolver: zodResolver(formSchema)
  })

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    setFormData(data)
    
    try {
      // Submit initial form data
      const response = await fetch("/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      })

      if (!response.ok) throw new Error("Failed to submit testimonial")
      
      const result = await response.json()
      
      // Show success and transition to video step
      toast({
        title: "Thank you for your feedback!",
        description: "Would you like to record a video testimonial?",
      })
      
      setIsVideoStep(true)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit your testimonial. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleVideoRecord = () => {
    if (!formData) return
    
    // Build UTM parameters for Vocal Video
    const utm = new URLSearchParams({
      utm_source: "ppcu_testimonial",
      utm_medium: "form",
      utm_campaign: "patient_feedback",
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      form_id: Date.now().toString()
    })
    
    // Get collector ID from environment variable
    const collectorId = process.env.NEXT_PUBLIC_VOCAL_VIDEO_COLLECTOR_ID || 'YOUR_COLLECTOR_ID'
    
    // Redirect to Vocal Video with UTM parameters
    window.location.href = `https://app.vocalvideo.com/collector/${collectorId}?${utm.toString()}`
  }

  const handleSkipVideo = () => {
    toast({
      title: "Thank you!",
      description: "Your feedback has been recorded. Check your email for your gift card!",
    })
    reset()
    setIsVideoStep(false)
    setFormData(null)
  }

  if (isVideoStep) {
    return (
      <div className="w-full">
        <Card className="w-full max-w-2xl mx-auto bg-white shadow-xl">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-gradient-primary flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-white" />
            </div>
            <CardTitle className="text-3xl font-bold text-gradient">Thank You!</CardTitle>
            <CardDescription className="text-lg mt-2">
              Your written testimonial has been submitted successfully.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-gradient-to-r from-[#FAA682]/10 to-[#9EC9BA]/10 rounded-2xl p-6 text-center">
              <Video className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">Share a Video Testimonial</h3>
              <p className="text-muted-foreground mb-6">
                Help other patients by sharing your experience in a brief video (2-3 minutes).
                As a thank you, you'll receive a $50 gift card!
              </p>
              <div className="flex gap-4 justify-center">
                <Button
                  onClick={handleVideoRecord}
                  size="lg"
                  className="min-w-[150px]"
                >
                  Record Video
                </Button>
                <Button
                  onClick={handleSkipVideo}
                  variant="outline"
                  size="lg"
                >
                  Maybe Later
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="w-full">
      <Card className="w-full max-w-2xl mx-auto bg-white shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-gradient">Share Your Experience</CardTitle>
          <CardDescription className="text-lg mt-2">
            Your feedback helps us improve and helps other mothers in their postpartum journey
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  placeholder="Jane"
                  {...register("firstName")}
                  className={errors.firstName ? "border-destructive" : ""}
                />
                {errors.firstName && (
                  <p className="text-sm text-destructive">{errors.firstName.message}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  placeholder="Doe"
                  {...register("lastName")}
                  className={errors.lastName ? "border-destructive" : ""}
                />
                {errors.lastName && (
                  <p className="text-sm text-destructive">{errors.lastName.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="jane@example.com"
                  {...register("email")}
                  className={errors.email ? "border-destructive" : ""}
                />
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email.message}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="(555) 123-4567"
                  {...register("phone")}
                  className={errors.phone ? "border-destructive" : ""}
                />
                {errors.phone && (
                  <p className="text-sm text-destructive">{errors.phone.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="testimonial">Your Experience</Label>
              <Textarea
                id="testimonial"
                placeholder="Please share your experience with our postpartum care services..."
                rows={6}
                {...register("testimonial")}
                className={errors.testimonial ? "border-destructive" : ""}
              />
              {errors.testimonial && (
                <p className="text-sm text-destructive">{errors.testimonial.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="consent"
                  {...register("consent")}
                  className="mt-1 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <Label htmlFor="consent" className="text-sm font-normal leading-relaxed">
                  I consent to Postpartum Care USA using my testimonial for marketing purposes. 
                  I understand my testimonial may be shared on the website, social media, and other marketing materials.
                </Label>
              </div>
              {errors.consent && (
                <p className="text-sm text-destructive">{errors.consent.message}</p>
              )}
            </div>

            <Button 
              type="submit" 
              size="lg" 
              className="w-full" 
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Testimonial"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}