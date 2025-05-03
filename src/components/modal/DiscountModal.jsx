import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const DiscountModal = ({editdata, onEdit, onClose, getDiscontData}) => {

    const token = localStorage.getItem("accestoken")
    
    

    const [loadingBtn, setLoadingBtn] = useState(false)
    const [discount, setDiscount] = useState() 
    const [started, setStarted] = useState("") 
    const [finished, setFinished] = useState("") 
    const [status, setStatus] = useState(editdata?.status) 
    const [btnDisable, setBtnDisable] = useState(false)
    const [editValue, setEditValue] = useState(false)
    

    useEffect(() => {
        editdata && setStatus(editdata?.isActive)
        if (editdata) {
          setDiscount(editdata.discount || "");
          setStarted(editdata.started_at || "");
          setFinished(editdata.finished_at || "");
          setStatus(editdata.status || "");
        } else {
          setDiscount("");
        }
      }, [editdata]);

    const handlSubmitDiscount =(e)=>{
        e.preventDefault()
        fetch("https://back.ifly.com.uz/api/discount",{
            method:"POST",
            headers:{
                "Content-type":"application/json",
                "Authorization" : `Bearer ${token}`
            },
            body: JSON.stringify({
                discount: +discount,
                started_at: started,
                finished_at: finished,
                status:status
            })
        })
        .then((res) => res.json())
        .then((item)=> {            
            toast.success("Ma'lumot qo'shildi")
            getDiscontData()
            onClose(false)      
            onEdit(false)
    })
    }

    const editCategory = (e) =>{
        e.preventDefault()
        fetch(`https://back.ifly.com.uz/api/discount/${editdata?.id}`,{
            method:"PATCH",
            headers:{
                "Content-type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                discount: +discount,
                started_at: started,
                finished_at: finished,
                status: status
            })
        })
        .then((res)=> res.json())
        .then((item)=> {
            getDiscontData()   
            toast.success("Malumot o'zgartirildi!")
            onClose(false)
            onEdit(false)
            setLoadingBtn(false)
        })
    }


  return (
    <>  
        <div className="fixed  inset-0 bg-[#7e7b7b80] bg-opacity-50 flex items-center justify-center z-[100000]">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md" style={{ padding: 24 }}>
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Create Item</h2>
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
            <form onSubmit={editdata? editCategory : handlSubmitDiscount}>
              <div style={{
                marginBlock:"15px", display:"flex", flexDirection:"column",gap:"10px"
              }} className="space-y-4 mb-6">
                <label style={{fontWeight:"bold"}}>Discount %</label>
                <input
                required
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                  type="number"
                //   name="input1"
                  placeholder="Discount %"
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <label style={{fontWeight:"bold"}}>Started</label>
                <input
                required
                value={started}
                    onChange={(e)=>setStarted(e.target.value)}
                  type="date"
                //   name="input2"
                  placeholder=""
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <label style={{fontWeight:"bold"}}>Finished</label>
                <input
                required
                value={finished}
                    onChange={(e)=>setFinished(e.target.value)}
                  type="date"
                //   name="input3"
                  placeholder=""
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <div style={{display:"flex", alignItems:"center" , gap:"8px"}}>
                    <label style={{fontWeight:"bold"}}>Active</label>
                    <input  
                        checked={status}
                        onChange={(e)=>setStatus(e.target.checked)}
                        style={{width:"20px",cursor:"pointer", height:"20px"}} 
                        type="checkbox" name="" id="" 
                    />
                </div>
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
                  {btnDisable?"Loading...": editdata? loadingBtn?"Loading..." :"OK":"Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
    </>
  )
}

export default DiscountModal