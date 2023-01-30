import React, { useState, useEffect } from 'react'

import { DisplayCampaigns } from '../components'
import { useStateContext } from '../context'
import { useFetch } from '../hooks/useFetch'

const Home = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [campaigns, setCampaigns] = useState([])
  const { data } = useFetch('campaigns')

  const { address, contract, getCompaigns } = useStateContext()
  

  const fetchCampaigns = async () => {
    setIsLoading(true)
    const dataCrypto = await getCompaigns()
    const mergedCampaigns = [...data, ...dataCrypto]
    setCampaigns(mergedCampaigns.sort((a, b) => a.deadline > b.deadline ? 1 : -1))
    setIsLoading(false)
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