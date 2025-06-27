-- Create testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Patient information
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  
  -- Testimonial data
  testimonial TEXT NOT NULL,
  consent BOOLEAN NOT NULL DEFAULT false,
  
  -- Video information
  video_submitted BOOLEAN NOT NULL DEFAULT false,
  video_url TEXT,
  video_transcript TEXT,
  
  -- Gift card tracking
  gift_card_sent BOOLEAN NOT NULL DEFAULT false,
  gift_card_id VARCHAR(255),
  gift_card_amount DECIMAL(10, 2),
  
  -- Timestamps
  submitted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  video_submitted_at TIMESTAMP WITH TIME ZONE,
  gift_card_sent_at TIMESTAMP WITH TIME ZONE
);

-- Create indexes for better performance
CREATE INDEX idx_testimonials_email ON testimonials(email);
CREATE INDEX idx_testimonials_submitted_at ON testimonials(submitted_at);
CREATE INDEX idx_testimonials_video_submitted ON testimonials(video_submitted);

-- Enable Row Level Security (RLS)
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Allow anonymous users to insert testimonials
CREATE POLICY "Allow anonymous testimonial submissions" ON testimonials
  FOR INSERT WITH CHECK (true);

-- Only authenticated users can read testimonials (for dashboard)
CREATE POLICY "Only authenticated users can read testimonials" ON testimonials
  FOR SELECT USING (auth.role() = 'authenticated');

-- Only service role can update testimonials
CREATE POLICY "Service role can update testimonials" ON testimonials
  FOR UPDATE USING (auth.role() = 'service_role');

-- Create a view for monthly statistics
CREATE OR REPLACE VIEW monthly_stats AS
SELECT 
  DATE_TRUNC('month', submitted_at) as month,
  COUNT(*) as total_testimonials,
  COUNT(CASE WHEN video_submitted THEN 1 END) as video_testimonials,
  COUNT(CASE WHEN gift_card_sent THEN 1 END) as gift_cards_sent,
  SUM(CASE WHEN gift_card_sent THEN COALESCE(gift_card_amount, 50) ELSE 0 END) as total_rewards_spent
FROM testimonials
GROUP BY DATE_TRUNC('month', submitted_at)
ORDER BY month DESC;

-- Create a function to get top testimonials for the current month
CREATE OR REPLACE FUNCTION get_top_testimonials_current_month()
RETURNS TABLE (
  id UUID,
  name TEXT,
  testimonial TEXT,
  has_video BOOLEAN,
  submitted_at TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    t.id,
    t.first_name || ' ' || t.last_name as name,
    t.testimonial,
    t.video_submitted as has_video,
    t.submitted_at
  FROM testimonials t
  WHERE DATE_TRUNC('month', t.submitted_at) = DATE_TRUNC('month', CURRENT_DATE)
  ORDER BY 
    t.video_submitted DESC,
    LENGTH(t.testimonial) DESC,
    t.submitted_at DESC
  LIMIT 5;
END;
$$ LANGUAGE plpgsql;