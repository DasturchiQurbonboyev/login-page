import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const SizesModal = ({editData, onClose, onEdit, getSizeData}) => {

    const token = localStorage.getItem("accestoken")
    const [size, setSize] = useState("")
    const [btnDisable, setBtnDisable]= useState(false)
    const [loadingBtn, setLoadingBtn] = useState(false)
console.log(editData);

 useEffect(() => {
        if (editData) {
          setSize(editData?.size || "");
        } else {
          setSize("");
        }
      }, [editData]);

    const handlSubmitSize = (e) =>{       
        e.preventDefault()
        fetch(`https://testaoron.limsa.uz/api/sizes`, {
            method:"POST",
            headers:{
                "Content-type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body:JSON.stringify({
                size: size
            })
        })
        .then((res)=>res.json())
        .then((item)=>{
            setLoadingBtn(false)
            getSizeData()
            onEdit(false)
            onClose(false)
            console.log(item ,"salombek");
            
        })
    }


    const editSize = (e) =>{
        e.preventDefault()
        fetch(`https://testaoron.limsa.uz/api/sizes/${editData?.id}`,{
            method:"PATCH",
            headers:{
                "Content-type":"application/json",
                "Authorization":`Bearer ${token}`
            },
            body:JSON.stringify({
                size:size
            })
        })
        .then((res)=> res.json())
        .then((item)=> {
            getSizeData()
            toast.success("Malumot o'zgartirildi")
            setBtnDisable(false)
            setLoadingBtn(false)
            onClose(false)
            onEdit(false)
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
            <form onSubmit={editData? editSize :handlSubmitSize}>
              <div style={{
                marginBlock:"15px", display:"flex", flexDirection:"column",gap:"10px"
              }} className="space-y-4 mb-6">
                <label style={{fontWeight:"bold"}}>Size</label>
                <input
                required
                value={size}
                onChange={(e) => setSize(e.target.value)}
                  type="text"
                  placeholder="Size"
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

export default SizesModal