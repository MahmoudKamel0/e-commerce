// import React Router Dom
import { Link , NavLink, useNavigate } from 'react-router-dom'

// import React Icons
import { FaFacebookF , FaInstagram , FaTiktok , FaLinkedinIn , FaYoutube } from "react-icons/fa6";
import { CiShoppingCart } from "react-icons/ci";
import { AiOutlineUser } from "react-icons/ai";
import { RiMenu4Fill } from "react-icons/ri";
import { IoIosArrowDown , IoIosLogOut} from "react-icons/io";
import { PiUserCircleThin } from "react-icons/pi";

// imports photo part NavigationBar
import logo from '../../assets/logo.webp'
import user from '../../assets/images.png'

// import NavigationBar style sheet css
import './NavigationBar.css'

// context user
import { userContext } from '../../contextStateManagement/userContext';
import { useContext, useState } from 'react';

// import martial UI
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';



export default function NavigationBar() {
       const [isOpenMenuNav,setIsOpenMenuNav] = useState(false)
       const handleOpenMenuNav = ()=>setIsOpenMenuNav(!isOpenMenuNav)

       const navigate = useNavigate()

       const [isLoading,setIsLoading] = useState()
       const [showDropListProfile, setShowDropListProfile] = useState()
       const {nameUser ,isUser , setIsUser} = useContext(userContext)

       // length Cart
       const token = {token:localStorage.getItem('userToken')}
       function getLengthCart(){
              return axios.get('https://ecommerce.routemisr.com/api/v1/cart',{headers:token})
       }
       let {data} = useQuery({
              queryKey: ['cartLengthProducts'],
              queryFn:getLengthCart,
              refetchInterval: 1000,
       }) 
       

       // When logout User
       function logOut(){
              setIsLoading(true)
              setTimeout(() => {
                     setIsLoading(false)
                     localStorage.removeItem('userToken')
                     setIsUser(null)
                     navigate('/')
              }, 3000);
       }

       
       return (
              <>
              {/* show loading when logout */}
              <div className={`loading-page | ${isLoading === true ? 'block' : 'hidden'}`}>
              <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open}>
                     <CircularProgress color="inherit" />
              </Backdrop>
              </div>

              <nav className='navigation | flex items-center justify-between'>
                     {/* Logo website  */}
                     <Link to='/' className='logo | inline-block'><img src={logo} alt="" width={50} loading="lazy"/></Link>

                     {/* Menu navigation */}
                     <menu className='w-full flex items-center justify-end lg:justify-between'>
                            {/* links part */}
                            <ul className={`menu-links | ${isOpenMenuNav ? 'absolute' : 'hidden'} lg:flex items-center justify-between z-10`}>
                                   <li><NavLink to='/'>Home</NavLink></li>
                                   <li><NavLink to='/Products'>Products</NavLink></li>
                                   <li><NavLink to='/Products'>Categories</NavLink></li>
                                   <li><NavLink to='/Brands'>Brands</NavLink></li>
                            </ul>

                            {/* social and login register part */}
                            <div className="part-login-social | flex items-center justify-between">            
                                   {!isUser ?          
                                   <ul className='social-media | hidden md:flex items-center justify-between'> 
                                          <li ><Link to=''><FaFacebookF /></Link></li>
                                          <li ><Link to=''><FaInstagram /></Link></li>
                                          <li ><Link to=''><FaTiktok /></Link></li>
                                          <li ><Link to=''><FaLinkedinIn /></Link></li>
                                          <li ><Link to=''><FaYoutube /></Link></li>
                                   </ul>
                                   : null}

                                   <div className="login-register | flex items-center">
                                          {/* If the user is not logged in */}
                                          {!isUser ?
                                          <>
                                          <Link to='/Login'><AiOutlineUser className='mr-[5px]' size={20} />Login</Link>
                                          <Link to='/Register'>Register</Link>
                                          </>

                                          // If the user is logged in
                                          :
                                          <div className="profile | flex items-center relative" onClick={()=>!showDropListProfile ? setShowDropListProfile(true) : setShowDropListProfile(false) }>
                                                 <span className="name | flex items-center"><IoIosArrowDown className='mr-2' /> <p>{nameUser}</p></span>
                                                 <div className="photo"><img className='rounded-full ms-5' src={user} alt="user" width={40} loading="lazy" /></div>

                                                 {/* drop list User */}
                                                 <ul className={`drop-user-list | absolute right-0 z-10 rounded ${showDropListProfile ? 'block' : 'hidden'}`}>
                                                        <li className="item | rounded">Profile <PiUserCircleThin size={20} /></li>
                                                        <li className="item | rounded">Orders <PiUserCircleThin size={20} /></li>
                                                        <li onClick={logOut} className="item | rounded">Sign out <IoIosLogOut /></li>
                                                 </ul>
                                          </div>
                                          }
                                   </div>


                                   {/* cart part */}
                                   <Link className='cart | relative flex ms-1' to='/Cart'>
                                          <CiShoppingCart size={25} />
                                          <span className="count">{localStorage.getItem('userToken') ? data?.data.numOfCartItems : 0}</span>
                                   </Link>
                                   
                                   {/* button menu responsive */}
                                   <button onClick={handleOpenMenuNav} className='btn-menu | block lg:hidden ms-5'><RiMenu4Fill size={30} /></button>

                            </div>
                     </menu>
              </nav>
              </>
       )
}
