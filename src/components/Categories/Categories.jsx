// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination , Navigation } from 'swiper/modules';

/// import React icons "react-icons/bs";
import { FaCartPlus , FaStar } from "react-icons/fa";

// import react router dom 
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

// import categories style sheet
import './Categories.css'
import axios from 'axios';





export default function Categories({categoryName}) {
       const [category, setCategory] = useState([])


       const token = {token:localStorage.getItem('userToken')}
       
       // Add Product To Cart
       function addProductToCart(productID){
              axios.post('https://ecommerce.routemisr.com/api/v1/cart',{'productId':productID},{headers:token})
                     .then(res => console.log('susses',res))
                     .catch(error => console.log('error',error))
       }
       
       useEffect(function(){
              async function getAllCategories() {
                     try {
                            let response = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/`);
                            response = response.data.data.filter(function(category) {                                  
                                   return category.category.slug == categoryName
                            });

                            setCategory(response)

                     } catch (error) {
                            console.error('Failed to fetch product details', error);
                     }
              }getAllCategories()
       }, [categoryName])

       console.log(category);
       
       return (
              <section id="categories">
                     <h2>Other similar products</h2>

                     <Swiper className="items | mySwiper" slidesPerView={4} pagination={{clickable: true,}} spaceBetween={30} modules={[Pagination,Navigation]} breakpoints={{1000:{slidesPerView:4},850:{slidesPerView:3},500:{slidesPerView:2},300:{slidesPerView:1},}}>
                     {category.map(function(product){
                            return (
                            <SwiperSlide key={product.id}>
                            <div className="card | relative overflow-hidden">

                            {/* part photo products */}
                            <span className={`sale | ${product.priceAfterDiscount ?'inline-block' : 'hidden' } absolute z-10`}>SALE</span>
                            <Link to={`/ProductsDetails/${product.id}/${product.category.slug}`} className="photo | relative inline-block overflow-hidden">
                                          <img src={product.imageCover} alt={product.title} loading='lazy' />
                            </Link>

                            {/* part Footer */}
                            <div className="footer | flex items-center justify-between">
                                          <div className="details">
                                                 <h3 className="overflow-hidden">{product.title}</h3>
                                                 <span className='price | inline-block'>
                                                        {product.priceAfterDiscount || product.price}EGP 
                                                        <sup className={`sale-price | ${product.priceAfterDiscount ?'inline-block' : 'hidden'}`}>{product.price || product.priceAfterDiscount} EGP</sup>
                                                 </span>
                                                 <p className="rate | flex"><FaStar className="mt-[2px] me-1" />{product.ratingsAverage}</p>
                                          </div>
                                          <button onClick={()=> addProductToCart(product.id)} className='icon | btn flex items-center justify-center'><FaCartPlus  /></button>
                            </div>
                            </div>
                            </SwiperSlide>
                            )

                     })}
                     </Swiper>
                                                 
              </section>
       )
}
