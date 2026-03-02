import React, { useEffect, useRef, useState } from 'react'

type Props = {
  length:number,
  onComplete: (val: string) => void   
}

const OTPResuable = ({length, onComplete}: Props) => {
    const [otpInput, setOtpInput] = useState(new Array(length).fill(""))
    const inpRef = useRef<HTMLInputElement[] | null>([])

    const handleInput = (value:string, indx:number) => {
        setOtpInput(prev => {
            const newArr = [...prev]
            newArr[indx] = value.trim().slice(-1)
            return newArr
        });

       setTimeout(() => {
        if(inpRef.current && indx < length-1){
          inpRef.current[indx+1].focus()
       }
       },0) 
     
       if(otpInput.every(Boolean)){
         onComplete(otpInput.join(""))
       }
    }

    const handleBackspace = (e: React.KeyboardEvent<HTMLInputElement>, indx:number) => {
      //  setTimeout(() => {
   if(e.key === "Backspace" && !otpInput[indx] && indx > 0){
          inpRef?.current[indx - 1]?.focus()
       }
      //  },0)
    
    }

    useEffect(() => {

    },[])

    console.log(otpInput)

    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault()


        const text = e.clipboardData.getData("text").slice(0, length);
        if(!(/^\d+$/).test(text)) return

        const textArr = text.split("");
        const newOtp = new Array(length).fill("")

        textArr.forEach((itm, i) => {
           newOtp[i] = itm
        })

        setOtpInput(newOtp)   //here on issue if we directly do this then input field may cut of becz 

        const focusIndex = textArr.length;
        inpRef.current[focusIndex].focus();

        
        // if(){
        //   onComplete(newOtp.join(""))
        // }
    }

    useEffect(() => {
        // inpRef.current[0]?.disabled = false
        inpRef.current[0]?.focus()
    },[])

  return (
    <div onPaste={handlePaste}>
        {
            otpInput.map((ip,indx) => 
            <input 
              key ={indx}
              onChange={(e)=>handleInput(e.target.value, indx)}
              value = {ip}
              ref = {(ele) => (inpRef.current[indx] = ele)}
              onKeyDown={(e) => handleBackspace(e, indx)}
              disabled= {indx !== 0 && otpInput[indx - 1] === ""}
            />
        )
        }
    </div>
  )
}

export default OTPResuable