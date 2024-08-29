import { Outlet } from "react-router-dom";
import NavigationBar from "../NavigationBar/NavigationBar";

// import React icons
import { IoIosArrowUp } from "react-icons/io";

// import Layout style sheet css
import './Layout.css'
import { useEffect } from "react";


export default function Layout() {

       useEffect(function(){
              document.addEventListener('scroll', function(){
                     if(window.scrollY > 400){
                            document.querySelector('.btn-top').classList.add('btn-top_active')
                     }else{
                            document.querySelector('.btn-top').classList.remove('btn-top_active')
                     }
              })
              document.querySelector('.btn-top').addEventListener('click',function(){window.scrollTo(0, 0)})
       }, [])
       return (
              <>
                     <NavigationBar></NavigationBar>
                     <Outlet></Outlet>
                     <button className="btn-top | btn fixed flex items-center justify-center rounded-full"><IoIosArrowUp /></button>
              </>
       )
}
