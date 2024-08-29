import './Cart.css'
import { Link } from 'react-router-dom'

import { FaPlus , FaMinus  } from "react-icons/fa6";
import { useState } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

// import Material UI components
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

// import react Helmet
import {Helmet} from "react-helmet";






export default function Cart() {
       // display all products carts
       const token = {token:localStorage.getItem('userToken')}
       function fetchUserCart (){
              return axios.get('https://ecommerce.routemisr.com/api/v1/cart',{headers:token})
       }
       let {data , isLoading} = useQuery({
              queryKey: ['cartProducts'],
              queryFn: fetchUserCart ,
              refetchInterval:500,
       }) 

       // delete product in cart
       function handleRemoveProduct (productID){
              axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productID}`,{headers:token})
       }
       
       // update count product in cart
       const [countProduct, setCountProduct] = useState(1)
       function handleUpdateQuantity (productID,countProduct){
              axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productID}`,{count:countProduct},{headers:token})
              .then(response => console.log(response))
              .catch(error => console.log(error))
       }
       
       // all products carts for display
       const products = data?.data.data.products;
       const totalPrice = data?.data.data.totalCartPrice
       const cartID  = data?.data.cartId



       // console.log(cartID)

       return (
              <>
              {/* information about page */}
              <Helmet>
                     <title>Cart</title>
              </Helmet>

              <section id="cart">
              <h2 className="title">Shopping Cart</h2>
              

              <div className="body | mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8"> 
                     {/* Part one products */}
                     <div className="products | lg:w-[740px] space-y-6">
                     {isLoading ?
                            <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open}>
                                   <CircularProgress color="inherit" />
                            </Backdrop>
                     
                     :
                     products?.map(function(product){
                     return (
                            <div key={product.product._id} className="item | rounded-lg border space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                                   {/* photo Cover */}
                                   <Link to={`/ProductsDetails/${product.product._id}/${product.product.category.slug}`} className="photo-cover | inline-block overflow-hidden rounded-lg">
                                          <img className="h-20 w-20" src={product.product.imageCover} alt={product.product.title} loading='lazy' />
                                   </Link>

                                   {/* Counter and Price */}
                                   <div className="counter-price | flex items-center justify-between md:order-3 md:justify-end">
                                          {/* Counter */}
                                          <div className="counter | flex items-center">
                                                 {/* decrement-button */}
                                                 <button onClick={()=> handleUpdateQuantity(product.product._id,product.count - 1)} type="button" className="btn shrink-0 rounded-full border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700">
                                                        <FaMinus size={12} />
                                                 </button>

                                                 {/* count-value */}
                                                 <input type="text" id="counter-input" className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0 " value={product.count} required />
                                                 
                                                 {/* increment-button */}
                                                 <button onClick={()=> handleUpdateQuantity(product.product._id,product.count + 1)} type="button" className="btn shrink-0 rounded-full border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700">
                                                        <FaPlus size={12} />
                                                 </button>
                                          </div>

                                          {/* Price */}
                                          <p className="price | font-bold">{product.price} EGP</p>
                                   </div>

                                   <div className="details | w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                                          <Link to={`/ProductsDetails/${product.product._id}/${product.product.category.slug}`} className=" font-medium text-gray-900 hover:underline ">{product.product.title}</Link><br />
  
                                          <button onClick={()=> handleRemoveProduct (product.product.id)} type="button" className="inline-flex items-center font-medium text-red-600 hover:underline dark:text-red-500">
                                                 <svg className="me-1.5 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24">
                                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18 17.94 6M18 18 6.06 6" />
                                                 </svg>
                                                 Remove
                                          </button>
                                   </div>
                            </div>
                            )
                     })}                    
                     </div>

                     {/* part tow checkout */}
                     <div className="checkout | mt-6 flex-1 space-y-6 lg:mt-0">
                            {/* Part-details-checkout */}
                            <div className="details | space-y-4 rounded-lg border">
                                   <p className="font-semibold">Order summary</p>

                                   {/* Original price */}
                                   <dl className="flex items-center justify-between gap-4">
                                          <dt>Original price</dt>
                                          <dd>{totalPrice} EGP</dd>
                                   </dl>

                                   {/* Savings */}
                                   <dl className="flex items-center justify-between gap-4">
                                          <dt>Savings</dt>
                                          <dd>0 EGP</dd>
                                   </dl>

                                   {/* Store Pickup */}
                                   <dl className="flex items-center justify-between gap-4">
                                          <dt>Store Pickup</dt>
                                          <dd>0 EGP</dd>
                                   </dl>

                                   {/* Tax */}
                                   <dl className="flex items-center justify-between gap-4">
                                          <dt>Tax</dt>
                                          <dd>0 EGP</dd>
                                   </dl>

                                   {/* Total */}
                                   <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                                          <dt className='font-semibold'>Total</dt>
                                          <dd className='font-semibold'>{totalPrice} EGP</dd>
                                   </dl>

                                   {/* buttons */}
                                   <Link to={`/CreateCashOrder/${cartID}`} className="btn-checkout | block text-center rounded-lg">Proceed to Checkout</Link>
                                   <div className="continue-shopping | flex items-center justify-center gap-2">
                                          <span className=""> or </span>
                                          <Link to={`/`} title className="underline">Continue Shopping</Link>
                                   </div>

                            </div>

                            {/* part-gift-checkout */}
                            <div className="gift space-y-4 rounded-lg border sm:p-6">
                            <form className="space-y-4">
                            <div>
                                   <label htmlFor="gift" className="mb-2 block"> Do you have a voucher or gift card? </label>
                                   <input id='gift' type="text" className="block w-full rounded-lg border outline-none p-3" placeholder='enter your gift here' required />
                            </div>
                            <button type="submit" className="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Apply Code</button>
                            </form>
                            </div>
                     </div>
              </div>
              </section>
              </>
       )
}



