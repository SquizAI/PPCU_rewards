import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-12">
        <header className="flex justify-center mb-12">
          <Image 
            src="/ppcu-logo.png" 
            alt="Postpartum Care USA Logo" 
            width={200} 
            height={80}
            priority
          />
        </header>
        
        <main>
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-blue-900 mb-6">
              Share Your Postpartum Care Experience
            </h1>
            
            <p className="text-xl text-gray-700 mb-8">
              Your feedback helps us improve care for new mothers. 
              Share your experience and receive a gift card as our thank you.
            </p>
            
            <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
              <h2 className="text-2xl font-semibold text-blue-800 mb-4">
                Ready to Share Your Story?
              </h2>
              
              <p className="mb-6">
                Click below to start your testimonial. It only takes a few minutes!
              </p>
              
              <Link 
                href="/testimonial" 
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg px-6 py-3 transition-colors"
              >
                Start Your Testimonial
              </Link>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <div className="bg-white p-6 rounded-lg shadow">
                <Image 
                  src="/file.svg" 
                  alt="Simple Process" 
                  width={48} 
                  height={48} 
                  className="mx-auto mb-4"
                />
                <h3 className="font-medium text-lg mb-2">Simple Process</h3>
                <p className="text-gray-600">Quick and easy testimonial submission</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow">
                <Image 
                  src="/window.svg" 
                  alt="Video Option" 
                  width={48} 
                  height={48} 
                  className="mx-auto mb-4"
                />
                <h3 className="font-medium text-lg mb-2">Video Option</h3>
                <p className="text-gray-600">Share your story in written or video format</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow">
                <Image 
                  src="/globe.svg" 
                  alt="Make an Impact" 
                  width={48} 
                  height={48} 
                  className="mx-auto mb-4"
                />
                <h3 className="font-medium text-lg mb-2">Make an Impact</h3>
                <p className="text-gray-600">Help improve care for future mothers</p>
              </div>
            </div>
          </div>
        </main>
        
        <footer className="mt-16 text-center text-gray-500">
          <p>© {new Date().getFullYear()} Postpartum Care USA. All rights reserved.</p>
        </footer>
      </div>
    </div>
  )
}