import mysql from 'mysql2'

import dotenv from 'dotenv'
dotenv.config()

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
}).promise()

export const getCampaigns = async () => {
  const [rows] = await pool.query("SELECT * FROM campaign")
  return rows[0]
}

export const getCampaign = async (id) => {
  const [rows] = await pool.query(`
    SELECT * 
    FROM campaign
    LEFT JOIN user
      ON user.id = campaign.userId
    WHERE id = ?
  `, [id])
  return rows[0]
}

export const createCampaign = async (id, userId, title, description, deadline, target, image) => {
  const [result] = await pool.query(`
    INSERT INTO campaign (id, userId, title, description, deadline, target, image)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `, [id, userId, title, description, deadline, target, image])
  const id = result.insertId
  return getCampaign(id)
}

export const createUser = async (username, walletAddress) => {
  const [result] = await pool.query(`
    INSERT INTO user (username, walletAddress)
    VALUES (?, ?)
  `, [username, walletAddress])
  return result.insertId
}

const campaigns = await getCampaigns()
const campaign = await getCampaign('537d24ed5a92d118aef5cda20107420b')
console.log(campaign)
