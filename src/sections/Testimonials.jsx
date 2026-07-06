import k from "../assets/k.jpeg"
import {motion} from "framer-motion"

const testimonials=[
 {
   name: "Yash Verma",
   role:"Software Engineer at HCL Technologies",
   review:
   "kashish is a visionay developer. His attention to detail and creativity blew us away",
   image:k
 },

 {
   name: "Yash Verma",
   role:"Software Engineer at HCL Technologies",
   review:
   "kashish is a visionay developer. His attention to detail and creativity blew us away",
   image:k
 },

 {
    name:"Yash Verma",
   role:"Software Engineer at HCL Technologies",
   review:
   "kashish is a visionay developer. His attention to detail and creativity blew us away",
   image:k
 },

 {
    name:"Yash Verma",
   role:"Software Engineer at HCL Technologies",
   review:
   "kashish is a visionay developer. His attention to detail and creativity blew us away",
   image:k
 }

]      
function Testimonials() {
 
  return (
    <section id="testimonials" className='relative min-h-screen bg-black text-white flex flex-col items-center px-6'>

      <motion.h2 className="text-4xl font-bold mb-16" initial={{opacity:0 , y:-50}} 
      animate={{opacity:1 , y :0}} transition={{duration:0.6}}>
          What People Say
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-10 max-w-4xl w-full">
        {testimonials.map((t,i)=>(
          <motion.div key={t.name+1} initial={{opacity:0 , y:50}} whileInView={{opacity:1,y:0}} transition={{duration:0.5 , delay:i*0.2}} 
          viewport={{once:true}} className="w-full bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 flex flex-col items-center text-center transform transition duration-500
          hover:scale-105 hover:-rotate-1">
            <img src={t.image} alt={t.name} className="w-15 h-15 rounded-full border-2 border-white/40 mb-4 object-cover" loading="lazy"/>
            <p className="text-gray-200 italic mb-4 ">
              {t.review}
            </p>

            <h3 className="text-lg font-semibold">
              {t.name}
            </h3>

            <p className="text-sm text-gray-400">
              {t.role}
            </p>

          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default Testimonials
