import React from 'react'
import { axiosApi } from './networkInterceptors'
import { retryConfig, type RetryType } from './retryConfig'


const sleep = (ms: number) => {
   return new Promise(res => setTimeout(res, ms))
}

const shouldRetry = (error: any) => {
    if(!navigator.onLine) return false;
    
    if(!error.response) return true;   // may be DNS/Network issues, may sortout after retries

    const status = error.response.status;
    return status>=500 && status<600;     //it returns true if err is server side else return false
}

const getDelay = (policy: RetryType, retryCount: number) => {
let delay = 0;
   if(policy.backoff === "exponential"){
    delay = policy.delayMs * Math.pow(2, retryCount)
   }else{
    delay = policy.delayMs
   }
   return Math.min(delay, policy.delayMs)
}

// type Props = {
//   retryPolicy: keyof typeof retryConfig   //when we use this type and write like this retryConfig[retryPolicy];  
// }                                        // err => Props type cant be used as index type

const attachRetryNetwork = (retryPolicy:  keyof typeof retryConfig) => {
   const policy = retryConfig[retryPolicy]; 
   axiosApi.interceptors.response.use(
    res => res,
    async err => {
      const config = err.config;
      config.__retryCount ??= 0;

      if(config.__retryCount >= policy.maxRetries || !shouldRetry(err)){
        return Promise.reject(err)
      }

      config.__retryCount++;
      const delay = getDelay(policy, config.__retryCount)
      await sleep(delay)
      return axiosApi(config)
    }
   )
}

export default attachRetryNetwork
