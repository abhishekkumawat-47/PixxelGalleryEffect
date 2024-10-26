import React, { useEffect } from "react";
import Lenis from "lenis";
import { useGSAP } from "@gsap/react";
import gsap from "gsap"
import {ScrollTrigger} from "gsap/all";
import "./index.css";
import { useRef } from "react";

// Debounce function to limit the rate of function calls
const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};
debounce()

const App = () => {
  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis();

    lenis.on('scroll', (e) => {
    // Add a parallax effect to the background
    const parallaxBg = document.querySelector('.parallax-bg');
    if (parallaxBg) {
      const yPos = -(e.animatedScroll * 0.15);
      gsap.to(parallaxBg, {
        y: yPos,
        ease: 'none',
        duration: 0.5
      });
    }

    // Add a fade-in effect for elements as they enter the viewport
    const fadeElems = document.querySelectorAll('.fade-in');
    fadeElems.forEach(elem => {
      const rect = elem.getBoundingClientRect();
      const isInView = (rect.top <= window.innerHeight * 0.75 && rect.bottom >= 0);
      if (isInView) {
        gsap.to(elem, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power2.out'
        });
      }
    });

    // Add a subtle rotation effect to certain elements
    const rotateElems = document.querySelectorAll('.rotate-on-scroll');
    rotateElems.forEach(elem => {
      const rotateAmount = (e.animatedScroll % 360) * 0.05;
      gsap.to(elem, {
        rotation: rotateAmount,
        duration: 0.5,
        ease: 'none'
      });
    });
    });
    
    // Synchronize Lenis scrolling with GSAP's ScrollTrigger plugin
    lenis.on('scroll', ScrollTrigger.update);
    
    // Add Lenis's requestAnimationFrame (raf) method to GSAP's ticker
    // This ensures Lenis's smooth scroll animation updates on each GSAP tick
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000); // Convert time from seconds to milliseconds
    });
    
    // Disable lag smoothing in GSAP to prevent any delay in scroll animations
    gsap.ticker.lagSmoothing(0);
    
    // Use requestAnimationFrame to continuously update the scroll
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  });

  useGSAP(()=>{
    document.querySelectorAll(".elem").forEach(elem =>{
      let image = elem.querySelector("img")
      let tl = gsap.timeline()
      let xTransform =  gsap.utils.random(-100,100);
      tl
        .set(image,{
          transformOrigin: `${xTransform <0 ? 0 : "100%"}`
        },"start")
        .to(image , {
          scale: 0,
          ease:'none',
          scrollTrigger:{
            trigger:elem,
            start: "top top",
            end:"bottom top",
            scrub:true
          }
      },"start")
      .to(elem,{
        xPercent:xTransform,
        ease:"power4.inOut",
        scrollTrigger:{
          trigger:elem,
          start: "top bottom",
          end:"bottom top",
          scrub:true
        }
      },"start")
    })
  })
  return (
  <div className="w-full bg-zinc-900 ">
    <div className="grid grid-cols-8 grid-rows-20 gap-2 overflow-hidden">
      <div className="elem col-span-1 row-span-1" style={{ '--r': 3, '--c': 2 }}>
        <img src="./public/images/1.jpg" alt=" image 1" className="w-[200px] h-[200px] object-cover" />
      </div>
      <div className="elem col-span-1 row-span-1" style={{ '--r': 3, '--c': 7 }}>
        <img src="./public/images/2.jpg" alt=" image 2" className="w-[200px] h-[200px] object-cover" />
      </div>
      <div className="elem col-span-1 row-span-1" style={{ '--r': 8, '--c': 1 }}>
        <img src="./public/images/3.jpg" alt=" image 3" className="w-[200px] h-[200px] object-cover" />
      </div>
      <div className="elem col-span-1 row-span-1" style={{ '--r': 8, '--c': 5 }}>
        <img src="./public/images/4.jpg" alt=" image 4" className="w-[200px] h-[200px] object-cover" />
      </div>
      <div className="elem col-span-1 row-span-1" style={{ '--r': 12, '--c': 3 }}>
        <img src="./public/images/5.jpg" alt=" image 5" className="w-[200px] h-[200px] object-cover" />
      </div>
      <div className="elem col-span-1 row-span-1" style={{ '--r': 12, '--c': 8 }}>
        <img src="./public/images/6.jpg" alt=" image 6" className="w-[200px] h-[200px] object-cover" />
      </div>
      <div className="elem col-span-1 row-span-1" style={{ '--r': 15, '--c': 2 }}>
        <img src="./public/images/7.jpg" alt=" image 7" className="w-[200px] h-[200px] object-cover" />
      </div>
      <div className="elem col-span-1 row-span-1" style={{ '--r': 15, '--c': 6 }}>
        <img src="./public/images/8.jpg" alt=" image 8" className="w-[200px] h-[200px] object-cover" />
      </div>
      <div className="elem col-span-1 row-span-1" style={{ '--r': 1, '--c': 4 }}>
        <img src="./public/images/9.jpg" alt=" image 9" className="w-[200px] h-[200px] object-cover" />
      </div>
      <div className="elem col-span-1 row-span-1" style={{ '--r': 1, '--c': 7 }}>
        <img src="./public/images/10.jpg" alt=" image 10" className="w-[200px] h-[200px] object-cover" />
      </div>
      <div className="elem col-span-1 row-span-1" style={{ '--r': 6, '--c': 1 }}>
        <img src="./public/images/11.jpg" alt=" image 11" className="w-[200px] h-[200px] object-cover" />
      </div>
      <div className="elem col-span-1 row-span-1" style={{ '--r': 6, '--c': 8 }}>
        <img src="./public/images/12.jpg" alt=" image 12" className="w-[200px] h-[200px] object-cover" />
      </div>
      <div className="elem col-span-1 row-span-1" style={{ '--r': 18, '--c': 3 }}>
        <img src="./public/images/13.jpg" alt=" image 13" className="w-[200px] h-[200px] object-cover" />
      </div>
      <div className="elem col-span-1 row-span-1" style={{ '--r': 18, '--c': 5 }}>
        <img src="./public/images/14.jpg" alt=" image 14" className="w-[200px] h-[200px] object-cover" />
      </div>
      <div className="elem col-span-1 row-span-1" style={{ '--r': 10, '--c': 2 }}>
        <img src="./public/images/15.jpg" alt=" image 15" className="w-[200px] h-[200px] object-cover" />
      </div>
      <div className="elem col-span-1 row-span-1" style={{ '--r': 10, '--c': 7 }}>
        <img src="./public/images/16.jpg" alt=" image 16" className="w-[200px] h-[200px] object-cover" />
      </div>
      <div className="elem col-span-1 row-span-1" style={{ '--r': 20, '--c': 1 }}>
        <img src="./public/images/17.jpg" alt=" image 17" className="w-[200px] h-[200px] object-cover" />
      </div>
      <div className="elem col-span-1 row-span-1" style={{ '--r': 20, '--c': 6 }}>
        <img src="./public/images/18.jpg" alt=" image 18" className="w-[200px] h-[200px] object-cover" />
      </div>
      <div className="elem col-span-1 row-span-1" style={{ '--r': 4, '--c': 4 }}>
        <img src="./public/images/20.jpg" alt=" image 19" className="w-[200px] h-[200px] object-cover" />
      </div>
      <div className="elem col-span-1 row-span-1" style={{ '--r': 4, '--c': 8 }}>
        <img src="./public/images/19.jpg" alt=" image 20" className="w-[200px] h-[200px] object-cover" />
      </div>
    </div>
    <div className="fixed top-0 left-0 w-screen h-screen flex flex-col items-center justify-center  bg-opacity-50 z-50">
      <h1 className="text-8xl font-semibold text-white mb-4 uppercase">Pixxel's Gallery</h1>
      <h2 className="text-5xl font text-white ">Explore Beautiful Images</h2>
    </div>
  
    <div className="w-full h-screen bg-[#D1D1D1] flex flex-col items-center justify-center mx-auto py-[200px] relative z-[999] text-center">
    <p className="text-2xl w-3/4  text-black-700 leading-[2.2rem] font-bold font-small">
      Pixxel is a vibrant photography and filmmaking club dedicated to capturing life's beautiful moments. Our passionate community of visual storytellers explores the art of imagery through various mediums, from still photography to dynamic filmmaking. We offer workshops, collaborative projects, and exhibitions to nurture creativity and technical skills. Join Pixxel to embark on a journey of visual exploration and artistic growth.
    </p>
    </div>
  </div>
  )
};


export default App;
