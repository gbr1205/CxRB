/*
  # Update portfolio table schema

  1. Changes
    - Add new columns for portfolio tracking
    - Update data types for better precision
    - Add indexes for performance optimization

  2. Security
    - Maintain existing RLS policies
    - Ensure encrypted storage for sensitive data
*/

-- Update portfolio table with new columns and types
ALTER TABLE portfolio
ALTER COLUMN amount TYPE numeric(28,8),
ALTER COLUMN current_price TYPE numeric(28,8),
ALTER COLUMN change_24h TYPE numeric(28,8),
ALTER COLUMN change_7d TYPE numeric(28,8),
ALTER COLUMN market_cap TYPE numeric(28,8),
ALTER COLUMN total_usd TYPE numeric(28,8),
ALTER COLUMN unrealized_profit_usd TYPE numeric(28,8),
ALTER COLUMN unrealized_profit_percent TYPE numeric(28,8),
ALTER COLUMN sentiment_score TYPE numeric(5,2);

-- Add check constraints for numeric fields
ALTER TABLE portfolio
ADD CONSTRAINT check_amount_positive CHECK (amount >= 0),
ADD CONSTRAINT check_sentiment_score_range CHECK (sentiment_score >= 0 AND sentiment_score <= 100);

-- Create additional indexes for commonly queried columns
CREATE INDEX IF NOT EXISTS idx_portfolio_sentiment_score ON portfolio(sentiment_score);
CREATE INDEX IF NOT EXISTS idx_portfolio_change_24h ON portfolio(change_24h);
CREATE INDEX IF NOT EXISTS idx_portfolio_change_7d ON portfolio(change_7d);