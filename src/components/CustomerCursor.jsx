import  { useState,useEffect } from 'react'
function CustomerCursor() {
 
    const [position,setposition]=useState({x:0 , y:0});

    useEffect(()=>{

        const moveHandler=(e)=>{
            setposition({
                x:e.clientX,y:e.clientY
            })
        };

        window.addEventListener("mousemove",moveHandler);

        return ()=>{
            window.removeEventListener("mousemove",moveHandler);

        }
    },[])
  return (
    <div className='pointer-events-none left-0 top-0 fixed z-9999' style={{transform:`translate(${position.x-40}px,${position.y-40}px)`}}>
      
    <div className='w-20 h-20 rounded-full bg-linear-to-r from-pink-500 to-blue-500 blur-3xl opacity-80'/>

    </div>
  )
}

export default CustomerCursor
