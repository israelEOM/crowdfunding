import React, { useState, useEffect } from 'react'
import axios from 'axios'

import { DisplayCampaigns } from '../components'
import { useStateContext } from '../context'

const Home = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [campaigns, setCampaigns] = useState([])

  const { address, contract, getCompaigns } = useStateContext()
  
  const fetchCampaigns = async () => {
    setIsLoading(true)

    const dataCrypto = await getCompaigns()
    const data = await getLocalCampaigns()
    const mergedCampaigns = [...data, ...dataCrypto]

    setCampaigns(mergedCampaigns.sort((a, b) => a.deadline > b.deadline ? 1 : -1))
    setIsLoading(false)
  }

  const getLocalCampaigns = async () => {
    const data = await axios.get(`http://localhost:3000/campaigns`).then((response) => {
      return response.data
    });
    return data
  }

  useEffect(() => {
    if (contract) fetchCampaigns()
  }, [address, contract])

  return (
    <DisplayCampaigns 
      title="All Campaigns"
      isLoading={isLoading}
      campaigns={campaigns}
    />
  )
}

export default Home