import { useNavigate } from 'react-router-dom'
import './NotFound.css'

// Import React icons
import { HiArrowLongLeft , HiOutlineHome  } from "react-icons/hi2";

// import notfound photo
import notfound from '../../assets/notfound.jpg'

export default function NotFound() {
       const navigate = useNavigate()

       return (
              <section id="not-found" className='flex flex-col-reverse lg:flex-row items-center justify-center gap-12'>
              <div className="info">
                     <span className='font-bold'>404 error</span>
                     <strong className="mt-3 font-bold block">Page not found</strong>
                     <p className="mt-3">Sorry, the page you are looking for doesn't exist.Here are some helpful links:</p>
                     
                     <div className="buttons | flex items-center mt-6 gap-x-3">
                            <button onClick={()=> navigate(-1)} className="flex items-center justify-center rounded-lg gap-x-2 sm:w-auto"><HiArrowLongLeft /> Go back</button>
                            <button onClick={()=> navigate('/')} className=" flex items-center justify-center gap-x-2 rounded-lg sm:w-auto"><HiOutlineHome /> Take me home</button>
                     </div>
              </div>
              <div className="photo | rounded-lg overflow-hidden relative">
                     <img src={notfound} className="cover-photo" alt='not found photo' />
              </div>
              </section>
       )
}
