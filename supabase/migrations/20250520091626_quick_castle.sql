/*
  # Create Portfolio Table

  1. New Tables
    - `portfolio`
      - `id` (uuid, primary key)
      - `name` (text) - Asset name
      - `symbol` (text) - Asset symbol
      - `amount` (numeric) - Amount of asset held
      - `avg_buy_price` (bytea) - Encrypted average buy price
      - `purchase_date` (timestamptz) - Date of purchase
      - `current_price` (numeric) - Current price
      - `change_24h` (numeric) - 24-hour price change percentage
      - `change_7d` (numeric) - 7-day price change percentage
      - `market_cap` (numeric) - Market capitalization
      - `total_usd` (numeric) - Total value in USD
      - `unrealized_profit_usd` (numeric) - Unrealized profit in USD
      - `unrealized_profit_percent` (numeric) - Unrealized profit percentage
      - `sentiment_score` (numeric) - AI-generated sentiment score
      - `created_at` (timestamptz) - Record creation timestamp
      - `updated_at` (timestamptz) - Record update timestamp

  2. Security
    - Enable RLS on `portfolio` table
    - Add policy for authenticated users to read their own data
    - Add policy for authenticated users to manage their own data
*/

-- Enable pgcrypto extension for encryption
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Create portfolio table
CREATE TABLE IF NOT EXISTS portfolio (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  symbol text NOT NULL,
  amount numeric(28,8) NOT NULL DEFAULT 0,
  avg_buy_price bytea NOT NULL, -- Encrypted using pgcrypto
  purchase_date timestamptz NOT NULL DEFAULT now(),
  current_price numeric(28,8) NOT NULL DEFAULT 0,
  change_24h numeric(28,8) NOT NULL DEFAULT 0,
  change_7d numeric(28,8) NOT NULL DEFAULT 0,
  market_cap numeric(28,8) NOT NULL DEFAULT 0,
  total_usd numeric(28,8) NOT NULL DEFAULT 0,
  unrealized_profit_usd numeric(28,8) NOT NULL DEFAULT 0,
  unrealized_profit_percent numeric(28,8) NOT NULL DEFAULT 0,
  sentiment_score numeric(5,2) NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_portfolio_updated_at
  BEFORE UPDATE ON portfolio
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable RLS
ALTER TABLE portfolio ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view their own portfolio"
  ON portfolio
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own portfolio data"
  ON portfolio
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own portfolio data"
  ON portfolio
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can delete their own portfolio data"
  ON portfolio
  FOR DELETE
  TO authenticated
  USING (auth.uid() = id);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_portfolio_symbol ON portfolio(symbol);
CREATE INDEX IF NOT EXISTS idx_portfolio_purchase_date ON portfolio(purchase_date);
CREATE INDEX IF NOT EXISTS idx_portfolio_updated_at ON portfolio(updated_at);