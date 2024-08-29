// import martial UI
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import { useParams } from 'react-router-dom'

/// import React icons
import { BsCash } from "react-icons/bs";
import { FaStar } from "react-icons/fa";


// Import Swiper React components
import  { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

// import Products Details style sheet css
import './ProductsDetails.css'

// imports axios library
import axios from 'axios';

// imports Hooks React
import { useEffect, useState } from 'react';

// imports Components
import Categories from '../../components/Categories/Categories';


export default function ProductsDetails() {

       const [productsDetails ,setProductsDetails] = useState(null)
       const [changeMainPhoto , setChangeMainPhoto] = useState(null)      
       const {productsID , categoryName } = useParams()      

       const token = {token:localStorage.getItem('userToken')}
       
       // Add Product To Cart
       function addProductToCart(productID){
              axios.post('https://ecommerce.routemisr.com/api/v1/cart',{'productId':productID},{headers:token})
                     .then(res => console.log('susses',res))
                     .catch(error => console.log('error',error))
       }

       useEffect(function(){
              async function fetchProductsDetails() {
                     try {
                         const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${productsID}`);
                         setProductsDetails(response.data.data);
                     } catch (error) {
                         console.error('Failed to fetch product details', error);
                     }
              }fetchProductsDetails()
       }, [productsID])
       

       return (
       <>
       {!productsDetails ?
              <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open}>
                     <CircularProgress color="inherit" />
              </Backdrop>
       :

       <>
       <section id="ProductsDetails" className='flex flex-col lg:flex-row items-start'>

              {/* Part Photos */}
              <div className="part-left-photos">
                     <div className="main-photo | overflow-hidden"><img className='cover-photo' src={changeMainPhoto || productsDetails.imageCover} alt={productsDetails.title} /></div>
                     
                     {/* Slider Catagories */}
                     <div className="album-photos">
                     <Swiper className="items | mySwiper" slidesPerView={4} pagination={{ type: 'custom', }} navigation={{nextEl: ".swiper-button-next"}} modules={[Pagination]}>
                            {productsDetails.images.map(function(image){
                            return (
                                   <SwiperSlide key={image}>
                                   <div onClick={(e)=> setChangeMainPhoto(e.target.src)} className="item">
                                          <div className="photo"><img src={image} alt="" loading="lazy"/></div>
                                   </div>
                                   </SwiperSlide>
                            )
                            })}
                     </Swiper>
                     </div>
              </div>


              {/* Part Details */}
              <div className="part-right-details | mt-20 lg:mt-0">
                     <h2>{productsDetails.title}</h2>
                     <p className="description">{productsDetails.description}</p>

                     {/* part Category */}
                     <h3>Category</h3>
                     <p className="category more-details | flex items-center">
                            <img className='rounded-full' src={productsDetails.category.image} alt={productsDetails.category.name} />
                            {productsDetails.category.name}
                     </p> 

                     {/* part Brand */}
                     <h3>Brand</h3>
                     <p className="brand more-details | flex items-center">
                            <img className='rounded-full' src={productsDetails.brand.image} alt={productsDetails.brand.name} />
                            {productsDetails.brand.name}
                     </p> 
                     
                     {/* part Date Updated */}
                     <p className='date-updated'><strong>Updated:</strong> {productsDetails.updatedAt}</p>
                     
                     {/* part Ratings Average */}
                     <p className="rate | flex"><strong>Ratings Average:</strong> <FaStar style={{color: "gold",}} className="mt-[2px] mx-2" />5</p>

                     <p className="price">{productsDetails.price} EGP</p>
                     <button onClick={()=> addProductToCart(productsDetails.id)} className='btn flex items-center justify-center w-full'>Add to Cart <BsCash className='ms-5' /></button>
                     <button className='btn flex items-center justify-center w-full'>Buy Now <BsCash className='ms-5' /></button>
              </div>

       </section>
       <Categories categoryName={categoryName}></Categories>
       </>
       }
       </>
       )
}
