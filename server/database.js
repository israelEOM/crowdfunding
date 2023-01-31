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
  const [rows] = await pool.query(`SELECT c.*, c.id AS pId, u.walletAddress AS owner
    FROM campaign c
    LEFT JOIN user u
      ON u.id = c.userId
    WHERE c.status = 'active'
  `)
  return rows
}

export const getCampaign = async (id) => {
  const [rows] = await pool.query(`
    SELECT c.*, u.walletAddress, u.username
    FROM campaign c
    LEFT JOIN user u
      ON u.id = c.userId
    WHERE c.id = ?
  `, [id])
  return rows[0]
}

export const createCampaign = async (id, userId, title, description, deadline, target, image) => {
  const [result] = await pool.query(`
    INSERT INTO campaign (id, userId, title, description, deadline, target, image)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `, [id, userId, title, description, deadline, target, image])
  return getCampaign(result.insertId)
}

export const createUser = async (username, walletAddress) => {
  const [result] = await pool.query(`
    INSERT INTO user (username, walletAddress)
    VALUES (?, ?)
  `, [username, walletAddress])
  return result.insertId
}

export const donate = async (campaignId, amount, nickname) => {
  const campaign = await getCampaign(campaignId)

  if (campaign) {
    const status = campaign.status === 'fraud' ? 'invalid' : 'valid'

    const [result] = await pool.query(`
      INSERT INTO campaign_donation (campaignId, amount, nickname, status)
      VALUES (?, ?, ?, ?)
    `, [campaignId, amount, nickname, status])

    const amountCollected = campaign.amountCollected + amount
    const campaignStatus = amountCollected >= campaign.target ? 'successful' : 'active'

    await pool.query(`
      UPDATE campaign
      SET amountCollected = ?, status = ?
      WHERE id = ?
    `, [amountCollected, campaignStatus, campaignId])

    return result.insertId
  }

  return null
}

export const getDonations = async (campaignId) => {
  const [rows] = await pool.query(`
    SELECT cd.amount AS donation, cd.nickname AS donator
    FROM campaign_donation cd
    LEFT JOIN campaign c
      ON c.id = cd.campaignId
    WHERE c.id = ?
  `, [campaignId])
  return rows
}

// const campaigns = await getCampaigns()
// const campaign = await getCampaign('537d24ed5a92d118aef5cda20107420b')
// console.log(campaigns)
