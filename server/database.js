import mysql from 'mysql2'

import dotenv from 'dotenv'
dotenv.config()

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
}).promise()

const getCampaigns = async () => {
  const [rows] = await pool.query("SELECT * FROM campaign")
  return rows[0]
}

const getCampaign = async (id) => {
  const [rows] = await pool.query(`
    SELECT * 
    FROM campaign
    WHERE id = ?
  `, [id])
  return rows[0]
}

const campaigns = await getCampaigns()
const campaign = await getCampaign('537d24ed5a92d118aef5cda20107420b')
console.log(campaign)
