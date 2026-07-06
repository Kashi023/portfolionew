import { useState } from "react"
import CustomerCursor from "./components/CustomerCursor"
import Navbar from "./components/Navbar"
import About from "./sections/About"
import Contact from "./sections/Contact"
import Experience from "./sections/Experience"
import Footer from "./sections/Footer"
import Home from "./sections/Home"
import Projects from "./sections/Projects"
import Skills from "./sections/Skills"
import Testimonials from "./sections/Testimonials"
import IntroAnimationpn from "./components/IntroAnimatopn"

function App() {
  const [introDone,setIntroDone]=useState(false);
  
  return (
    <>
    {!introDone && <IntroAnimationpn onFinish={()=>setIntroDone(true)}/>}

    {introDone && (
    <div className="relative gradient text-white">
      <CustomerCursor />
      <Navbar />
      <Home />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Contact />
      <Footer />

    </div>
    )}
  </>
  )
}


export default App
