import React, { useEffect, useState } from 'react'
import Loading from "../loading/Loading";
import ContactModal from "../modal/ContactModal";
import { toast } from 'react-toastify';

const Contact = () => {
  const token = localStorage.getItem("accestoken")

  const [contactData, setContactData] = useState([])
  const [loading, setLoading] = useState(false)
  const [deleteId, setDeleteId] = useState()
  const [editOpen, setEditOpen]= useState(false)
  const [openCreateContact, setOpenCreateContact] = useState(false)
  

  
  

  const getContactData = () =>{
    fetch("https://back.ifly.com.uz/api/contact",{
      method:"GET",
      headers:{
        "Content-type": "application/json",
        "Authorization" : `Bearer ${token}`
      }
    })
    .then((res)=>res.json())
    .then((item)=>{
      setLoading(false)
      setContactData(item?.data);
    })
  }

  useEffect(()=>{
    setLoading(true)
    getContactData()
  },[])

  const deleteContact = (id) =>{
    fetch(`https://back.ifly.com.uz/api/contact/${id}`,{
      method:"DELETE",
      headers:{
        "Content-type":"application/json",
        "Authorization": `Bearer ${token}`
      }
    })
    .then((res)=>res.json())
    .then((item)=>{
      if(item?.succes){
        getContactData()
        toast.success("Malumot o'chirildi")
      }else{
        toast.error(item?.message?.message)
      }
      
    })
  }



  if(loading){
    return <Loading/>
  } else{
  return (
    <>
      <div className='bg-white '>
        <div className="category__header flex justify-between items-center">
          <h1 className="category__title text-[22px]"></h1>
          <button  
          onClick={()=>{
            setOpenCreateContact(true)
          }}
            style={{  
              paddingLeft: '1.25rem',  
              paddingRight: '1.25rem',  
              paddingTop: '0.5rem',   
              paddingBottom: '0.5rem',  
              outline:"none"  
            }}  
            type="button"   
            className="text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-purple-400 dark:text-purple-400 dark:hover:text-white dark:hover:bg-purple-500 dark:focus:ring-purple-900">
              Add 
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
                contactData?.map((el,index)=>(
                  <tr key={index} style={{ border: '1px solid #eee' }}>
                  <td style={{ padding: '12px 16px' }}>{index+1}</td>
                  <td style={{ padding: '12px 16px' }}>{el?.phone_number}</td>
                  <td style={{ padding: '12px 16px' }}>{el?.email}</td>
                  <td style={{ padding: '12px 16px' }}>{el?.address_en}</td>
                  <td style={{ padding: '12px 16px',textAlign:"center" }}>
                      <button
                      onClick={()=>{
                        setEditOpen(el)
                      }}
                        type="button"
                        className=" text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
                        style={{
                          paddingLeft: '1.25rem',  
                          paddingRight: '1.25rem',
                          paddingTop: '0.5rem',  
                          paddingBottom: '0.5rem',
                          outline:"none",
                          marginRight:"8px"
                        }}
                      >
                        Edit
                      </button>  
                      <button   
                        onClick={()=>{
                          deleteContact(el?.id)
                          setDeleteId(el?.id)
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
        (openCreateContact || editOpen) 
        &&
        <ContactModal getContactData={getContactData} contactData={contactData} setOpenCreateContact={setOpenCreateContact}  setEditOpen={setEditOpen} editId = {editOpen}/> 
      }
    </>
  )
}
}

export default Contact