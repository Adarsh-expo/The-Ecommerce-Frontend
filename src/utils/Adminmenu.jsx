import React from 'react'
import { NavLink } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import '../styles/Createproduct.css'
function Adminmenu({size,setsize}) {
    const loc=useLocation();
console.log(size)
function sizecontrol(er){
  setsize(500);
  }
  return (
    <div className={`sidepanel3 h-[88vh] mr-[2rem]  basis-1/5  ${size<501 &&"ml-[-15rem]"}  shadow-xl`}>
      <button   onClick={()=>{sizecontrol(500)}}  className={`ml-[90%]  ${size>501 &&"hidden" }    mt-[2px]`}><i class="ri-close-line text-red-500 "></i></button>


<div className='mt-[2rem] text-[2vw]  ml-[0.5rem]'>Admin Dashboard</div>
<div className='w-[20vw] h-[50vh]  flex flex-col gap-6    mt-[2rem] ml-[1.3rem] font-light bg-whitem  '>

<NavLink to='/dashboard/admin/create-category' ><div       className={`text-[1.5vw]  options h-[3rem] w-[70%] pl-[1vw] flex items-center rounded ${loc.pathname.includes('create-category')?'bg-[#0190FE] text-white':''}`}>Create Category</div></NavLink>
<NavLink to='/dashboard/admin/create-product'  ><div   className={`text-[1.5vw] options flex items-center h-[3rem]      w-[70%] pl-[1vw] rounded ${loc.pathname.includes('create-product')?'bg-[#0190FE] text-white ':''}`} >Create Product</div></NavLink>
<NavLink  to='/dashboard/admin/users'   ><div   className={`text-[1.5vw] w-[70%] options flex items-center h-[3rem]          pl-[1vw] rounded ${loc.pathname.includes('users')?'bg-[#0190FE] text-white ':''}`}    >Users</div></NavLink>
<NavLink  to='/dashboard/admin/adminorder'   ><div   className={`text-[1.5vw] w-[70%] options flex items-center h-[3rem]          pl-[1vw] rounded ${loc.pathname.includes('adminorder')?'bg-[#0190FE]  text-white':''}`}    >Usersorder</div></NavLink>
<NavLink  to='/dashboard/admin/products'   ><div   className={`text-[1.5vw] w-[70%] options flex items-center h-[3rem]          pl-[1vw] rounded ${loc.pathname.includes('products')?'bg-[#0190FE]  text-white':''}`}    >Products</div></NavLink>

</div>


    </div>
  )
}

export default Adminmenu