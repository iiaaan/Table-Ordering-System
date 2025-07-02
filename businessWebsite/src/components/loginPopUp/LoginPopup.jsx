import React, { useState } from 'react'
import "./LoginPopup.css"

const LoginPopup = ({setShowLogin}) => {

    const [currState, setCurrState] = useState("Sign Up")

  return (
    <div className='LogIn-popup'>
      <form className='container'>
        <div className="title">
            <h2>{currState}</h2>
            <h2 onClick={() => setShowLogin(false)}>X</h2>
        </div>
        <div className="inputs">
            {currState==="Sign Up" ? <input type="text" placeholder='user name' required/> : <></>}
            <input type="text" placeholder='email' required/>
            <input type="text" placeholder='password' required/>
        </div>
        <button>{currState==="Sign Up" ? "Create account" : "Log in"}</button>
        {
            currState==="Sign Up"
            ? <p>Already have an account? <span onClick={() => setCurrState("Log in")}>click here</span></p>
            : <p>Create an account? <span onClick={() => setCurrState("Sign Up")}>click here</span></p>
        }
      </form>
    </div>
  )
}

export default LoginPopup
