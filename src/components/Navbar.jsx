import { useEffect, useRef, useState } from 'react'
import OverlayMenu from './OverlayMenu'
import { FiMenu } from "react-icons/fi";

function Navbar() {

 const [menu,setmenuopen]=useState(false);
 const [visible,setvisible]=useState(true);
 const [forceVisible,setForceVisible]=useState(false);

 const lastScrollY=useRef(0);
 const timerId=useRef(null);

 useEffect(()=>{

   const homeSection=document.querySelector("#home");
   const observer=new IntersectionObserver(([entry]) => {
      
      if(entry.isIntersecting){
        setForceVisible(true);
        setvisible(true);
      }

      else{
        setForceVisible(false);
      }
    
   },{threshold:0.1});

   if(homeSection) observer.observe(homeSection);
   return ()=>{
    if(homeSection) observer.unobserve(homeSection);
   }
 },[])

 useEffect(()=>{

  const handleScroll=()=>{

     if(forceVisible){
      setvisible(true);
      return;
     }

     const currentScrollY=window.scrollY;
     if(currentScrollY>lastScrollY.current){
        setvisible(false);
     }

     else{
      setvisible(true);

      if(timerId.current) clearTimeout(timerId.current);
      timerId.current=setTimeout(() => {
        setvisible(false)
      }, 3000);
     }

     lastScrollY.current=currentScrollY;
  }

  window.addEventListener("scroll",handleScroll);

  return ()=>{
    window.removeEventListener("scroll",handleScroll);
    if(timerId.current) clearTimeout(timerId.current);
  }
 },[forceVisible]);

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full flex items-center justify-between px-6 py-4 z-50 transition-transform duration-300 ${visible ? "translate-y-0" : "-translate-y-full"}`}>

        <div className="flex items-center space-x-2">
          <div className='text-1xl font-bold text-white hidden sm:block'>
            Kashish
          </div>
 
        </div>

        <div className='block lg:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2'>
        <button onClick={()=>setmenuopen(true)} className='text-white text-3xl justify-center focus:outline-none space-x-96' aria-label="open menu">
            <FiMenu />
        </button> 
        </div>

        <div className='hidden lg:block'>
           <a href='#contact' className='bg-linear-to-r from-pink-500 to-blue-500 text-white px-5 py-2 rounded-full font-medium shadow-lg hover:opacity-90 transition-opacity duration-300'>
              Reach out
           </a>
        </div>

      </nav>
      <OverlayMenu  isOpen={menu} onClose={()=> setmenuopen(false)} />
    </>
  )
}

export default Navbar
