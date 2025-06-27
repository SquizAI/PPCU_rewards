"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { motion } from "framer-motion"
import { 
  Search, 
  Filter, 
  Download, 
  Video, 
  FileText, 
  Calendar,
  TrendingUp,
  Users,
  Star,
  DollarSign
} from "lucide-react"
import { format } from "date-fns"

interface Testimonial {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  testimonial: string
  submittedAt: string
  videoSubmitted: boolean
  giftCardSent: boolean
}

export default function Dashboard() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState<"all" | "video" | "text">("all")

  useEffect(() => {
    fetchTestimonials()
  }, [])

  const fetchTestimonials = async () => {
    try {
      const response = await fetch("/api/testimonials")
      const data = await response.json()
      setTestimonials(data.testimonials)
    } catch (error) {
      console.error("Failed to fetch testimonials:", error)
    } finally {
      setLoading(false)
    }
  }

  const filteredTestimonials = testimonials.filter(t => {
    const matchesSearch = 
      t.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.testimonial.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesFilter = 
      filterType === "all" ||
      (filterType === "video" && t.videoSubmitted) ||
      (filterType === "text" && !t.videoSubmitted)
    
    return matchesSearch && matchesFilter
  })

  const stats = {
    total: testimonials.length,
    withVideo: testimonials.filter(t => t.videoSubmitted).length,
    giftCardsSent: testimonials.filter(t => t.giftCardSent).length,
    totalSpent: testimonials.filter(t => t.giftCardSent).length * 50
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="bg-white dark:bg-gray-900 shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gradient">Testimonial Dashboard</h1>
            <Button variant="outline" onClick={() => window.location.href = "/"}>
              View Form
            </Button>
          </div>
        </div>
      </header>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="glass">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Testimonials
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.total}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  <TrendingUp className="h-3 w-3 inline mr-1" />
                  +12% from last month
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="glass">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Video Testimonials
                </CardTitle>
                <Video className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.withVideo}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {stats.total > 0 ? Math.round((stats.withVideo / stats.total) * 100) : 0}% conversion rate
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="glass">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Gift Cards Sent
                </CardTitle>
                <Star className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.giftCardsSent}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  All automated
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="glass">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Rewards
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${stats.totalSpent}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  $50 per video
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="container mx-auto px-4 py-4">
        <Card className="glass">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Label htmlFor="search" className="sr-only">Search</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="search"
                    placeholder="Search testimonials..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant={filterType === "all" ? "default" : "outline"}
                  onClick={() => setFilterType("all")}
                  size="sm"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  All
                </Button>
                <Button
                  variant={filterType === "video" ? "default" : "outline"}
                  onClick={() => setFilterType("video")}
                  size="sm"
                >
                  <Video className="h-4 w-4 mr-2" />
                  Video
                </Button>
                <Button
                  variant={filterType === "text" ? "default" : "outline"}
                  onClick={() => setFilterType("text")}
                  size="sm"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Text Only
                </Button>
              </div>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Testimonials List */}
      <section className="container mx-auto px-4 py-4 pb-20">
        <div className="space-y-4">
          {loading ? (
            <Card className="glass">
              <CardContent className="p-12 text-center">
                <div className="animate-pulse">Loading testimonials...</div>
              </CardContent>
            </Card>
          ) : filteredTestimonials.length === 0 ? (
            <Card className="glass">
              <CardContent className="p-12 text-center">
                <p className="text-muted-foreground">No testimonials found</p>
              </CardContent>
            </Card>
          ) : (
            filteredTestimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="glass hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">
                          {testimonial.firstName} {testimonial.lastName}
                        </CardTitle>
                        <CardDescription>
                          {testimonial.email} • {testimonial.phone}
                        </CardDescription>
                      </div>
                      <div className="flex gap-2">
                        {testimonial.videoSubmitted && (
                          <div className="flex items-center gap-1 text-sm text-primary">
                            <Video className="h-4 w-4" />
                            Video
                          </div>
                        )}
                        {testimonial.giftCardSent && (
                          <div className="flex items-center gap-1 text-sm text-green-600">
                            <DollarSign className="h-4 w-4" />
                            Rewarded
                          </div>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      {testimonial.testimonial}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      {format(new Date(testimonial.submittedAt), "PPP")}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          )}
        </div>
      </section>
    </div>
  )
}