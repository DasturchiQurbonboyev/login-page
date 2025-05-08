import React, { useState } from 'react'
import { toast } from 'react-toastify'

const TeamModal = ({ editData, onEdit, onClose, getTeamData}) => {

const [fullName, setFullName] = useState("")
const [positionEN, setPositionEN] = useState("")
const [positionRU, setPositionRU] = useState("")
const [positionDE, setPositionDE] = useState("")
const [loading, setLoading] = useState(false)
const [img, setImg] = useState("")
const token = localStorage.getItem("accestoken")
const formData = new FormData()
formData.append("full_name", fullName)
formData.append("position_ru", positionRU)
formData.append("position_de", positionDE)
formData.append("position_en", positionEN)
formData.append("file", img)

const teamCreate = (e) =>{
  e.preventDefault()
  fetch("https://back.ifly.com.uz/api/team-section",{
    method:"POST",
    headers:{"Authorization": `Bearer ${token}`},
    body: formData
  })
  .then((res)=>res.json())
  .then((item)=>{
    if (item?.success) {
      onClose(false)
      onEdit(false)
      getTeamData()
      setLoading(false)
      toast.success("Malumot qo'shildi")
    } else {
      toast.error("Xatolik iltimos qaytadan urunib ko'ring")
    }
  })
}

const editTeam = (e) =>{
  e.preventDefault()
  fetch(`https://back.ifly.com.uz/api/team-section/${editData?.id}`,{
    method:"PATCH",
    headers:{"Authorization": `Bearer ${token}`},
    body: formData
  })
  .then((res)=>res.json())
  .then((item)=>{
    if (item?.success) {
      onClose(false)
      onEdit(false)
      getTeamData()
      setLoading(false)
      toast.success("Malumot o'zgartirildi")
    } else {
      toast.error("Xatolik iltimos qaytadan urunib ko'ring")
    }
  })
}


  return (
    <>
        <div className="fixed  inset-0 bg-[#7e7b7b80] bg-opacity-50 flex items-center justify-center z-[100000]">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md" style={{ padding: 24 }}>
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">{editData?"Edit":"Create"} Item</h2>
              <button
              onClick={()=>{
                onEdit(false)
                onClose(false)
              }}
                className="cursor-pointer text-[35px] text-gray-500 hover:text-red-500 text-xl font-bold"
              >
                &times;
              </button>
            </div>
            {/* Form */}
            <form  onSubmit={editData?editTeam:teamCreate}>
              <div style={{
                marginBlock:"15px", display:"flex", flexDirection:"column",gap:"10px"
              }} className="space-y-4 mb-6">
                <label style={{fontWeight:"bold"}}>Full Name</label>
                <input
                defaultValue={editData?editData.full_name:""}
                onChange={(e)=>setFullName(e.target.value)}
                required
                  type="text"
                  placeholder="Full Name"
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <label style={{fontWeight:"bold"}}>Position EN</label>
                <input
                defaultValue={editData?editData.position_en:""}
                onChange={(e)=>setPositionEN(e.target.value)}
                required
                  type="text"
                  placeholder="Posirion EN"
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <label style={{fontWeight:"bold"}}>Position RU</label>
                <input
                defaultValue={editData?editData.position_ru:""}
                onChange={(e)=>setPositionRU(e.target.value)}
                required
                  type="text"
                  placeholder="Position RU"
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <label style={{fontWeight:"bold"}}>Position DE</label>
                <input
                defaultValue={editData?editData.position_de:""}
                onChange={(e)=>setPositionDE(e.target.value)}
                required
                  type="text"
                  placeholder="Position DE"
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <label style={{fontWeight:"bold"}}>Image</label>
                <input
                onChange={(e)=>setImg(e.target.files[0])}
                multiple
                accept="image/*"
                required
                  type="file"
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                
                
              </div>
              {/* Footer Buttons */}
              <div className="flex justify-end gap-3">
                <button
                  onClick={()=>{
                    onEdit(false)
                    onClose(false)
                  }}
                  type="button"
                 style={{
                    padding:"8px 16px"
                 }}
                  className="px-4 py-2 cursor-pointer bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                {

                }
                <button
                onClick={()=>{
                  setLoading(true)
                }}
                type="submit"
                    style={{
                        padding:"8px 16px"
                    }}
                  className="px-4 py-2 cursor-pointer bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  {`${editData?"Save":loading?"Loading...":"Create" } `}
                </button>
              </div>
            </form>
          </div>
        </div>
    </>
  )
}

export default TeamModal