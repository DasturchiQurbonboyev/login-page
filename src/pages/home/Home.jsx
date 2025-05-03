import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Sidebar from '../../components/sidebar/Sidebar'

const Home = () => {
    const navigate = useNavigate()

    const logOutfunction = ()=>{
        localStorage.removeItem("accestoken")
        localStorage.removeItem("refleshtoken")
        navigate("/")
    }

  return (
    <>
        
    </>
  )
}

export default Home