import React, { useState } from 'react'
import "./LoginPopup.css"
import axios from "axios";

const LoginPopup = ({setShowLogin}) => {
    
  const [currState, setCurrState] = useState("Sign Up")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")


    const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const url = currState === "Sign Up" ? "http://localhost:5000/api/user/register" : "http://localhost:5000/api/user/login"
      const payload = currState === "Sign Up"
        ? { name, email, password }
        : { email, password }

      const response = await axios.post(url, payload)

      if (response.data.success) {

        // Redirect to admin panel (or wherever you want)
        window.location.href = `http://localhost:5174?token=${response.data.token}` // or deployed admin URL
      } else {
        setError(response.data.message || "Login failed")
      }
    } catch (err) {
      console.error(err)
      setError("Something went wrong.")
    } finally {
      setLoading(false)
    }
  }



 return (
    <div className='LogIn-popup'>
      <form className='container' onSubmit={handleSubmit}>
        <div className="title">
          <h2>{currState}</h2>
          <h2 onClick={() => setShowLogin(false)}>X</h2>
        </div>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <div className="inputs">
          {currState === "Sign Up" && (
            <input
              type="text"
              placeholder="user name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}
          <input
            type="email"
            placeholder="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Please wait..." :
            currState === "Sign Up" ? "Create account" : "Log in"}
        </button>

        <p>
          {currState === "Sign Up" ? (
            <>
              Already have an account?{" "}
              <span onClick={() => setCurrState("Log in")}>click here</span>
            </>
          ) : (
            <>
              Create an account?{" "}
              <span onClick={() => setCurrState("Sign Up")}>click here</span>
            </>
          )}
        </p>
      </form>
    </div>
  )
}

export default LoginPopup
