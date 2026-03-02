import React, { useRef, useState } from 'react'
// import DOMPurify from "dompurify"

const Sanitization = () => {
     const userRef = useRef(null)
     const [userInput, setUserInput] = useState('') 

     const handleSubmit = (e) => {
        e.preventDefault()
        setUserInput(userRef?.current.value);
     }

  return (
    <div>
        <input ref={userRef} type="text" />
        <button onClick={handleSubmit}>submit</button>
        {userRef && <div dangerouslySetInnerHTML={{__html:userInput}}/>}

        {/* {userRef && <div dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(userInput)}}/>} */}
    </div>
  )
}

export default Sanitization

// "React automatically escapes user input when rendering via JSX. However, 
// when using dangerouslySetInnerHTML, we must sanitize manually using libraries like DOMPurify to prevent XSS."