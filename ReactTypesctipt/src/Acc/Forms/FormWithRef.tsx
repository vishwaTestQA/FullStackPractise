import React, { useRef } from 'react'

//useRef => we use it when we want uncontrolled but still need access anytime 
const FormWithRef = () => {
    
    const userRef = useRef<HTMLInputElement>(null)
    const pwdRef = useRef<HTMLInputElement | null>(null)

    const handleSubmit = (e) => {
        e.preventDefault()
       console.log(userRef?.current.value)
    }

  return (
    <form onSubmit={handleSubmit}> 
        <label htmlFor="username">username</label>
        <input ref={userRef} type="text" id="username" name="username"/>
        <label htmlFor="password">Password</label>
        <input ref={pwdRef} type="text" id="username" name="username"/>
        <button>submit</button>
    </form>
  )
}

export default FormWithRef