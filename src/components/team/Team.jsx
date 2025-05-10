import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import Loading from '../loading/Loading';
import TeamModal from '../modal/TeamModal';

const Team = () => {

  const token = localStorage.getItem("accestoken")
  const [teamData, setTeamData] = useState([])
  const [loading, setLoading] = useState(true)
  const [teamEditOpen, setTeamEditOpen] = useState()
  const [teamCreateItem, setTeamCreateItem] = useState(false)
  console.log(teamEditOpen);
  

  const  getTeamData = ()=>{
    fetch("https://testaoron.limsa.uz/api/team-section",{
      method:"GET",
      headers:{
        "Content-type":"application/json",
        "Authorization": `Bearer ${token}`
      }
    })
    .then((res)=>res.json())
    .then((item)=>{
      setTeamData(item?.data);
      setLoading(false)
    })
  }

  const deleteTeam = (id)=>{
    fetch(`https://testaoron.limsa.uz/api/team-section/${id}`,{
      method:"DELETE",
      headers:{
        "Content-type":"application/json",
        "Authorization": `Bearer ${token}`
      }
    })
    .then((res)=>res.json())
    .then((item)=>{
      setLoading(false)
      if (item?.success){
        getTeamData()
        toast.success("Malumot o'chirildi !!! ")
      } else{
        toast.error("Xatolik iltimos qaytadan urunib ko'ring ")
      }
    })
  }

  useEffect(()=>{
    getTeamData()
  },[])

  if (loading){
    return <Loading/>
  }

  return (


    <>
    <div className='bg-white '>
      <div className="category__header flex justify-between items-center">
        <h1 className="category__title text-[22px]"></h1>
        <button  
          onClick={()=>{
            setTeamCreateItem(true)
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
              <th style={{ padding: '12px 16px', textAlign: 'left' }}>Image</th>
              <th style={{ padding: '12px 16px', textAlign: 'center' }}>Full Name</th>
              <th style={{ padding: '12px 16px', textAlign: 'center' }}>Position (EN)</th>
              <th style={{ padding: '12px 16px', textAlign: 'center' }}>Position (RU)</th>
              <th style={{ padding: '12px 16px', textAlign: 'center' }}>Position (DE)</th>
              <th style={{ padding: '12px 16px', textAlign: 'center' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
           {
            teamData?.map((el, index)=>(
              <tr key={index} style={{ border: '1px solid #eee' }}>
              <td style={{ padding: '12px 16px' }}>{index+1}</td>
              <td style={{ padding: '12px 16px' }}>
                <img style={{width:"150px", height:"100px", objectFit:"cover"}} src={`https://back.ifly.com.uz/${el?.image}`} alt="team" />
              </td>
              <td style={{ padding: '12px 16px' }}>{el?.full_name}</td>
              <td style={{ padding: '12px 16px' }}>{el?.position_en}</td>
              <td style={{ padding: '12px 16px' }}>{el?.position_ru}</td>
              <td style={{ padding: '12px 16px' }}>{el?.position_de}</td>
              <td style={{ padding: '12px 16px', textAlign:"center"}}>
                  <button
                    onClick={()=>{
                      setTeamEditOpen(el)
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
                    deleteTeam(el?.id)
                    setLoading(true)
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
      ( teamCreateItem|| teamEditOpen) 
      &&
      <TeamModal  getTeamData={getTeamData}  editData={teamEditOpen} onClose = {setTeamCreateItem} onEdit= {setTeamEditOpen}/> 
    }
  </>
  )
}

export default Team