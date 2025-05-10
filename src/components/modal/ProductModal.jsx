import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const ProductModal = ({editData, onEdit, onClose}) => {

    const token = localStorage.getItem("accestoken")
    const [loading, setLoading] = useState(false)
    const [categoryData, setCategoryData] = useState([])
    const [sizesData, setSizesData] = useState([])
    

    // console.log(selectedSizes, "sizesData");
    // console.log(selectedSizes, "colorData");
    
    const [colorsData, setColorsData] = useState([])
    const [discountData, setDiscountData] = useState([])
    const [material, setMaterial] = useState(false)

    // console.log(editData);

    const [titleDe, setTitleDe] = useState("")
    useEffect(() => {
  if (editData) {
     if (editData && editData.description_ru !== undefined) {
    setDescriptionRu(editData.description_ru);
  }
    setTitleDe(editData.title_de || "");
    setTitleRu(editData.title_ru || "");
    setTitleEn(editData.title_en || "");
    setDescriptionDe(editData.description_de || "");
    setDescriptionRu(editData.description_ru || "");
    setDescriptionEn(editData.description_en || "");
    setPrice(editData.price || "");
    setMinSell(editData.min_sell || "");
    // setCategoryId(editData.category_id || "");
    // setColorsId(editData.colors_id || "");
    // setSelectedSizesId(editData.sizes_id || "");
    setMaterial(editData.material || "");
    setdiscountData(editData.discount_id || "");
  }
}, [editData?.description_en]);
    const [titleRu, setTitleRu] = useState("")
    const [titleEn, setTitleEn] = useState("")
    const [descriptionDe, setDescriptionDe] = useState("")
    const [descriptionRu, setDescriptionRu] = useState("")
    const [descriptionEn, setDescriptionEn] = useState("")
    const [price, setPrice] = useState("")
    const [minSell, setMinSell] = useState()
    const [categoryId, setCategoryId] = useState()
    const [selectedSizesId, setSelectedSizesId] = useState([]);
    const handleSizeChange = (e, sizeObj) => {
            const { checked } = e.target;
            if (checked) {
                setSelectedSizesId(prev => [...prev, sizeObj.id]);
            } else {
                setSelectedSizesId(prev => prev.filter(id => id !== sizeObj.id));
            }
        };
    const [colorsId, setColorsId] = useState()
    const [chekColorId, setChekColorId] = useState([])
    const handleColorChange = (e, colorObj) => {
        const { checked } = e.target;
        if (checked) {
            setChekColorId(prev => [...prev, colorObj.id]);
        } else {
            setChekColorId(prev => prev.filter(id => id !== colorObj.id));
        }
    }
    const [discountId, setDiscountId] = useState("")
    console.log(discountId);
    
    const [materials, setMaterials] = useState({})
    const handleMaterialChange = (e) => {
    const { name, value } = e.target;

    setMaterials((prev) => ({
            ...prev,
            [name]: value
        }));
    };
    const [img, setImg] = useState("")

    // console.log(sizesData);

    
    const formData = new FormData()
    formData.append("title_de", titleDe)
    formData.append("title_ru", titleRu)
    formData.append("title_en", titleEn)
    formData.append("description_de", descriptionDe)
    formData.append("description_ru", descriptionRu)
    formData.append("description_en", descriptionEn)
    formData.append("price", price)
    formData.append("min_sell", minSell)
    formData.append("category_id", categoryId)
    selectedSizesId?.forEach(id => {
        formData.append("sizes_id[]", id);
    });
    colorsId?.forEach(id => {
        formData.append("colors_id[]", chekColorId);
    });
    formData.append("discount_id", discountId)
    formData.append("materials", JSON.stringify({
        cotton: materials.cotton,
        wool: materials.wool
    }))
    formData.append("files", img)
    // get category   
    const getCategoryData = () => {
        fetch("https://testaoron.limsa.uz/api/category", {
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
        fetch("https://testaoron.limsa.uz/api/sizes",{
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
        fetch("https://testaoron.limsa.uz/api/colors",{
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
        fetch("https://testaoron.limsa.uz/api/discount",{
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
        fetch("https://testaoron.limsa.uz/api/product",{
            method:"POST",
            headers:{"Authorization": `Bearer ${token}`},
            body: formData
        })
        .then((res)=>res.json())
        .then((item)=>{
            if (item?.success) {
                getProductsData()
                toast.success("Malumot qo'shildi")
                onClose(false)
                onEdit(false)
                setLoading(false)
            } else {
                toast.error("Xatolik iltimos qaytadan urunib ko'ring")
            }
        })
        .catch((err)=>{
            console.log(err);
            
        })
    }


    const editProduct =(e)=>{
        e.preventDefault()
        fetch(`https://testaoron.limsa.uz/api/product/${editData?.id}`,{
            method:"PATCH",
            headers:{"Authorization": `Bearer ${token}`},
            body: formData
        })
        .then((res)=>res.json())
        .then((item)=>{
            if (item?.success) {
                toast.success("Malumot o'zgartirildi")
                onClose(false)
                onEdit(false)
                getProductsData()
                setLoading(false)
            } else {
                toast.error("Xatolik iltimos qaytadan urunib ko'ring")
            }
        })
        .catch((err)=>{
            console.log(err);
            
        })

    }


    useEffect(() => {
        getCategoryData()
        getSizes()
        getColors()
        getDiscount()
    }, [])

  return (
    <>
        <div className="fixed    inset-0 bg-[#7e7b7b80] bg-opacity-50 flex items-center justify-center z-[100000]">
        <div className="bg-white overflow-auto h-[80vh] rounded-lg shadow-lg w-[800px] max-w-xxl" style={{ padding: 24 }}>
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
                value={titleEn}
                // defaultValue={editData?editData.title_en:""}
                onChange={(e)=>setTitleEn(e.target.value)}
                required
                type="text"
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <label style={{fontWeight:"bold"}}>Product Title (Russian)</label>
                <input
                value={titleRu}
                onChange={(e)=>setTitleRu(e.target.value)}
                required
                type="text"
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <label style={{fontWeight:"bold"}}>Product Title (German)</label>
                <input
                value={titleDe}
                onChange={(e)=>setTitleDe(e.target.value)}
                required
                type="text"
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <label style={{fontWeight:"bold"}}>Product Description (English)</label>
                <input
                value={descriptionEn}
                onChange={(e)=>setDescriptionEn(e.target.value)}
                required
                type="text"
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                   <label style={{fontWeight:"bold"}}>Product Description (Russian)</label>
                <input
                value={descriptionRu}
                onChange={(e)=>setDescriptionRu(e.target.value)}
                required
                type="text"
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                   <label style={{fontWeight:"bold"}}>Product Description (German)</label>
                <input
                value={descriptionDe}
                onChange={(e)=>setDescriptionDe(e.target.value)}
                required
                type="text"
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                   <label style={{fontWeight:"bold"}}>Price</label>
                <input
                value={price}
                onChange={(e)=>setPrice(e.target.value)}
                required
                type="number"
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <label style={{fontWeight:"bold"}}>Minimal nechta sotish</label>
                <input
                value={minSell}
                onChange={(e)=>setMinSell(e.target.value)}
                required
                type="number"
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                <label style={{fontWeight:"bold"}}>Category</label>
                <select 
                    value={editData ? categoryId : ""} // controlled select
                    onChange={(e) => setCategoryId(e.target.value)}
                    style={{
                        color: "black",
                        backgroundColor: "white",
                        border: "2px solid black",
                        padding: "8px 12px",
                        borderRadius: "5px"
                    }}
                    className='text-black bg-white'
                    >
                    {/* <option value="">Kategoriya tanlang</option> */}
                    {
                        categoryData?.map((item, i) => (
                        <option key={i} value={item.id}>
                            {item.name_en}
                        </option>
                        ))
                    }
                    </select>

                <label style={{fontWeight:"bold"}}>Sizes</label>
                    <div>
                       {sizesData?.map((item, i) => (
                            <span key={i} style={{ marginRight: "8px" }}>
                                <input
                                    type="checkbox"
                                    checked={selectedSizesId?.includes(item.id)}
                                    onChange={(e) => handleSizeChange(e, item)}
                                    name="sizes_id[]"
                                    style={{ marginRight: "8px" }}
                                />
                                <span>{item.size}</span>
                            </span>
                        ))}
                    </div>


                <label style={{fontWeight:"bold"}}>Colors</label>
                <div>
                    {
                        colorsData?.map((item,i)=>(        
                            <span key={i} style={{marginRight:"8px"}}>
                                <input
                                checked={colorsId?.includes(item.id)}
                                onChange={(e) => handleColorChange(e, item)}
                                style={{marginRight:"8px"}} width={30} height={30} type="checkbox" name="" id="" />
                                <span>{item?.color_en}</span>
                            </span>
                        ))
                    }
                </div>
                
                <label style={{fontWeight:"bold"}}>Discount</label>
                <select
                    value={discountId}  // Value hozirgi discountId bilan boshqariladi
                    onChange={(e) => setDiscountId(e.target.value)}
                 style={{
                        color: "black", 
                        backgroundColor: "white",
                        border: "2px solid black",
                        padding: "8px 12px",
                        borderRadius: "5px"
                    }}
                name="" id="">
                    {
                        discountData?.map((item,i)=>(
                            <option key={i} value={item?.id}>{item.discount}</option>
                        ))
                    }
                </select>

                <label style={{fontWeight:"bold"}}>Materials</label>

                <div>
                    {
                        material &&
                            <div className='flex'>
                                <input type="text" name='cotton' onChange={handleMaterialChange} style={{marginRight:"8px"}} className="px-3 py-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  required />
                                <input type="number" name='wool' onChange={handleMaterialChange}  style={{marginRight:"8px"}} className="px-3 py-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  required />
                                <button type="button" style={{padding:"8px 16px"}} className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Remove</button>
                            </div>
                        
                    }
                    <button onClick={()=>setMaterial(true)} style={{padding:"8px 16px", marginTop:"8px"} } type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Add Material</button>
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