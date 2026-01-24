import React from 'react'

export type RetryType = {
    maxRetries: number,
    delayMs: number,
    backoff?: "fixed" | "exponential"
}

export const retryConfig: Record<string, RetryType> = {
  CRITICAL_HEAD: {
    maxRetries: 10,
    delayMs: 60000,
    backoff: "exponential"
  },
    NORMAL_HEAD: {
    maxRetries: 2,
    delayMs: 60000,
    backoff: "fixed"
  },
   NO_RETRY: {
    maxRetries: 10,
    delayMs: 60000,
  }
}