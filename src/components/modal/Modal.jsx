import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const ModalComponent = ({categoryData, onClose, getCategoryApiModal, editId, edit}) => {
    const token = localStorage.getItem("accestoken")

    const modalDate = categoryData?.filter((el)=>el?.id==editId)
    
    useEffect(() => {
        if (editId && modalDate) {
          setNameEn(modalDate[0].name_en || "");
          setNameDe(modalDate[0].name_de || "");
          setNameRU(modalDate[0].name_ru || "");
        } else {
          setNameEn("");
        }
      }, [editId, modalDate[0]]);

    const [loading, setLoading] = useState(false)
    const [nameEn, setNameEn] = useState("") 
    const [nameRU, setNameRU] = useState("") 
    const [nameDe, setNameDe] = useState("") 
    const [btnDisable, setBtnDisable] = useState(false)
    const [editValue, setEditValue] = useState("")
       

    const handlSubmitCategory = (e) =>{
        e.preventDefault()
        setBtnDisable(false)

        fetch("https://testaoron.limsa.uz/api/category",{
            method:"POST",
            headers:{
                "Content-type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                name_en:nameEn,
                name_ru:nameRU,
                name_de:nameDe
            })
        })
        .then((res) => res.json())
        .then((item)=>{          
            toast.success("Malumt qo'shildi")
            getCategoryApiModal()
            setBtnDisable(true)
            onClose(false)
            
        })

    }
    
    //--------------------- EDIT CATEGORY START--------------//


    const editCategory =(e)=>{
        e.preventDefault()

        fetch(`https://testaoron.limsa.uz/api/category/${editId}`, {
        method:"PATCH",
        headers:{
            "Content-type": "application/json",
            "Authorization" : `Bearer ${token}`
        },
        body: JSON.stringify({
            name_en: nameEn,
            name_ru: nameRU,
            name_de: nameDe
        })
        })
        .then((res)=>res.json())
        .then((item)=>{
            getCategoryApiModal()   
            edit(false)
        })
    }

    useEffect(()=>{
        if(editId){
            setEditValue(nameEn)
        }
        else{
            setEditValue("else")
        }
    },[])

  //--------------------- EDIT CATEGORY END--------------//
    

    return (
        <div className="fixed  inset-0 bg-[#7e7b7b80] bg-opacity-50 flex items-center justify-center z-[100000]">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md" style={{ padding: 24 }}>
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Create Item</h2>
              <button
                onClick={()=> {
                    edit(false)
                    onClose(false)
                }}
                className="cursor-pointer text-[35px] text-gray-500 hover:text-red-500 text-xl font-bold"
              >
                &times;
              </button>
            </div>
            {/* Form */}
            <form onSubmit={editId? editCategory : handlSubmitCategory}>
              <div style={{
                marginBlock:"15px", display:"flex", flexDirection:"column",gap:"10px"
              }} className="space-y-4 mb-6">
                <input
                required
                value={nameEn}
                onChange={(e) => setNameEn(e.target.value)}
                  type="text"
                  name="input1"
                  placeholder="Name En"
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                required
                value={nameRU}
                    onChange={(e)=>setNameRU(e.target.value)}
                  type="text"
                  name="input2"
                  placeholder="Name Ru"
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                required
                value={nameDe}
                    onChange={(e)=>setNameDe(e.target.value)}
                  type="text"
                  name="input3"
                  placeholder="Name De"
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              {/* Footer Buttons */}
              <div className="flex justify-end gap-3">
                <button
                onClick={()=> {
                    onClose(false)
                    edit(false)
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
                    disabled={btnDisable}
                    style={{
                        padding:"8px 16px"
                    }}
                  className="px-4 py-2 cursor-pointer bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  {btnDisable?"Loading...": editId? loading?"Loading..." :"Edit":"Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      );
}

export default ModalComponent