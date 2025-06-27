import { createClient } from '@supabase/supabase-js'

// Database types
export interface Testimonial {
  id: string
  created_at: string
  first_name: string
  last_name: string
  email: string
  phone: string
  testimonial: string
  consent: boolean
  video_submitted: boolean
  video_url?: string
  video_transcript?: string
  gift_card_sent: boolean
  gift_card_id?: string
  gift_card_amount?: number
  submitted_at: string
}

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

// Public client for client-side operations
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Admin client for server-side operations (with service role key)
export const supabaseAdmin = process.env.SUPABASE_SERVICE_ROLE_KEY
  ? createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })
  : null

// Helper functions for testimonials
export const testimonialService = {
  // Create a new testimonial
  async create(data: Omit<Testimonial, 'id' | 'created_at'>) {
    const { data: testimonial, error } = await supabase
      .from('testimonials')
      .insert([data])
      .select()
      .single()
    
    if (error) throw error
    return testimonial
  },

  // Get all testimonials
  async getAll() {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .order('submitted_at', { ascending: false })
    
    if (error) throw error
    return data || []
  },

  // Get testimonial by ID
  async getById(id: string) {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data
  },

  // Update testimonial (for video submission)
  async update(id: string, updates: Partial<Testimonial>) {
    const { data, error } = await supabase
      .from('testimonials')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Get monthly stats
  async getMonthlyStats() {
    const startOfMonth = new Date()
    startOfMonth.setDate(1)
    startOfMonth.setHours(0, 0, 0, 0)
    
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .gte('submitted_at', startOfMonth.toISOString())
    
    if (error) throw error
    
    const stats = {
      total: data?.length || 0,
      withVideo: data?.filter(t => t.video_submitted).length || 0,
      giftCardsSent: data?.filter(t => t.gift_card_sent).length || 0,
      totalSpent: (data?.filter(t => t.gift_card_sent).length || 0) * 50
    }
    
    return stats
  },

  // Search testimonials
  async search(searchTerm: string) {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .or(`first_name.ilike.%${searchTerm}%,last_name.ilike.%${searchTerm}%,email.ilike.%${searchTerm}%,testimonial.ilike.%${searchTerm}%`)
      .order('submitted_at', { ascending: false })
    
    if (error) throw error
    return data || []
  }
}