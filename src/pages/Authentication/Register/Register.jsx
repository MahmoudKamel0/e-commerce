// import router dom
import { Link, useNavigate } from 'react-router-dom'

// import React icons
import { FaHeadphonesSimple } from "react-icons/fa6";

// import Register style sheet css
import './Register.css'

// import Formik library for handle form data and send data to backend
import { useFormik } from 'formik';

// import axios library for handel API
import axios from 'axios';

// import Material UI for فo use  many ready of components
import { useState } from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

// import library yup 
import * as Yup from 'yup';


export default function Register() {

       let navigate = useNavigate() 
       const [registerStatus, setRegisterStatus] = useState('')
       const [isLoading, setIsLoading] = useState(false)

       // send data user to server database
       function sendDataUserRegister(dataUser){
              axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup',dataUser)
                     .then(function(response){
                            console.log('susses',response);
                            setRegisterStatus({status: 'success', message: response.data.message})
                            setTimeout(()=>{navigate('/Login')},3000) // this function for wait 3s and navigate
                     })
                     .catch(function(error){
                            console.log('error',error);
                            setTimeout(()=>{setIsLoading(false)},1000) // this function for stop loding
                            setRegisterStatus({status: 'error', message: error.response.data.message})
                     })
                     .finally(function(){
                            setIsLoading(true)
                     })
       }

       // Form validation schema
       let checkValidation = Yup.object({
              name       : Yup.string()
                            .required('name input is Required')
                            .min(3,'name must start with capital letter and then 3 character'),
              email      : Yup.string()
                            .required('email input is Required')
                            .email('Wrong email'),
              phone      : Yup.string()
                            .required('phone input is Required')
                            .matches(/^(01)[0-2|5][0-9]{8}$/,'Wrong phone number'),
              password   : Yup.string()
                            .required('password input is Required')
                            .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,'Wrong password must start capital Charter and minim 8 Charter'),
              rePassword : Yup.string()
                            .required('rePassword input is Required')
                            .oneOf([Yup.ref('password')])
       })


       // Formik library code handle form data and send data to backend
       let registerUser = useFormik({
              // Waring no edit here because attach with value input
              initialValues: {
                     name: '',
                     email: '',
                     password: '',
                     rePassword: '',
                     phone: '',
              },
              validationSchema: checkValidation,
              onSubmit: sendDataUserRegister,
       })     
       
       return (
              <>
              {/* Alert component display status register  */}
              <div className={`alert | hidden ${registerStatus.status === "success" || registerStatus.status === "error" ? '!block' : '' }`}>
              <Alert severity={registerStatus.status ==="success" ? "success" : "warning"}>
                     <AlertTitle>{registerStatus.status ==="success" ? "Success" : "Warning"}</AlertTitle>
                     <p>{registerStatus.status ==="success"? 'Welcome you in new world' : registerStatus.message}</p>
              </Alert>
              </div>

              <form onSubmit={registerUser.handleSubmit} className='flex' method='post'>
                     {/* Part left Form */}
                     <div className="side-left | w-full lg:w-[70max]  h-full flex flex-col justify-between">
                            {/* Title */}
                            <div className="title">
                                   <h2>New Client registration</h2>
                                   <p>Please enter your data correctly, to ensure your rights or <Link to='/Login'>Login</Link></p>
                            </div>

                            <div className="inputs-form | grid gap-4 grid-cols-1 lg:grid-cols-3">
                                   {/* Name User */}
                                   <div className="input">
                                          <label htmlFor="name">First Name </label>
                                          <input onChange={registerUser.handleChange} onBlur={registerUser.handleBlur} id="name" type="text" value={registerUser.values.name} name="name" placeholder='enter your name' />
                                   </div>

                                   {/* Email */}
                                   <div className="input">
                                          <label htmlFor="email">Email</label>
                                          <input onChange={registerUser.handleChange} onBlur={registerUser.handleBlur} id="email" type="email" value={registerUser.values.email} name="email" placeholder='enter your email' />
                                   </div>

                                   {/* Phone */}
                                   <div className="input">
                                          <label htmlFor="phone">Phone</label>
                                          <input onChange={registerUser.handleChange} onBlur={registerUser.handleBlur} id="phone" type="tel" value={registerUser.values.phone} name="phone" placeholder='enter your phone' />
                                   </div>

                                   {/* Password */}
                                   <div className="input">
                                          <label htmlFor="password">Password</label>
                                          <input onChange={registerUser.handleChange} onBlur={registerUser.handleBlur} id="password" type="password" value={registerUser.values.password} name="password" placeholder='enter your password' />
                                   </div>

                                   {/* Re Password */}
                                   <div className="input">
                                          <label htmlFor="rePassword">Re Password</label>
                                          <input onChange={registerUser.handleChange} onBlur={registerUser.handleBlur} id="rePassword" type="password" value={registerUser.values.rePassword} name="rePassword" placeholder='enter your re password' />
                                   </div>
                            </div>

                            <ul className='errors-validation'>
                                   <h4>{registerUser.errors.name || registerUser.errors.email || registerUser.errors.phone || registerUser.errors.password || registerUser.errors.rePassword ? 'What happened ?!' : null}</h4>
                                   <li className="error"><label htmlFor="name">{registerUser.errors.name}</label></li>
                                   <li className="error"><label htmlFor="email">{registerUser.errors.email}</label></li>
                                   <li className="error"><label htmlFor="phone">{registerUser.errors.phone}</label></li>
                                   <li className="error"><label htmlFor="password">{registerUser.errors.password}</label></li>
                                   <li className="error"><label htmlFor="rePassword">{registerUser.errors.rePassword}</label></li>
                            </ul>

                            <div className="footer | flex flex-wrap items-center justify-between mt-4">
                                   <p>If there is any problem ? <Link to="tel:+201223733755">Call us <FaHeadphonesSimple className='inline-block ms-2' size={20} /></Link></p>
                                   <div className="buttons | mt-5 lg:mt-0">
                                          <button type='button'><Link to='/'>Cancel</Link></button>
                                          <button disabled={!registerUser.errors.name && !registerUser.errors.email && !registerUser.errors.phone && !registerUser.errors.password && !registerUser.errors.rePassword ? false : true}>Continue</button>
                                          {/* <button>{isLoading ? <CircularProgress size={10} /> : null} Continue</button> */}
                                   </div>
                            </div>
                     </div>

                     
                     {/* part Right photo */}
                     <div className="side-right | hidden lg:block">
                            <div className="photo | flex flex-col items-center justify-center">
                                   <h3>Hello Client</h3>
                                   <p>welcome to in e-commerce website remaster now for enjoy with our service</p>
                                   <Link>Learn More</Link>
                            </div>
                     </div>
              </form>
              </>
       )
}

