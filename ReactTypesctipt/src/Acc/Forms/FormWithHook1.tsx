import React from 'react'
import { useForm } from "react-hook-form";

type Props = {}

const FormWithHook1 = (props: Props) => {
  const method = useForm({

  })

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

export default FormWithHook1