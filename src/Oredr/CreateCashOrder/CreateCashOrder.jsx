import { useFormik } from 'formik'
import './CreateCashOrder.css'
import axios from 'axios';
import { useContext } from 'react';
import { userContext } from '../../contextStateManagement/userContext';
import { useParams } from 'react-router-dom';

export default function CreateCashOrder() {
       const token = {token :localStorage.getItem('userToken')}
       const {nameUser} = useContext(userContext)
       const {cartID} =useParams()
            

       function sendDataCreateCashOrder(){
              axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartID}`,{'shippingAddress':createCashOrder.values }, {headers:token, params:{url: 'http://localhost:5173/'}})
                     .then(function(response){
                            console.log('susses',response);
                            location.href = response.data.session.url
                     })
                     .catch(function(error){
                            console.log('error',error);
                     })
       }

       // Formik library code handle form data and send data to backend
       let createCashOrder = useFormik({
              // Waring no edit here because attach with value input
              initialValues: {
                     details: '',
                     phone: '',
                     city: '',
              },
              onSubmit: sendDataCreateCashOrder,
       })   

       return (
              <section id="createCashOrder" className="bg-white py-8 antialiased ">
              <form onSubmit={createCashOrder.handleSubmit} className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                     <div className="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12 xl:gap-16">
                     <div className="min-w-0 flex-1 space-y-8">
                            <div className="space-y-4">
                            <h2 className="text-xl font-semibold ">Delivery Details</h2>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div  className='input'>
                                   <label htmlFor="your_name" className="mb-2 block text-sm font-medium "> Your name </label>
                                   <input  type="text" id="your_name" className="block w-full rounded-lg border border-gray-300" value={nameUser} placeholder="Bonnie Green" required />
                            </div>
                            <div  className='input'>
                                   <label htmlFor="your_email" className="mb-2 block text-sm font-medium "> Your email* </label>
                                   <input onChange={createCashOrder.handleChange} onBlur={createCashOrder.handleBlur} value={createCashOrder.values.details} name='details'  type="email" id="your_email" className="block w-full rounded-lg border border-gray-300 " placeholder="name@flowbite.com" required />
                            </div>
                            <div className='input'> 
                                   <div className="mb-2 flex items-center gap-2">
                                          <label htmlFor="select-country-input-3" className="block text-sm font-medium "> Country* </label>
                                   </div>
                                   <select onChange={createCashOrder.handleChange} onBlur={createCashOrder.handleBlur} value={createCashOrder.values.city} name='city' id="select-country-input-3" className="block w-full rounded-lg border border-gray-300 ">
                                          <option value="" hidden disabled label="Select city" />
                                          <option value="Cairo">Cairo</option>
                                          <option value="ALex">ALex</option>
                                          <option value="Giza">Giza</option>
                                          <option value="Minya">Minya</option>
                                   </select>
                            </div>
                            <div  className='input'>
                                   <label htmlFor="phone" className="mb-2 block text-sm font-medium "> Phone </label>
                                   <input  type="tel" id="phone" onChange={createCashOrder.handleChange} onBlur={createCashOrder.handleBlur} value={createCashOrder.values.phone} name='phone' className="block w-full rounded-lg border border-gray-300 " placeholder="" required />
                            </div>

                            <div className="sm:col-span-2">
                                   <button onClick={()=> console.log(createCashOrder.values)} type="submit" className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700">
                                   <svg className="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24">
                                   <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14m-7 7V5" />
                                   </svg>
                                   Add new address
                                   </button>
                            </div>
                            </div>
                            </div>
                            <div className="space-y-4">
                            <h3 className="text-xl font-semibold ">Payment</h3>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                            <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
                                   <div className="flex items-start">
                                   <div className="flex h-5 items-center">
                                   <input id="credit-card" aria-describedby="credit-card-text" type="radio" name="payment-method" defaultValue className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600" defaultChecked />
                                   </div>
                                   <div className="ms-4 text-sm">
                                   <label htmlFor="credit-card" className="font-medium leading-none "> Credit Card </label>
                                   <p id="credit-card-text" className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400">Pay with your credit card</p>
                                   </div>
                                   </div>
                            </div>


                            </div>
                            </div>
                     </div>


                     <div className="mt-6 w-full space-y-6 sm:mt-8 lg:mt-0 lg:max-w-xs xl:max-w-md">
                            <div className="flow-root">
                            <div className="-my-3 divide-y divide-gray-200 dark:divide-gray-800">
                            <dl className="flex items-center justify-between gap-4 py-3">
                                   <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Subtotal</dt>
                                   <dd className="text-base font-medium ">$8,094.00</dd>
                            </dl>
                            <dl className="flex items-center justify-between gap-4 py-3">
                                   <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Savings</dt>
                                   <dd className="text-base font-medium text-green-500">0</dd>
                            </dl>
                            <dl className="flex items-center justify-between gap-4 py-3">
                                   <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Store Pickup</dt>
                                   <dd className="text-base font-medium ">$99</dd>
                            </dl>
                            <dl className="flex items-center justify-between gap-4 py-3">
                                   <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Tax</dt>
                                   <dd className="text-base font-medium ">$199</dd>
                            </dl>
                            <dl className="flex items-center justify-between gap-4 py-3">
                                   <dt className="text-base font-bold ">Total</dt>
                                   <dd className="text-base font-bold ">$8,392.00</dd>
                            </dl>
                            </div>
                            </div>

                     </div>
                     </div>
              </form>
              </section>

       )
}
