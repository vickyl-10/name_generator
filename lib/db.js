import { neon } from '@neondatabase/serverless';

const connectionString = process.env.DATABASE_URL?.replace('&channel_binding=require', '') || null;
const sql = connectionString ? neon(connectionString) : null;

// Create the name_gen_logs table if it doesn't exist in your existing database
export async function ensureTableExists() {
  if (!sql) {
    console.log('No database connection available');
    return;
  }
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS name_gen_logs (
        id SERIAL PRIMARY KEY,
        path VARCHAR(255) NOT NULL,
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        user_agent TEXT,
        ip_address TEXT
      )
    `;
    console.log('Name generator logs table ready');
  } catch (error) {
    console.error('Error ensuring table exists:', error);
  }
}

// Log a path visit
export async function logPathVisit(path, userAgent, ipAddress) {
  if (!sql) {
    console.log('No database connection available - skipping log');
    return null;
  }
  
  try {
    // Ensure table exists before inserting
    await ensureTableExists();
    
    const result = await sql`
      INSERT INTO name_gen_logs (path, user_agent, ip_address)
      VALUES (${path}, ${userAgent}, ${ipAddress})
      RETURNING id, timestamp
    `;
    return result[0];
  } catch (error) {
    console.error('Error logging path visit:', error);
    // Don't throw to avoid breaking the page load
    return null;
  }
}
