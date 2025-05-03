import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const ColorModal = ({editData, onClose, onEdit, getColorData}) => {

  const token = localStorage.getItem("accestoken")

  const [colorEn, setColorEn] = useState("")
  const [colorDe, setColorDe] = useState("")
  const [colorRu, setColorRu] = useState("")
  const [btnDisable, setBtnDisable] =useState(false)
  const [loadingBtn, setLoadingBtn] =useState(false)

   useEffect(() => {
          if (editData) {
            setColorEn(editData?.color_en || "");
            setColorRu(editData?.color_ru || "");
            setColorDe(editData?.color_de || "");
          } else {
            setColorDe("");
          }
        }, [editData]);

  const handlSubmitColor = (e)=>{
    e.preventDefault()
    fetch("https://back.ifly.com.uz/api/colors",{
      method:"POST",
      headers:{
        "Content-type": "application/json",
        "Authorization":`Bearer ${token}`
      },
      body:JSON.stringify({
        color_en: colorEn,
        color_ru: colorRu,
        color_de: colorDe
      })
    })
    .then((res)=>res.json())
    .then((item)=>{

      if(item?.success){
        getColorData()
        toast.success("Malumot qo'shildi")
        onClose(false)
        onEdit(false)
      }else{
        toast.error(item?.message?.message)
      }
    })
  }

  const editColorItem = (e) =>{
    e.preventDefault()

    fetch(`https://back.ifly.com.uz/api/colors/${editData?.id}`,{
      method:"PATCH",
      headers:{
        "Content-type": "application/json",
        "Authorization":  `Bearer ${token}`
      },
      body:JSON.stringify({
        color_en: colorEn,
        color_ru: colorRu,
        color_de: colorDe
      })
    })
    .then((res)=> res.json())
    .then((item)=> {
      if(item?.success){
        getColorData()
        toast.success("Malumot o'zgartirildi")
        onClose(false)
        onEdit(false)
      }else{
        toast.success(item?.message?.message)
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
                onClick={()=> {
                    onEdit(false)
                    onClose(false)
                }}
                className="cursor-pointer text-[35px] text-gray-500 hover:text-red-500 text-xl font-bold"
              >
                &times;
              </button>
            </div>
            {/* Form */}
            <form onSubmit={editData? editColorItem : handlSubmitColor}>
              <div style={{
                marginBlock:"15px", display:"flex", flexDirection:"column",gap:"10px"
              }} className="space-y-4 mb-6">
                <label style={{fontWeight:"bold"}}>Color En</label>
                <input
                required
                value={colorEn}
                onChange={(e) => setColorEn(e.target.value)}
                  type="text"
                //   name="input1"
                  placeholder="Color En"
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <label style={{fontWeight:"bold"}}>Color Ru</label>
                <input
                required
                value={colorRu}
                    onChange={(e)=>setColorRu(e.target.value)}
                  type="text"
                //   name="input2"
                  placeholder="Color Ru"
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <label style={{fontWeight:"bold"}}>Color De</label>
                <input
                required
                value={colorDe}
                    onChange={(e)=>setColorDe(e.target.value)}
                  type="text"
                //   name="input3"
                  placeholder="Color De"
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              {/* Footer Buttons */}
              <div className="flex justify-end gap-3">
                <button
                onClick={()=> {
                    onClose(false)
                    onEdit(false)
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
                        setLoadingBtn(true)
                    }}
                    disabled={btnDisable}
                    style={{
                        padding:"8px 16px"
                    }}
                  className="px-4 py-2 cursor-pointer bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  {btnDisable?"Loading...": editData? loadingBtn?"Loading..." :"OK":"Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
    </>
  )
}

export default ColorModal