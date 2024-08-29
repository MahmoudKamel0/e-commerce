// import martial UI
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

// import Login style sheet css
import './CreateNewPassword.css'

// import React router dom
import { Link, useNavigate } from 'react-router-dom'

// import Formik library for handle form data and send data to backend
import { useFormik } from 'formik';

// import axios library for handel API
import axios from 'axios';
import { useState } from 'react';



export default function CreateNewPassword() {
       let navigate = useNavigate() 
       const [statusResetPassword, setStatusResetPassword] = useState('')
       const [loading, setLoading] = useState(false)

       // send data user to server database
       async function sendDataUserResetPassword(dataUser){
              axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword',dataUser)
                     .then(function(response){
                            console.log('susses',response);
                            setStatusResetPassword({status: 'success', message: response.data.message})
                            setTimeout(()=>{navigate('/Login')},3000) // this function for wait 3s and navigate
                            
                     })
                     .catch(function(error){
                            console.log('error',error);
                            setTimeout(()=>{setLoading(false)},1000) // this function for stop loding
                            setStatusResetPassword({status: 'error', message: error.response.data.message})
                     })
                     .finally(function(){
                            setLoading(true)
                     })
       }


       // Formik library code handle form data and send data to backend
       let createNewPassword = useFormik({
              // Waring no edit here because attach with value input
              initialValues: {
                     email: '',
                     newPassword: '',
              },
              onSubmit: sendDataUserResetPassword,
       })


       return (
              <>
              <div className={`alert | hidden ${statusResetPassword.status === "success" || statusResetPassword.status === "error" ? '!block' : '' }`}>
              <Alert severity={statusResetPassword.status ==="success" ? "success" : "warning"}>
                     <AlertTitle>{statusResetPassword.status ==="success" ? "Success" : "Warning"}</AlertTitle>
                     <p>{statusResetPassword.status ==="success"? statusResetPassword.message : statusResetPassword.message}</p>
                     
              </Alert>
              </div>


              <form id='createNewPassword' onSubmit={createNewPassword.handleSubmit} className='w-full md:w-3/4 m-auto flex flex-col items-start justify-center' method='post'>
              {/* side left Login */}
                     <div className="title">
                            <span>Forgot Passwords</span>
                            <h2>Don't worry, it's all right😊</h2>
                            <p>Enter your email and you will receive the confirmation code on the email</p>
                     </div>

                     <div className="inputs-form ">
                            {/* email-user */}
                            <div className="input">
                                   <label htmlFor="name">Email </label>
                                   <input onChange={createNewPassword.handleChange} onBlur={createNewPassword.handleBlur} id="email" type="email" value={createNewPassword.values.email} name="email" placeholder='enter your Email' />
                            </div>

                            {/* new-password-user */}
                            <div className="input">
                                   <label htmlFor="name">New Password </label>
                                   <input onChange={createNewPassword.handleChange} onBlur={createNewPassword.handleBlur} id="new-password" type="password" value={createNewPassword.values.newPassword} name="newPassword" placeholder='enter your newPassword' />
                            </div>
                     </div>

                     {/* this is here error validation */}
                     <ul className='errors-validation'>
                            <h4>{createNewPassword.errors.email ||createNewPassword.errors.password ? createNewPassword.errors.title : null}</h4>
                            <li className="error"><label htmlFor="email">{createNewPassword.errors.email}</label></li>
                     </ul>

                     {/* Footer */}
                     <div className="footer | flex flex-wrap items-center justify-between">
                            <p>If you don't have an account <Link to='/Register'>Register</Link></p>
                            <div className="buttons | mt-5 sm:mt-0">
                                   <button type='button'><Link to='/'>Cancel</Link></button>
                                   <button>{loading ? <CircularProgress size={10} /> : null} Continue</button>
                            </div>
                     </div>

       </form>
       </>

       )
}
