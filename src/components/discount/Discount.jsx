import React, { useEffect, useState } from 'react'
import ModalComponent from '../modal/Modal'
import DiscountModal from '../modal/DiscountModal'
import { toast } from 'react-toastify'
import Loading from '../loading/Loading'

const Discount = () => {
  const token = localStorage.getItem("accestoken")

  const [editOpen, setEditOpen] = useState()  
  const [discountData, setDiscountData] = useState([])
  const [createDiscount , setCreateDiscount] = useState(false)
  const [deleteId, setDeleteId] = useState()
  const [loading, setLoading] = useState(false)
  console.log(loading);
  

  const getDiscontData = () =>{
    fetch("https://testaoron.limsa.uz/api/discount")
    .then((res) => res.json())
    .then((item) => {
      setDiscountData(item?.data)
      setLoading(true)
      // setLoading(false)
  })

  }

  const deleteDiscount = () =>{
    fetch(`https://testaoron.limsa.uz/api/discount/${deleteId}`,{
      method:"DELETE",
      headers:{
        "Content-type":"application/json",
        "Authorization": `Bearer ${token}`
      }
    })
    .then((res)=> res.json())
    .then((item)=> {
      if (item?.success) {
        toast.success(item?.data?.message)
        getDiscontData()
      }
    })

  }

  useEffect(()=>{
    getDiscontData()
  },[])

  if (!loading){
   return <Loading/>
  } 
  else{
  return (
    <>
      <div className='bg-white '>
        <div className="category__header flex justify-between items-center">
          <h1 className="category__title text-[22px]">Discount</h1>
          <button 
          onClick={()=>{
            setCreateDiscount(true)
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
              Add Discount
          </button>
          </div>
      <div style={{  borderRadius: 16, marginTop: '25px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#f3f4f6', color: '#374151' }}>
                <th style={{ padding: '12px 16px', textAlign: 'center' }}>#</th>
                <th style={{ padding: '12px 16px', textAlign: 'center' }}>Discount (%)</th>
                <th style={{ padding: '12px 16px', textAlign: 'center' }}>Started</th>
                <th style={{ padding: '12px 16px', textAlign: 'center' }}>Finished</th>
                <th style={{ padding: '12px 16px', textAlign: 'center' }}>Status</th>
                <th style={{ padding: '12px 16px', textAlign: 'center' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
            {
              discountData?.map((el,index)=>(

                <tr key={index} style={{ border: '1px solid #eee' }}>
                  <td style={{ padding: '12px 16px' }}>{index + 1}</td>
                  <td style={{ padding: '12px 16px', textAlign:"center" }}>{el?.discount}%</td>
                  <td style={{ padding: '12px 16px',textAlign:"center" }}>{el?.started_at}</td>
                  <td style={{ padding: '12px 16px',textAlign:"center" }}>{el?.finished_at}</td>
                  <td style={{ padding: '12px 16px',textAlign:"center", color:`${el?.status? "green":"red"}` }}>{el?.status? "Active":"Inactive	"}</td>
                  <td style={{ padding: '12px 16px',}}>
                    <button
                    onClick={()=> {
                      setEditOpen(el)
                    }}
                      type="button"
                      className=" text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
                      style={{
                        marginRight:"5px",
                        paddingLeft: '1.25rem',  
                        paddingRight: '1.25rem',
                        paddingTop: '0.5rem',  
                        paddingBottom: '0.5rem',
                        outline:"none"
                      }}
                    >
                      Edit
                    </button>  
                    <button   
                    onClick={()=>{
                      setDeleteId(el?.id)
                      deleteDiscount()
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
        (createDiscount || editOpen) 
        &&
        <DiscountModal editdata={editOpen} onEdit={setEditOpen} onClose={setCreateDiscount} getDiscontData={getDiscontData} /> 
      }
    </>
  )
}
}

export default Discount