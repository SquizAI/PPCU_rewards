import { TestimonialForm } from "@/components/testimonial-form"
import { Heart, Star, Shield } from "lucide-react"
import Image from "next/image"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Background decoration with PPCU colors */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#FAA682] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#9EC9BA] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#E56157] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000" />
      </div>

      <div className="relative">
        {/* Header */}
        <header className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center">
            <Image
              src="/ppcu-logo.png"
              alt="Postpartum Care USA"
              width={250}
              height={80}
              priority
              className="h-auto"
            />
          </div>
        </header>

        {/* Hero Section */}
        <section className="container mx-auto px-4 py-12 text-center max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
            Your Journey Matters to Us
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Help other mothers by sharing your postpartum care experience. 
            Your story can make a difference in someone else's journey.
          </p>
          
          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-8 mb-12">
            <div className="flex items-center space-x-2 text-muted-foreground">
              <Shield className="h-5 w-5 text-[#FAA682]" />
              <span className="text-sm font-medium">HIPAA Compliant</span>
            </div>
            <div className="flex items-center space-x-2 text-muted-foreground">
              <Star className="h-5 w-5 text-[#FAA682] fill-current" />
              <span className="text-sm font-medium">4.9/5 Patient Rating</span>
            </div>
            <div className="flex items-center space-x-2 text-muted-foreground">
              <Heart className="h-5 w-5 text-[#FAA682] fill-current" />
              <span className="text-sm font-medium">1000+ Mothers Helped</span>
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section className="container mx-auto px-4 pb-20">
          <TestimonialForm />
        </section>

        {/* Benefits Section */}
        <section className="container mx-auto px-4 py-16 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-primary flex items-center justify-center">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Make a Difference</h3>
              <p className="text-muted-foreground">
                Your experience helps other mothers navigate their postpartum journey with confidence.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-primary flex items-center justify-center">
                <Star className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Get Rewarded</h3>
              <p className="text-muted-foreground">
                Receive a $50 gift card as our thank you for sharing a video testimonial.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-primary flex items-center justify-center">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Safe & Secure</h3>
              <p className="text-muted-foreground">
                Your information is protected with HIPAA-compliant security measures.
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="container mx-auto px-4 py-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2025 Postpartum Care USA. All rights reserved.</p>
        </footer>
      </div>
    </div>
  )
}