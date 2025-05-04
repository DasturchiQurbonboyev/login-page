import { Route, Routes, useNavigate } from 'react-router-dom'
import './App.css'
import Login from './pages/login/Login'
import Home from './pages/home/Home'
import { ToastContainer} from 'react-toastify';
import { useEffect } from 'react';
import PrivateRoute from './routes/PrivateRoute';
import Layout from './components/layout/Layout';
import Category from './components/category/Category';
import Discount from './components/discount/Discount';
import Size from './components/sizes/Size';
import Colors from './components/colors/Colors';
import Faq from './components/faq/Faq';
import Contact from './components/contact/Contact';
import Team from './components/team/Team';
import News from './components/news/News';
import Product from './components/product/Product';
 

function App() {

  // const tokenjon = localStorage.getItem("accestoken")
  // const navigate = useNavigate()
  // useEffect(()=>{
  //   if(tokenjon){
  //     navigate("/admin")
  //   } else{
  //     navigate("/")
  //   }
  // },[ ])

  return (
    <>
      {/* <Routes>
        <Route path="/" element={<Login />} />
        <Route path='/' element={<Auth/>}>
          <Route path="/admin" element={<Home />} >
          
          </Route>
        </Route>
      </Routes> */}
      {/* <Sidebar> */}
      {/* </Sidebar> */}

      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/" element={
          <PrivateRoute>
            <Layout />
          </PrivateRoute>
        }>
          <Route path="home" element={<Home />} />
          <Route path="category" element={<Category />} />
          <Route path="discount" element={<Discount />} />
          <Route path="size" element={<Size />} />
          <Route path="colors" element={<Colors />} />
          <Route path="faq" element={<Faq />} />
          <Route path="contact" element={<Contact />} />
          <Route path="team" element={<Team />} />
          <Route path="news" element={<News />} />
          <Route path="product" element={<Product />} />
        </Route>
      </Routes>

      <ToastContainer />
    </>
  )
}

export default App
