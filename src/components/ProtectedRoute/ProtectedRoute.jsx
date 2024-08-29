import { Navigate, Outlet } from "react-router-dom"


export default function ProtectedRoute() {
       if(localStorage.getItem('userToken') !== null){
              return <Outlet></Outlet>
       }

       return <Navigate to={'/login'} />
}
