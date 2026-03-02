import React, { useState } from 'react'
import OTPResuable from './OTPResuable'


const OTPContainer = () => {
    const [data, setData] = useState<string>('')
  return (
    <div>
        <OTPResuable length={6} onComplete={setData}/>
        {data && <p>yourotp: {data}</p>}
    </div>
  )
}

export default OTPContainer