/// import React icons
import { FaCartPlus , FaStar } from "react-icons/fa";

// import Material UI components
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';

// import style products
import './Products.css'

// import React and React Router Dom
import { Link } from "react-router-dom";
import axios from "axios";

// import React library
import { useState } from "react";



export default function Products({products,isLoading}){
       const token = {token:localStorage.getItem('userToken')}

       // State for managing the toaster
       const [isToasterOpen, setToasterOpen] = useState(false);
       const [toasterMessage, setToasterMessage] = useState('');

       // Function to add product to cart
       function handleAddToCart(productID){
              axios.post('https://ecommerce.routemisr.com/api/v1/cart',{'productId':productID},{headers:token})
                     .then(function(response) {
                            setToasterMessage(response.data.message);
                     })
                     .catch(function(error) {
                            setToasterMessage(error.message);
                     })
                     .finally(function(){
                            setToasterOpen(true);
                            setTimeout(() => setToasterOpen(false), 2000);
                     });
       }
              
       return (
       <>     
              <Snackbar className={`toaster | ${isToasterOpen && 'toaster_active'} `}
                     anchorOrigin={{ vertical: 'top', horizontal: 'right'  }}
                     open={true}
                     message={toasterMessage}
              />

              <section id="products">
              <h2 className="title">Featured products</h2>
              <div className='grid grid-cols-1 lg:grid-cols-4 gap-5 gap-y-12'>

              {/* Show loading spinner while fetching products */}
              {isLoading ?
                     <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading}>
                            <CircularProgress color="inherit" />
                     </Backdrop>

              :
              
              //  Render products if data is available
              products.map(function(product){
                     return (
                     <div key={product.id} className="card | relative overflow-hidden">

                            {/* part photo products */}
                            <span className={`sale | ${product.priceAfterDiscount ?'inline-block' : 'hidden' } absolute z-10`}>SALE</span>
                            <Link to={`/ProductsDetails/${product.id}/${product.category.slug}`} className="photo | relative inline-block overflow-hidden">
                                          <img src={product.imageCover} alt={product.title} loading="lazy" />
                            </Link>

                            {/* part Footer */}
                            <div className="footer | flex items-center justify-between">
                                          <div className="details">
                                                 <h3 className="overflow-hidden" title={product.title}>{product.title}</h3>
                                                 <span className='price | inline-block'>
                                                        {product.priceAfterDiscount || product.price}EGP 
                                                        <sup className={`sale-price | ${product.priceAfterDiscount ?'inline-block' : 'hidden'}`}>{product.price || product.priceAfterDiscount} EGP</sup>
                                                 </span>
                                                 <p className="rate | flex"><FaStar className="mt-[2px] me-1" /> {product.ratingsAverage}</p>
                                          </div>
                                          <button onClick={()=> handleAddToCart(product.id)} className='icon | btn flex items-center justify-center'><FaCartPlus  /></button>
                            </div>
                     </div>
                     )

              })
              }
              </div>
              </section>
       </>
       )
}