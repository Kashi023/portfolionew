import { useEffect, useState ,useRef, useMemo} from 'react'
import img1 from "../assets/img1.png"
import img2 from "../assets/img2.png"
import {motion} from "framer-motion"
import { AnimatePresence, useMotionValueEvent, useScroll } from 'framer-motion'



const useIsMobile = (query = "(max-width:639px)") => {

  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === "undefined") return false;

    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mql = window.matchMedia(query);

    const handler = (e) => {
      setIsMobile(e.matches);
    };

    mql.addEventListener("change", handler);

    return () => {
      mql.removeEventListener("change", handler);
    };
  }, [query]);

  return isMobile;
};

function Projects() {

  
  const isMobile=useIsMobile();
  const sceneRef=useRef(null);

  const projects=useMemo(()=>[
    {title: "Resume Analyzer" , 
      link: "https://github.com/Kashi023/Resume-Analyzer",
      bgColor : "#0d4d3d",
      image:isMobile ? img1 :img1
    },

    {title: "Nature Service", 
      link: "https://github.com/Kashi023/project3/blob/main/projectnature.html",
      bgColor : "#3884d3",
      image:isMobile ? img2 :img2
    },

   

  ],[isMobile]);

  const {scrollYProgress}=useScroll({
    target:sceneRef,
    offset:["start start","end end"]
  })

  const thresholds=projects.map((_,i)=>(i+1)/projects.length);

  const [activeIndex,setActiveIndex]=useState(0);
 //it react when value of motion changes
  useMotionValueEvent(scrollYProgress,"change",(v)=>{
    const idx=thresholds.findIndex((t)=>v<=t);

    setActiveIndex(idx === -1 ? thresholds.length-1 :idx);
  });

  const activeProject=projects[activeIndex];

  return (
    <section ref={sceneRef} id="projects" className='relative text-white' style={{height:`${100*projects.length}vh`,backgroundColor:activeProject.bgColor,transition:"background-color 400ms ease"}}>

        <div className='sticky top-0 h-screen flex flex-col items-center justify-center'>
          <h2 className={`text-3xl font-semibold z-10 text-center ${
            isMobile ? "mt-4" : "mt-8"
          }`}>My Work</h2>

        <div className={`relative w-full flex-1 flex items-center justify-center ${isMobile ? "-mt-4" :""}`}>
          {projects.map((projects,idx)=>(
             <div key={projects.title} className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 
             ${activeIndex === idx ? "opacity-80 z-10" : "opacity-0 z-0 sm:z-10"}`} style={{width:"65%",maxWidth:"700px"}}>
          <AnimatePresence mode='wait'>
            {activeIndex===idx && (
              <motion.h3 key={projects.title} initial={{opacity:0 , y:-30}} 
              animate={{opacity:1,y:0}} exit={{opacity:0,y:30}} transition={{duration:0.5,ease:"ease-out"}} 
              className="block text-center text-[clamp(2rem,6vw,5rem)] text-white/95 sm:absolute sm:-top-20 sm:left-[35%] lg:left-[-5%] sm:mb-0 italic font-semibold"
              style={{zIndex:5,
                textAlign:isMobile ?"center" : "left"
              }}>
                {projects.title}
              </motion.h3>
            )}    
          </AnimatePresence>
          
          <div className={`relative w-full overflow-hidden bg-black/20 shadow-2xl md:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.7)]  ${isMobile ? "mb-6 rounded-lg":"mb-10 sm:mb-12 rounded-xl"} h-[62vh] sm:h-[66vh]`}
          style={{zIndex:10,transition:"box-shadow 250ms ease"}}>

            <img src={projects.image} alt={projects.title} className='w-full h-full object-cover drop-shadow-xl md:drop-shadow-2xl'
             style={{
              position:"relative",
              zIndex:10,
              filter:"drop-shadow(0, 16px 40px rgba(0,0,0,0.65))",
              transition:"filter 200ms ease"
             }}
             loading='lazy'
             />
             
             <div className='pointer-events-none absolute inset-0' style={{zIndex:11,background:"linear-gradient(180deg,rgba(0,0,0,0.12) 0% , rgba(0,0,0,0) 40%)"}}>
              </div>
          </div>
          </div>
          ))}
        </div>

        <div className={`absolute ${isMobile ? "bottom-20" : "bottom-10"}`}>
          <a href={activeProject?.link} target='_blank' rel="noopener noreferrer" className='inline-block px-6 py-3 font-semibold rounded-lg bg-white text-black hover:bg-gray-200 transition-all' aria-label={`view ${activeProject?.title}`}>View Project</a>
        </div>
        </div>
    </section>
  )
}


export default Projects
