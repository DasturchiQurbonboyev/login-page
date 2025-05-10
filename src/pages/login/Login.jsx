import  "./Login.css";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { startCanvasAnimation } from '../../js/canvasAnimation';


const Login = () => {

  const [login, setLogin] = useState()
  const [password, setPassword] = useState()
  const naigate = useNavigate()

  useEffect(() => {
    startCanvasAnimation();
  }, []);

  const loginSubmit =(event)=>{
    event.preventDefault()
    fetch("https://testaoron.limsa.uz/api/auth/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        login : login,
        password : password
      })
    })
    .then((response)=> response.json())
    .then((item)=> {
      console.log(item)
      if(item?.success){
        toast.success(item?.data?.message)
        localStorage.setItem("accestoken", item?.data?.access_token)
        localStorage.setItem("refleshtoken", item?.data?.reflesh_token)
        naigate("/home")
      } else{
        toast.error(item?.message?.message)
      }
    })
  }

  return (
    <>
      <div className="login__page">
        <canvas id="canvas"></canvas>
        <form onSubmit={loginSubmit} action="#" method="post" className="space-y-4 log-in">
            <div>
              <label htmlFor="login" className="mb-2  text-white text-lg">Login</label>
              <input
                onChange={(e)=> setLogin(e.target.value)}
                id="text"
                className="border p-3 dark:bg-indigo-700 text-white  dark:border-gray-700 shadow-md placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full"
                type="login"
                placeholder="Login"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="mb-2 text-white text-lg">Password</label>
              <input
                onChange={(e)=> setPassword(e.target.value)}
                id="password"
                className="border p-3 shadow-md dark:bg-indigo-700 text-white  dark:border-gray-700 placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full"
                type="password"
                placeholder="Password"
                required
              />
            </div>
            <a
              className="group text-blue-400 transition-all duration-100 ease-in-out"
              href="#"
            >
              <span
                className="bg-left-bottom bg-gradient-to-r text-sm from-blue-400 to-blue-400 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out"
              >
                Forget your password?
              </span>
            </a>
            <button
              className="bg-gradient-to-r dark:text-gray-300 from-blue-500 to-purple-500 shadow-lg mt-6 p-2 text-white rounded-lg w-full hover:scale-105 hover:from-purple-500 hover:to-blue-500 transition duration-300 ease-in-out"
              type="submit"
            >
              LOG IN
            </button>
          </form>
      </div> 
    </>
  )
}

export default Login;
