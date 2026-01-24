import React from 'react'
import { useNetwork } from '../context/NetworkContext'

const NetworkBanner = () => {
    const {isOnline} = useNetwork()

    if(isOnline) return null;

  return (
    <div>
        <p>You are offline, some features may not work</p>
    </div>
  )
}

export default NetworkBanner