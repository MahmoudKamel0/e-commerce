// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination , Autoplay, Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
// import { Pagination } from 'swiper/modules';

// import photo e-commerce
import slideOne from '../../assets/slide/1.jpg'
import slideTwo from '../../assets/slide/2.jpg'
import slideThree from '../../assets/slide/3.png'
import slideFour from '../../assets/slide/4.avif'
import bestSeller from '../../assets/categories/best seller.webp'
import Men from '../../assets/categories/men.jpg'
import Women from '../../assets/categories/women.jpeg'
import Kids from '../../assets/categories/kids.jpg'
import electronics from '../../assets/categories/electronics.jpg'

// import Home style sheet css
import './Home.css'

// import React Query
import { useQuery } from "@tanstack/react-query";


// import React icons
import { IoIosArrowRoundForward } from "react-icons/io";
import { Link } from 'react-router-dom';
import Products from '../../components/Products/Products';
import axios from 'axios';

// import react Helmet
import {Helmet} from "react-helmet";





export default function Home() {  

       function getAllProducts(){
              return axios.get('https://ecommerce.routemisr.com/api/v1/products')
       }
       const {data ,isLoading} = useQuery({
              queryKey:'allProducts',
              queryFn:getAllProducts,
       })
       
       
       return (
       <>
              {/* information about page */}
              <Helmet>
                     <title>Home</title>
              </Helmet>

              {/* Slider Home */}
              <Swiper className="sliders | mySwiper" pagination={{ dynamicBullets: true, clickable: true, }} modules={[Pagination,Autoplay]} autoplay={{delay: 3000,}}>
                     <SwiperSlide className='slide'><img className='cover-photo' src={slideOne} alt="slider photo offer" loading="lazy" /></SwiperSlide>
                     <SwiperSlide className='slide'><img className='cover-photo' src={slideTwo} alt="slider photo offer" loading="lazy" /></SwiperSlide>
                     <SwiperSlide className='slide'><img className='cover-photo' src={slideThree} alt="slider photo offer" loading="lazy" /></SwiperSlide>
                     <SwiperSlide className='slide'><img className='cover-photo' src={slideFour} alt="slider photo offer" loading="lazy" /></SwiperSlide>
              </Swiper>

              <section id='category-slide'>
                     <h2 className='title'>curated picks</h2>

                     {/* Slider Catagories */}
                     <Swiper className="items | mySwiper" slidesPerView={4}  spaceBetween={30} modules={[Pagination,Navigation]} breakpoints={{1000:{slidesPerView:4},850:{slidesPerView:3},500:{slidesPerView:2},300:{slidesPerView:1},}}>
                            <SwiperSlide>
                            <div className="item | relative">
                                   <div className="photo"><img src={bestSeller} alt="Best Seller" loading="lazy" /></div>
                                   <Link to='' className="info | flex items-center justify-between absolute">Best Seller <IoIosArrowRoundForward size={25} /></Link>
                            </div>
                            </SwiperSlide>

                            <SwiperSlide>
                            <div className="item | relative">
                                   <div className="photo"><img src={Men} alt="Shop Men" loading="lazy" /></div>
                                   <Link to='' className="info | flex items-center justify-between absolute">Shop Men <IoIosArrowRoundForward size={25} /></Link>
                            </div>
                            </SwiperSlide>
                            
                            <SwiperSlide>
                            <div className="item | relative">
                                   <div className="photo"><img src={Women} alt="Shop Women" loading="lazy" /></div>
                                   <Link to='' className="info | flex items-center justify-between absolute">Shop Women <IoIosArrowRoundForward size={25} /></Link>
                            </div>
                            </SwiperSlide>

                            <SwiperSlide>
                            <div className="item | relative">
                                   <div className="photo"><img src={Kids} alt="Shop electronics" loading="lazy" /></div>
                                   <Link to='' className="info | flex items-center justify-between absolute">Shop Kids <IoIosArrowRoundForward size={25} /></Link>
                            </div>
                            </SwiperSlide>

                            <SwiperSlide>
                            <div className="item | relative">
                                   <div className="photo"><img src={electronics} alt="Shop electronics" loading="lazy" /></div>
                                   <Link to='' className="info | flex items-center justify-between absolute">Shop electronics <IoIosArrowRoundForward size={25} /></Link>
                            </div>
                            </SwiperSlide>
                     </Swiper>
              </section>
              <Products products={data?.data.data} isLoading={isLoading} />
       </>
       )
}

