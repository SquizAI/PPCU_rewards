import Link from "next/link"
import { ExternalLink, Sheet } from "lucide-react"

export default function DashboardPage() {
  const spreadsheetUrl = "https://docs.google.com/spreadsheets/d/1cVxfG-VuYzZK6vIydl5cqftRzhpMTH7b9T2nNV-RacY/"
  
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="w-16 h-16 mx-auto mb-6 bg-[#FAA682] rounded-full flex items-center justify-center">
            <Sheet className="w-8 h-8 text-white" />
          </div>
          
          <h1 className="text-3xl font-bold mb-4 text-gray-900">
            PPCU Testimonials Dashboard
          </h1>
          
          <p className="text-lg text-gray-600 mb-8">
            All testimonials are stored in your Google Sheet for easy management and analysis.
          </p>
          
          <div className="bg-gradient-to-r from-[#FAA682]/10 to-[#9EC9BA]/10 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">View Your Testimonials</h2>
            <p className="text-gray-600 mb-6">
              Click the button below to access your Google Sheet with all submitted testimonials, 
              including contact information, feedback, and video submission status.
            </p>
            
            <a 
              href={spreadsheetUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#FAA682] hover:bg-[#E56157] text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Open Google Sheet
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Real-time Updates</h3>
              <p className="text-sm text-gray-600">
                New testimonials appear instantly in your Google Sheet
              </p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Easy Sharing</h3>
              <p className="text-sm text-gray-600">
                Share the sheet with team members for collaboration
              </p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Data Export</h3>
              <p className="text-sm text-gray-600">
                Export to CSV, Excel, or other formats as needed
              </p>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-200">
            <Link 
              href="/"
              className="text-[#FAA682] hover:text-[#E56157] font-medium"
            >
              ← Back to Testimonial Form
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}