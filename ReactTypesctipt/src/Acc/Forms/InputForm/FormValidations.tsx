import React, { useState } from 'react'
import {z} from "zod"


//uncontrolled form becz here we dont have state, so no rerender on keystrokes, validation happens only on submit

const formSchema = z.object({
    username: z.string().min(4, "username to be present"),
    password: z.string()
               .min(8, "password must be atleast 8 char")
              .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
              .regex(/[!@#$%^&*(),.?":{}|<>]/, "password must contain atleast one spcl char"),
    confirm_password: z.string(),

     email: z.string()
                  .min(1, "Email is required")
                  .email("Invalid email address"),         
}).refine(data => data.password === data.confirm_password, {message:"password do not match", path:['confirm_password']})
//   .superRefine((data, ctx) => {
     
//   })  


const FormValidations = () => {

    const [errors, setErrors] = useState<Record<string, string>>({})

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const data = {
            username: formData.get("username"),
            password: formData.get("password"),
            email: formData.get("email"),
            confirm_password: formData.get("confirm_password")
        }

        const result = formSchema.safeParse(data)

        if(!result.success){
            const allErrors: Record<string, string> = {}
            result.error.issues.forEach(err => {console.log(err)})
             result.error.issues.forEach(err => {
                if(err.path[0]){
                  const name = err.path[0]
                  allErrors[name as string]  =  err.message
                }
             }
              
             )
            console.log(errors)
            setErrors(allErrors)
            return
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
            <label htmlFor="username">username: </label>
            <input type="text" id="username" name="username"/>
            {errors.username && <p>{errors.username}</p>}
            <label htmlFor="password">password: </label>
            <input type="text" id="password" name="password"/>
            {errors.password && <p>{errors.password}</p>}

            <label htmlFor="confirm_password">Confirm Password: </label>
            <input type="text" id="confirm_password" name="confirm_password"/>
            {errors.confirm_password && <p>{errors.confirm_password}</p>}

             <label htmlFor="email">Email: </label>
             <input type="text" id="email" name="email"/>
            {errors.email && <p>{errors.email}</p>}
            <button>submit</button>
            </form>
        </div>
    )
}

export default FormValidations