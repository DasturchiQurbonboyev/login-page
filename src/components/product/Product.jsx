import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import ProductModal from '../modal/ProductModal';

const Product = () => {

  const token = localStorage.getItem("accestoken");

  const [productData, setProductData] = useState([]); 
  const [editData, setEditData] = useState(false);
  const [createProduct, setCreateProduct] = useState(false);
  
  console.log(productData);
  
  const getProducts = () => {
    fetch("https://testaoron.limsa.uz/api/product")
      .then((res) => res.json())
      .then((item) => {
        setProductData(item?.data?.products);
      })
  };

  useEffect(() => {
    getProducts();
  }, []);

  const deleteProduct =(id)=>{
    fetch(`https://testaoron.limsa.uz/api/product/${id}`,{
      method:"DELETE",
      headers:{
        "Content-type":"application/json",
        "Authorization": `Bearer ${token}`
      }
    })
    .then((res)=>res.json())
    .then((item)=>{
      if(item?.success){
        getProducts()
        toast.success("Malumot o'chirildi")
      }else{
        toast.error("Xatolik iltimos qaytadan urunib ko'ring")
      }
    })
  }

  return (
    <>
    <div className='bg-white '>
      <div className="category__header flex justify-between items-center">
        <h1 className="category__title text-[22px]"></h1>
        <button  
        onClick={()=>{  
            setCreateProduct(true)  
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
              <th style={{ padding: '12px 16px', textAlign: 'center' }}>Title</th>
              <th style={{ padding: '12px 16px', textAlign: 'center' }}>Description</th>
              <th style={{ padding: '12px 16px', textAlign: 'center' }}>Price</th>
              <th style={{ padding: '12px 16px', textAlign: 'center' }}>Category</th>
              <th style={{ padding: '12px 16px', textAlign: 'center' }}>Colors</th>
              <th style={{ padding: '12px 16px', textAlign: 'center' }}>Sizes</th>
              <th style={{ padding: '12px 16px', textAlign: 'center' }}>Discount</th>
              <th style={{ padding: '12px 16px', textAlign: 'center' }}>Materials</th>
              <th style={{ padding: '12px 16px', textAlign: 'center' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
           {
            productData?.map((el, index) => (
              <tr key={index} style={{ border: '1px solid #eee' }}>
                <td style={{ padding: '12px 16px' }}>{index+1}</td>
                <td style={{ padding: '12px 16px' }}>
                  <img style={{width:"200px", height:"100px", objectFit:"cover"}} src={`https://testaoron.limsa.uz/${el?.images[0]}`} alt="team" />
                </td>
                <td style={{ padding: '12px 16px' }}>{el?.title_en}</td>
                <td style={{ padding: '12px 16px' }}>{el?.description_en}</td>
                <td style={{ padding: '12px 16px' }}>{el?.price}</td>
                <td style={{ padding: '12px 16px' }}>{el?.category?.name_en}</td>
                <td style={{ padding: '12px 16px' }}>{el?.colors?.map((el)=>el?.color_en).join(", ")}</td>
                <td style={{ padding: '12px 16px' }}>{el?.sizes?.map((el)=>el?.size).join(", ")}</td>
                <td style={{ padding: '12px 16px' }}>{el?.discount?.discount}%</td>
                <td style={{ padding: '12px 16px' }}>sq:{el?.materials?.sq}%</td>
                <td style={{ padding: '12px 16px', textAlign:"center"}}>
                    <button
                    onClick={()=>{
                      setEditData(el)
                    }}
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
                    onClick={()=>{
                      deleteProduct(el?.id)
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
      (createProduct || editData) 
      &&
      <ProductModal editData={editData} onEdit={setEditData} onClose={setCreateProduct} /> 
    }
  </>
  )
}

export default Product