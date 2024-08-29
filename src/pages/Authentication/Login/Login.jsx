// import martial UI
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

// import Login style sheet css
import './Login.css'

// import video background
import video from '../../../assets/vedioLogin.mp4'

// import React router dom
import { Link, useNavigate } from 'react-router-dom'

// import Formik library for handle form data and send data to backend
import { useFormik } from 'formik';

// import axios library for handel API
import axios from 'axios';

// Context
import { useContext, useState } from 'react';
import { userContext } from '../../../contextStateManagement/userContext';

// import library yup 
import * as Yup from 'yup';


export default function Login() {

       // context user Context
       let {setIsUser} = useContext(userContext)

       let navigate = useNavigate() 
       const [loading, setLoading] = useState(false)

       // send data user to server database
       async function sendDataUserLogin(dataUser){
              axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin',dataUser)
                     .then(function(response){
                            console.log('susses',response);
                            localStorage.setItem('userToken',response.data.token)
                            setIsUser(response.data.token)
                            setTimeout(() => {navigate('/')},3000)
                     })
                     .catch(function(error){
                            console.log('error',error);
                            setTimeout(()=>{setLoading(false)},1000) // this function for stop loding
                     })
                     .finally(function(){
                            setLoading(true)
                     })
       }


       let checkValidation = Yup.object({
              email      : Yup.string().required('email input is Required').email('Wrong email'),
              password   : Yup.string().required('password input is Required').matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,'Wrong password must start capital Charter and minim 8 Charter'),
       })

       // Formik library code handle form data and send data to backend
       let loginUser = useFormik({
              // Waring no edit here because attach with value input
              initialValues: {
                     email: '',
                     password: '',
              },
              validationSchema: checkValidation ,
              onSubmit: sendDataUserLogin,
       })




       return (
       <>
              <div className={`loading-page | ${loading === true ? 'block' : 'hidden'}`}>
              <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open}>
                     <CircularProgress color="inherit" />
              </Backdrop>
              </div>

              <form id='login' onSubmit={loginUser.handleSubmit} className='flex' method='post'>
              {/* side left Login */}
              <div className="side-left | w-full lg:w-[46%] flex flex-col justify-between">
                     <div className="title">
                            <span>Login</span>
                            <h2>Welcome Back</h2>
                            <p>Login now to see the new offers</p>
                     </div>

                     <div className="inputs-form ">
                            {/* Email User */}
                            <div className="input">
                                   <label htmlFor="name">Email </label>
                                   <input onChange={loginUser.handleChange} onBlur={loginUser.handleBlur} id="email" type="email" value={loginUser.values.email} name="email" placeholder='enter your first name' />
                            </div>

                            {/* Password User */}
                            <div className="input">
                                   <label htmlFor="name">Password </label>
                                   <input onChange={loginUser.handleChange} onBlur={loginUser.handleBlur} id="password" type="password" value={loginUser.values.password} name="password" placeholder='enter your first name' />
                            </div>
                            <p>are you forget password? <Link to='/resetPassword'>click here</Link> </p>
                     </div>

                     {/* this is here error validation */}
                     <ul className='errors-validation'>
                            <h4>{loginUser.errors.email ||loginUser.errors.password ? 'What happened ?!' : null}</h4>
                            <li className="error"><label htmlFor="email">{loginUser.errors.email}</label></li>
                            <li className="error"><label htmlFor="password">{loginUser.errors.password}</label></li>
                     </ul>

                     {/* Footer */}
                     <div className="footer | flex flex-wrap items-center justify-between">
                            <p>If you don't have an account <Link to='/Register'>Register</Link></p>
                            <div className="buttons | mt-5 sm:mt-0">
                                   <button type="button"><Link to='/'>Cancel</Link></button>
                                   <button disabled={!loginUser.errors.email && !loginUser.errors.password ? false : true}>{loading ? <CircularProgress size={10} /> : null} Continue</button>
                            </div>
                     </div>
              </div>


              {/* side Right video background */}
              <div className="side-right | hidden lg:block">
                     <video autoPlay muted loop src={video}></video>
              </div>
       </form>
       </>
       )
}
