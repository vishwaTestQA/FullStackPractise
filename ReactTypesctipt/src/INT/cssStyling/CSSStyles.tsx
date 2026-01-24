import React from 'react'
import './reactLogo.css'

type Props = {}

const CSSStyles = (props: Props) => {
  return (
    <div>
        <label htmlFor='react-logo'>ReactLogo</label>
        <div className='reactLogo' id="react-logo">
            <div className='rnd'></div>
            <div className='round one'></div>
            <div className='round two'></div>
            <div className='round three'></div>
        </div>

        <button className='btn-normal'>Button</button>
        <input className='inp-regular'></input>
    </div>
  )
}

export default CSSStyles