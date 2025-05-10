import { Button, CircularProgress, IconButton, Modal, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import Loading from '../loading/Loading';
import { toast } from 'react-toastify';
import ModalComponent from '../modal/Modal';


const Category = () => {



  const containerStyle = {
    padding: '24px',
    backgroundColor: 'white',
    borderRadius: '16px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    overflowX: 'auto',
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'separate',
    borderSpacing: '0 10px',
  };

  const thTdStyle = {
    padding: '12px 16px',
    borderBottom: '1px solid #ddd',
    textAlign: 'left',
    fontSize: '14px',
  };

  const getStatusStyle = (status) => {
    const base = {
      padding: '4px 8px',
      borderRadius: '9999px',
      fontSize: '12px',
      fontWeight: '600',
      display: 'inline-block',
    };

    if (status === 'Active') return { ...base, backgroundColor: '#d1fae5', color: '#065f46' };
    if (status === 'Pending') return { ...base, backgroundColor: '#fef9c3', color: '#92400e' };
    return { ...base, backgroundColor: '#fee2e2', color: '#991b1b' };
  };

  // https://testaoron.limsa.uz/api/docs

  const token = localStorage.getItem("accestoken")

  const [editOpen, setEditOpen] = useState()
  const [openCreateCategory, setOpenCreateCategory] = useState(false)
  const [loading, setLoading] = useState(false)
  const [categoryData, setCategoryData] = useState([])
  const [deleteId, setDeleteId] = useState()

  // console.log(editOpen);
  

  
  


  const getCategoryApi = () =>{

    fetch("https://testaoron.limsa.uz/api/category")
    .then((res) => res.json())
    .then((item) => {
      setCategoryData(item?.data)
      setLoading(true)
    }
    )

  }

//--------------------- CREATE CATEGORY START--------------//


const createCategory = ()=>{
  fetch("https://testaoron.limsa.uz/api/category")
  .then((res)=> res.json())
  .then((item)=> item)
}

//--------------------- CREATE CATEGORY END--------------//

//--------------------- DELETE CATEGORY START--------------//



//--------------------- DELETE CATEGORY START--------------//

  const deleteCategory = ()=>{  
    fetch(`https://testaoron.limsa.uz/api/category/${deleteId}`, {
      method:"DELETE",
      headers:{
        "Content-type":"application/json",
        "Authorization" : `Bearer ${token}`
      }
    })
    .then((res) => res.json())
    .then((item)=> {
      if (item?.success) {
        toast.success(item?.data?.message)
        getCategoryApi()
      }
    })
  }


//--------------------- DELETE CATEGORY END--------------//


  useEffect(()=>{
    getCategoryApi()
  },[])


  if(!loading){
    return <Loading/>
  } else{
  return (
    <>
      <div className='bg-white '>
        <div className="category__header flex justify-between items-center">
          <h1 className="category__title text-[22px]">Category</h1>
          <button 
            onClick={()=> setOpenCreateCategory(true)}
            style={{
              paddingLeft: '1.25rem',  
              paddingRight: '1.25rem',
              paddingTop: '0.5rem',  
              paddingBottom: '0.5rem',
              outline:"none"
            }}
            type="button" 
            className="text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-purple-400 dark:text-purple-400 dark:hover:text-white dark:hover:bg-purple-500 dark:focus:ring-purple-900">
              Add Category
          </button>
          </div>
      <div style={{  borderRadius: 16, marginTop: '25px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#f3f4f6', color: '#374151' }}>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>#</th>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Title ENG</th>
                <th style={{ padding: '12px 16px', textAlign: 'center' }}>Title RU</th>
                <th style={{ padding: '12px 16px', textAlign: 'center' }}>Title DE</th>
                <th style={{ padding: '12px 16px', textAlign: 'center' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
             {
              categoryData?.map((el,index)=>(
                <tr key={index} style={{ border: '1px solid #eee' }}>
                <td style={{ padding: '12px 16px' }}>{index+1}</td>
                <td style={{ padding: '12px 16px' }}>{el?.name_en}</td>
                <td style={{ padding: '12px 16px' }}>{el?.name_ru}</td>
                <td style={{ padding: '12px 16px' }}>{el?.name_de}</td>
                <td style={{ padding: '12px 16px', display:"flex", alignItems:"center", gap:"10px" }}>
                    <button
                      onClick={()=> {
                        setEditOpen(el?.id)
                      }}
                      type="button"
                      className=" text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
                      style={{
                        paddingLeft: '1.25rem',  
                        paddingRight: '1.25rem',
                        paddingTop: '0.5rem',  
                        paddingBottom: '0.5rem',
                        outline:"none"
                      }}
                    >
                      Edit
                    </button>  
                    <button onClick={()=> {
                      setDeleteId(el?.id)
                      deleteCategory()
                    }}  
                      style={{
                        paddingLeft: '1.25rem',  
                        paddingRight: '1.25rem',
                        paddingTop: '0.5rem',  
                        paddingBottom: '0.5rem',
                        outline:"none"
                      }}
                      className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                        Delete
                    </button>             
                </td>
              </tr>
              ))              
             }
            </tbody>
          </table>
        </div>
      </div>
      {
        (openCreateCategory || editOpen) 
        &&
        <ModalComponent categoryData={categoryData} onClose={setOpenCreateCategory} getCategoryApiModal={getCategoryApi} edit={setEditOpen} editId = {editOpen}/> 
      }
    </>
  )
}
}

export default Category