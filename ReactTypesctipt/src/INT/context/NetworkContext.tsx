import React, { createContext, useContext, useEffect, useState } from 'react'

type Props = {
    children: React.ReactNode
}

type NetworkContextType = {
    isOnline: boolean,
    markOnline: () => void,
    markOffline: () => void,
    handleApiError: (v: string) => void,
    apiError: string | null,
    clearApiError: () => void
}

const NetworkContext = createContext<NetworkContextType | null>(null);

const NetworkProvider = ({children}: Props) => {
    const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine)
    const [apiError, setApiError] = useState<string | null>(null)

    const markOnline = () => setIsOnline(true);
    const markOffline = () => setIsOnline(false);

    const handleApiError = (err: string) => {
       setApiError(err)
    }

    const clearApiError = () => setApiError(null)

    useEffect(() => {
      const handleOnline = ()  => markOnline()
      const handleOffline = () => markOffline()

       window.addEventListener('online', handleOnline)
       window.addEventListener('offline', handleOffline)

       return () => {
       window.removeEventListener('online', handleOnline)
       window.removeEventListener('offline', handleOffline)
       }
    })

  return (
    <NetworkContext.Provider value={{isOnline, markOnline, markOffline, handleApiError, clearApiError, apiError}}>
    {children}
    </NetworkContext.Provider>
  )
}

export const useNetwork = () => {
    const ctx = useContext(NetworkContext)
    if(!ctx) throw new Error('useNetwork must be used inside NetworkProvider')
    return ctx;
}

export default NetworkProvider