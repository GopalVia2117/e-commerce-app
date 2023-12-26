import React from 'react'
import "./alert.css"
import { useRef } from 'react'

const Alert = ({content, success}) => {
    const ref = useRef();
  return (
    <>
        <div ref={ref} className={`alertWrapper ${success ? 'success' : 'error'}`}>
            <span>{content}</span> <button onClick={() => ref.current.style.display = 'none'} style={{marginLeft: 'auto'}}>x</button>
        </div>

    </>
    
  )
}

export default Alert