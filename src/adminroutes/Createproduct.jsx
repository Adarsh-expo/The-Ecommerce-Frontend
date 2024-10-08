import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Adminmenu from '../utils/Adminmenu';
import '../styles/Createproduct.css'

import Header from '../utils/Header';
import axios from 'axios';
import { customToastOptions } from '../utils/Header';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';

function Createproduct() {
  document.title = "Createproduct";

  const navo=useNavigate()
  const fileinputref=useRef(null)
  const [subcateg, setSubcateg] = useState([]);
  const [image, setImage] = useState('');
  const [obi, setObi] = useState({
    name: '',
    description: '',
    price: '',
    quantity: '',
    photo: '',
    category: 'None',
    shipping: 1
  });

  const changeInsert = (e) => {
    setObi((prev) => ({ ...prev, [e.target.title]: e.target.value }));
  };

  useEffect(() => {
    console.log(obi);
  }, [obi]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      if (obi.category === "None") {
        toast.warn("Category is required");
      } else {
       
        
        const res = await axios.post(
          'https://ecommerce-backend-teif.onrender.com/api/v1/product/createproduct',
          obi,
          {
            withCredentials: true,
            headers: { "Content-Type": "multipart/form-data" }
          }
        );

       res.data.success ? toast.success(res.data.message, customToastOptions):toast.warn(res.data.message)
        console.log(res.data.message);
        fileinputref.current.value=''
        setObi({
          name: '',
          description: '',
          price: '',
          quantity: '',
          photo: '',
          category: 'None',
          shipping: 1
        })
        setImage('')
      }
    } catch (err) {
      toast.error(err.message);
      console.log(err.message);
    }
  };

  useEffect(() => {
    const subcategCall = async () => {
      const res = await axios.get('https://ecommerce-backend-teif.onrender.com/api/v1/category/alltypesubcategory');
      setSubcateg(res.data.allsubcategdata);
    };
    subcategCall();
  }, []);




  const[size,setsize]=useState(window.innerWidth)

  useEffect(()=>{
  window.addEventListener('resize',()=>{
  
    const sizewidth=window.innerWidth
    setsize(sizewidth)
  })
  
  
  },[])
console.log(size)
useEffect(()=>{console.log(size)},[size])


  return (
    <div className='h-screen w-screen overflow-x-hidden overflow-y-hidden'>
      <Header />
     
      <div className='flex  relative'>
      <button      className='absolute top-1 left-1 hover:scale-105'> <i className={`ri-menu-line  text-[1.4rem] text-red-600 ${size>500 && "hidden"} `}></i></button>
        <Adminmenu size={size}  setsize={setsize}/>
        <div className='flex flex-col items-center productright3    z-10 basis-4/5 overflow-y-scroll  h-[88vh] pb-16 pt-10   justify-center gap-[1rem] w-max'>
         
         
          <span className='lg:text-[2vw] text-[3vw] md:text-[2.5vw] font-normal mt-[10rem] '>Create Product</span>
          <form className='flex w-[100%] max-w-[544px]  px-[8px] py-[8px] items-center flex-col gap-[30px] rounded' onSubmit={submitHandler}>
            <select value={obi.category} onChange={changeInsert} title="category" className='pl-[4px] font-light outline-none w-[72%] border-[2px] h-[7vmin] bg-zinc-200 lg:text-[1.6vw]  md:text-[2vw]  text-[3vw] rounded-lg'>
              <option value=''>None</option>
              {subcateg.map((ele, index) => (
                <option key={index} value={ele._id}>{ele.name}</option>
              ))}
            </select>
            <input  ref={fileinputref}   required  type='file' accept='image/*' title='photo' placeholder='Image' onChange={(e) => { setObi((prev) => ({ ...prev, photo: e.target.files[0] })); setImage(URL.createObjectURL(e.target.files[0])) }} className='pl-[4px] font-light outline-none w-[72%] border-[2px] h-[7vmin] bg-zinc-200 lg:text-[1.6vw]  md:text-[2vw]  text-[3vw] rounded-lg' />
            {image && <div className='bg-white shadow-lg'><img className='w-[11vw] h-[10vw] object-cover' src={image} alt="product" /></div>}
            <input      type='text' value={obi.name} required placeholder='Name' title='name' onChange={changeInsert} className='pl-[4px] font-light outline-none w-[72%] border-[2px] h-[7vmin] bg-zinc-200 lg:text-[1.6vw]  md:text-[2vw]  text-[3vw] rounded-lg' />
            <textarea  required value={obi.description} placeholder='Description' rows='3' cols='30' title='description' onChange={changeInsert} className='pl-[4px] font-light outline-none w-[72%] border-[2px] bg-zinc-200 lg:text-[1.6vw]  md:text-[2vw]  text-[3vw] rounded-lg'></textarea>
            <input required value={obi.price} type='number' placeholder='Price' title='price' onChange={changeInsert} className='pl-[4px] font-light outline-none w-[72%] border-[2px] h-[7vmin] bg-zinc-200 lg:text-[1.6vw]  md:text-[2vw]  text-[3vw] rounded-lg' />
            <input  required   value={obi.quantity} type='number' placeholder='Quantity' title='quantity' onChange={changeInsert} className='pl-[4px] font-light outline-none w-[72%] border-[2px] h-[7vmin] bg-zinc-200 lg:text-[1.6vw]  md:text-[2vw]  text-[3vw] rounded-lg' />
            <select     onChange={changeInsert} title="shipping" className='pl-[4px] font-light outline-none w-[72%] border-[2px] h-[7vmin] bg-zinc-200 lg:text-[1.6vw]  md:text-[2vw]  text-[3vw] rounded-lg'>
              <option value='1'>Yes</option>
              <option value='0'>No</option>
              </select>
            <input type='submit' className='bg-orange-600 h-[5vh] w-fit px-2  lg:text-[1.6vw]  md:text-[2vw]  text-[3vw] rounded' />
          </form>
          
        </div>
      </div>
    </div>
  );
}

export default Createproduct;
