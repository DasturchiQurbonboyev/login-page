import { Route, Routes, useNavigate } from 'react-router-dom'
import './App.css'
import Login from './assets/pages/login/Login'
import Home from './assets/pages/home/Home'
import { ToastContainer} from 'react-toastify';
import { useEffect } from 'react';
 

function App() {

  const tokenjon = localStorage.getItem("accestoken")
  const navigate = useNavigate()
  useEffect(()=>{
    if(tokenjon){
      navigate("/home")
    } else{
      navigate("/")
    }
  },[ ])

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
      <ToastContainer />
    </>
  )
}

export default App
