import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate = useNavigate()

    const logOutfunction = ()=>{
        localStorage.removeItem("accestoken")
        localStorage.removeItem("refleshtoken")
        navigate("/")
    }

  return (
    <div>
        <h1>Home</h1>
        <button onClick={logOutfunction}>Log out</button>
    </div>
  )
}

export default Home