// import martial UI
import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

// import React router dom
import { Link, useNavigate } from 'react-router-dom'

// import Formik library for handle form data and send data to backend
import { useFormik } from 'formik';

// import axios library for handel API
import axios from 'axios';


export default function VerifyResetCode() {
       let navigate = useNavigate() 
       const [statusVerifyResetCode, setStatusVerifyResetCode] = React.useState('')
       const [loading, setLoading] = React.useState(false)

       // send data user to server database
       async function sendDataUserResetPassword(dataUser){
              axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode',dataUser)
                     .then(function(response){
                            console.log('susses',response);
                            setStatusVerifyResetCode({status: 'success', message: response.data.message})
                            setLoading(true)
                            setTimeout(()=>{navigate('/createNewPassword')},3000) // this function for wait 3s and navigate
                            
                     })
                     .catch(function(error){
                            console.log('error',error);
                            setLoading(true)
                            setTimeout(()=>{setLoading(false)},1000) // this function for stop loding
                            setStatusVerifyResetCode({status: 'error', message: error.response.data.message})
                     })
       }

       // Formik library code handle form data and send data to backend
       let resetPasswordUser = useFormik({
              // Waring no edit here because attach with value input
              initialValues: {
                     resetCode: '',
              },
              onSubmit: sendDataUserResetPassword,
       })


       return (
              <>
              <div className={`alert | hidden ${statusVerifyResetCode.status === "success" || statusVerifyResetCode.status === "error" ? '!block' : '' }`}>
              <Alert severity={statusVerifyResetCode.status ==="success" ? "success" : "warning"}>
                     <AlertTitle>{statusVerifyResetCode.status ==="success" ? "Success" : "Warning"}</AlertTitle>
                     <p>{statusVerifyResetCode.status ==="success"? statusVerifyResetCode.message : statusVerifyResetCode.message}</p>
                     
              </Alert>
              </div>


              <form id='resetPasswordUser' onSubmit={resetPasswordUser.handleSubmit} className='w-full md:w-3/4 m-auto flex flex-col items-start justify-center' method='post'>
              {/* side left Login */}
                     <div className="title">
                            <span>Verify Reset Code</span>
                            <h2>Please Enter OTP 😊</h2>
                            <p>Enter your OTP For Change Your Password</p>
                     </div>

                     <div className="inputs-form ">
                            {/* Email User */}
                            <div className="input">
                                   <label htmlFor="name">OTP </label>
                                   <input onChange={resetPasswordUser.handleChange} onBlur={resetPasswordUser.handleBlur} id="OTP" type="text" value={resetPasswordUser.values.resetCode} name="resetCode" placeholder='enter your Email' />
                            </div>
                     </div>

                     {/* this is here error validation */}
                     <ul className='errors-validation'>
                            <h4>{resetPasswordUser.errors.email ||resetPasswordUser.errors.password ? resetPasswordUser.errors.title : null}</h4>
                            <li className="error"><label htmlFor="email">{resetPasswordUser.errors.email}</label></li>
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
