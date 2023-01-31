import express from 'express'
import cors from 'cors'

import { getCampaign, getCampaigns, createCampaign, createUser, donate, getDonations } from './database.js'

const app = express()
app.use(express.json())
app.use(cors({
  origin: '*'
}));


app.get("/campaigns", async (req, res) => {
  const campaigns = await getCampaigns()
  res.send(campaigns)
})

app.get("/campaign/:id", async (req, res) => {
  const id = req.params.id
  const campaign = await getCampaign(id)
  res.send(campaign)
})

app.post("/campaign", async (req, res) => {
  const { id, userId, title, description, deadline, target, image } = req.body
  const campaign = await createCampaign(id, userId, title, description, deadline, target, image)
  res.status(201).send(campaign)
})

app.post("/user", async (req, res) => {
  const { username, walletAddress } = req.body
  const user = await createUser(username, walletAddress)
  res.status(201).send(user)
})

app.post("/donate", async (req, res) => {
  const { campaignId, amount, nickname } = req.body
  const donation = await donate(campaignId, amount, nickname)
  res.status(201).send(donation)
})

app.get("/donations/:id", async (req, res) => {
  const id = req.params.id
  const donations = await getDonations(id)
  res.send(donations)
})

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(3000, () => {
  console.log('Server is running on port 3000')
})
