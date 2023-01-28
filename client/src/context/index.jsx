import React, { useContext, createContext } from "react"

import { useAddress, useContract, useMetamask, useContractWrite } from '@thirdweb-dev/react'
import { ethers } from 'ethers'

const StateContext = createContext()

export const StateContextProvider = ({ children }) => {
  const { contract } = useContract('0xd897fBDF50b12bAf17A83667b155EE73C60dD8f4')
  const { mutateAsync: createCampaign } = useContractWrite(contract, 'createCampaign')
  
  const address = useAddress()
  const connect = useMetamask()

  const publishCampaign = async (form) => {
    try {
      const data = await createCampaign([
        address,
        form.title,
        form.description, 
        form.target,
        new Date(form.deadline).getTime(),
        form.image
      ])

      console.log('contract call success', data)
    } catch (error) {
      console.log('contract call failure', error)
    }
  }

  const getCompaigns = async () => {
    const campaigns = await contract.call('getCompaigns')

    const parsedCampaigns = campaigns.map((campaign, i) => ({
      owner: campaign.owner,
      title: campaign.title,
      description: campaign.description,
      target: ethers.utils.formatEther(campaign.target.toString()),
      deadline: campaign.deadline.toNumber(),
      amountCollected: ethers.utils.formatEther(campaign.amountCollected.toString()),
      image: campaign.image,
      pId: i
    }))

    return parsedCampaigns
  }

  return (
    <StateContext.Provider
      value={{
        address,
        contract,
        connect,
        createCampaign: publishCampaign,
        getCompaigns,
      }}
    >
      {children}
    </StateContext.Provider>
  )
}

export const useStateContext = () => useContext(StateContext)