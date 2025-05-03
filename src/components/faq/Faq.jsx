import React, { useEffect, useState } from 'react'

const Faq = () => {

  const token = localStorage.getItem("accestoken")
  const [faqData , setFaqData] = useState([])
  console.log(faqData);
  

  const getFaqData =()=>{
    fetch('https://back.ifly.com.uz/api/faq',{
      method:"GET",
      headers:{
        "Content-type":"application/json",
        "Authorization": `Bearer ${token}`
      }
    })
    .then((res)=>res.json())
    .then((item)=>{
      setFaqData(item?.data);
      
    })
  }

  useEffect(()=>{
    getFaqData()
  },[])



  return (
    <>
      <div className='bg-white '>
        <div className="category__header flex justify-between items-center">
          <h1 className="category__title text-[22px]"></h1>
          <button  
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
             
              
                <tr style={{ border: '1px solid #eee' }}>
                <td style={{ padding: '12px 16px' }}></td>
                <td style={{ padding: '12px 16px' }}></td>
                <td style={{ padding: '12px 16px' }}></td>
                <td style={{ padding: '12px 16px' }}></td>
                <td style={{ padding: '12px 16px', display:"flex", alignItems:"center", gap:"10px" }}>
                    <button
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
                    <button   
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
           
            </tbody>
          </table>
        </div>
      </div>
      {/* {
        (openCreateCategory || editOpen) 
        &&
        <ModalComponent categoryData={categoryData} onClose={setOpenCreateCategory} getCategoryApiModal={getCategoryApi} edit={setEditOpen} editId = {editOpen}/> 
      } */}
    </>
  )
}

export default Faq