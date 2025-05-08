import React, { useEffect, useState } from 'react'

const ProductModal = ({editData, onEdit, onClose}) => {

    const token = localStorage.getItem("accestoken")
    const [loading, setLoading] = useState(false)
    const [categoryData, setCategoryData] = useState([])
    const [sizesData, setSizesData] = useState([])
    const [colorsData, setColorsData] = useState([])
    const [discountData, setDiscountData] = useState([])

    // get category

    console.log(categoryData , "category");
    console.log(sizesData , "sizes");
    console.log(colorsData , "colors");
    console.log(discountData , "discount");
    

    const getCategoryData = () => {
        fetch("https://back.ifly.com.uz/api/category", {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
            .then((res) => res.json())
            .then((item) => {
                setLoading(false)
                setCategoryData(item?.data);
        })
    }

    // get sizes 

    const getSizes =()=>{
        fetch("https://back.ifly.com.uz/api/sizes",{
            method:"GET",
            headers:{
                "Content-type":"application/json",
                "Authorization": `Bearer ${token}`
            }
        })
        .then((res)=>res.json())
        .then((item)=>{
            setSizesData(item?.data)
        })
    }


    // get colors

    const getColors =()=>{
        fetch("https://back.ifly.com.uz/api/colors",{
            method:"GET",
            headers:{
                "Content-type":"application/json",
                "Authorization": `Bearer ${token}`
            }
        })
        .then((res)=>res.json())
        .then((item)=>{
            setColorsData(item?.data)
        })
    }

    // get discount 

    const getDiscount =()=>{
        fetch("https://back.ifly.com.uz/api/discount",{
            method:"GET",
            headers:{
                "Content-type":"application/json",
                "Authorization": `Bearer ${token}`
            }
        })
        .then((res)=>res.json())
        .then((item)=>{
            setDiscountData(item?.data)
        })
    }


    const productCreate=(e)=>{
        e.preventDefault()
    }


    const editProduct =(e)=>{
        e.preventDefault()

    }


    useEffect(() => {
        getCategoryData()
        getSizes()
        getColors()
        getDiscount()
    }, [])

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
            <form  onSubmit={editData?editProduct:productCreate}>
            <div style={{
                marginBlock:"15px", display:"flex", flexDirection:"column",gap:"10px"
            }} className="space-y-4 mb-6">
                <label style={{fontWeight:"bold"}}>Product Title (English)</label>
                <input
                defaultValue={editData?editData.full_name:""}
                onChange={(e)=>setFullName(e.target.value)}
                required
                type="text"
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <label style={{fontWeight:"bold"}}>Product Title (Russian)</label>
                <input
                defaultValue={editData?editData.position_en:""}
                onChange={(e)=>setPositionEN(e.target.value)}
                required
                type="text"
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <label style={{fontWeight:"bold"}}>Product Title (German)</label>
                <input
                defaultValue={editData?editData.position_ru:""}
                onChange={(e)=>setPositionRU(e.target.value)}
                required
                type="text"
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <label style={{fontWeight:"bold"}}>Product Description (English)</label>
                <input
                defaultValue={editData?editData.position_de:""}
                onChange={(e)=>setPositionDE(e.target.value)}
                required
                type="text"
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                   <label style={{fontWeight:"bold"}}>Product Description (Russian)</label>
                <input
                defaultValue={editData?editData.position_de:""}
                onChange={(e)=>setPositionDE(e.target.value)}
                required
                type="text"
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                   <label style={{fontWeight:"bold"}}>Product Description (German)</label>
                <input
                defaultValue={editData?editData.position_de:""}
                onChange={(e)=>setPositionDE(e.target.value)}
                required
                type="text"
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                   <label style={{fontWeight:"bold"}}>Price</label>
                <input
                defaultValue={editData?editData.position_de:""}
                onChange={(e)=>setPositionDE(e.target.value)}
                required
                type="number"
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <label style={{fontWeight:"bold"}}>Minimal nechta sotish</label>
                <input
                defaultValue={editData?editData.position_de:""}
                onChange={(e)=>setPositionDE(e.target.value)}
                required
                type="number"
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                <label style={{fontWeight:"bold"}}>Category</label>
                <select style={{color:"black", backgroundColor:"white", border:"2px solid black", padding:"8px 16px", borderRadius:"5px"}} className='text-black bg-white'>
                    {
                        categoryData?.map((item,i)=>(
                            <option key={i} value={item?.name_en}><span>{item.name_en}</span></option>
                        ))
                    }
                </select>
                <label style={{fontWeight:"bold"}}>Image</label>
                    <div>
                        {
                            sizesData?.map((item,i)=>(
                                <span key={i}>
                                    <input width={30} height={30} type="checkbox" name="" id="" />
                                    <span>{item?.size}</span>
                                </span>

                            ))
                        }
                    </div>

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

export default ProductModal