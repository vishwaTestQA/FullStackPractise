import React from 'react'
import { useNetwork } from '../context/NetworkContext'


const ApiErrorBanner = () => {
    const {apiError, clearApiError} = useNetwork();

    if(!apiError) return null
  return (
    <div>
        {apiError}
        <button onClick={clearApiError}>Dismiss error</button>
    </div>
  )
}

export default ApiErrorBanner