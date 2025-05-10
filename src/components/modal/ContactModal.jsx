import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const ContactModal = ({getContactData,editId, setOpenCreateContact, setEditOpen}) => {
  

  const token = localStorage.getItem("accestoken")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [addressEn, setAddressEn] = useState("")
  const [addresRu, setAddressRu] = useState("")
  const [addresDe, setAddressDe] = useState("")
  const [btnDisable, setBtnDisable] = useState(false)
  const [loadingBtn, setLoadingBtn] =useState(false)

  useEffect(() => {
            if (editId) {
              setAddressDe(editId?.address_de || "");
              setAddressEn(editId?.address_en|| "");
              setAddressRu(editId?.address_ru || "");
              setEmail(editId?.email || "");
              setPhone(editId?.phone_number || "");
            } else {
              setAddressDe("");
            }
          }, [editId]);

  const handlSubmitContact = (e) =>{
    e.preventDefault()
    fetch("/contact",{
      method:"POST",
      headers:{
        "Content-type":"application/json",
        "Authorization": `Bearer ${token}`
      },
      body:JSON.stringify({
        phone_number:phone ,
        email: email,
        address_en: addressEn,
        address_ru: addresRu,
        address_de: addresDe
      })
    })
    .then((res)=>res.json())
    .then((item)=> {
      getContactData()
      setOpenCreateContact(false)
      setEditOpen(false)
      setBtnDisable(false)
      console.log(item);
      
    })
  }

  const editContact = (e)=>{
    e.preventDefault()
    fetch(`https://testaoron.limsa.uz/api/contact/${editId?.id}`,{
      method:"PATCH",
      headers:{
        "Content-type":"application/json",
        "Authorization":`Bearer ${token}`
      },
      body:JSON.stringify({
        phone_number:phone ,
        email: email,
        address_en: addressEn,
        address_ru: addresRu,
        address_de: addresDe
      })
    })
    .then((res)=>res.json())
    .then((item)=>{
      if(item?.success){
        toast.success("Malumot o'zgartirildi")
        setLoadingBtn(false)
        getContactData()
        setOpenCreateContact(false)
        setEditOpen(false)
      }else{
        toast.error("Malumot o'zgartirishda hatolik mavjud")
      }


      
    })
  }

  return (
    <>  
        <div className="fixed  inset-0 bg-[#7e7b7b80] bg-opacity-50 flex items-center justify-center z-[100000]">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md" style={{ padding: 24 }}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">{editId?"Edit":"Create"} Item</h2>
              <button
                onClick={()=> {
                    setEditOpen(false)
                    setOpenCreateContact(false)
                }}
                className="cursor-pointer text-[35px] text-gray-500 hover:text-red-500 text-xl font-bold"
              >
                &times;
              </button>
            </div>
            <form onSubmit={editId? editContact : handlSubmitContact}>
              <div style={{
                marginBlock:"15px", display:"flex", flexDirection:"column",gap:"10px"
              }} className="space-y-4 mb-6">
                <label style={{fontWeight:"bold"}}>Contact</label>
                <input
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                  type="text"
                  placeholder="Phone"
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <label style={{fontWeight:"bold"}}>Email</label>
                <input
                required
                value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                  type="email"
                  placeholder="Email"
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <label style={{fontWeight:"bold"}}>Addres (EN)</label>
                <input
                required
                value={addressEn}
                    onChange={(e)=>setAddressEn(e.target.value)}
                  type="text"
                  placeholder="Address EN"
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                 <label style={{fontWeight:"bold"}}>Addres (RU)</label>
                <input
                required
                value={addresRu}
                    onChange={(e)=>setAddressRu(e.target.value)}
                  type="text"
                  placeholder="Address RU"
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                 <label style={{fontWeight:"bold"}}>Addres (DE)</label>
                <input
                required
                value={addresDe}
                    onChange={(e)=>setAddressDe(e.target.value)}
                  type="text"
                  placeholder="Address DE"
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div className="flex justify-end gap-3">
                <button
                onClick={()=> {
                    setOpenCreateContact(false)
                    setEditOpen(false)
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
                  {btnDisable?"Loading...": editId? btnDisable?"Loading..." :"OK":"Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
    </>
  )
}

export default ContactModal