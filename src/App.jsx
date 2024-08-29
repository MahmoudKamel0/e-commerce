import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Layout from './components/Layout/Layout'
import Register from './pages/Authentication/Register/Register'
import Login from './pages/Authentication/Login/Login'
import Home from './pages/Home/Home'
import ResetPassword from './pages/Authentication/ResetPassword/ResetPassword'
import UserContextProvider from './contextStateManagement/userContext'
import VerifyResetCode from './pages/Authentication/VerifyResetCode/VerifyResetCode'
import Brands from './pages/Brands/Brands'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import ProductsDetails from './pages/ProductsDetails/ProductsDetails'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Cart from './pages/Cart/Cart'
import CreateCashOrder from './Oredr/CreateCashOrder/CreateCashOrder'
import NotFound from './pages/NotFound/NotFound'
import CreateNewPassword from './pages/Authentication/CreateNewPassword/CreateNewPassword'

const Routing = createBrowserRouter([
       {path: '/', element: <Layout />, children: [
              {path: '/', element: <Home />},
              {path: 'Register', element: <Register />},
              {path: 'Login', element: <Login />},
              {path: 'ResetPassword', element: <ResetPassword />},
              {path: 'VerifyResetCode', element: <VerifyResetCode />},
              {path: 'createNewPassword', element: <CreateNewPassword />},
              {element: <ProtectedRoute />, children: [
                     {path: 'Brands', element: <Brands />},
                     {path: 'Cart', element: <Cart />},
                     {path: 'CreateCashOrder/:cartID', element: <CreateCashOrder />},
                     {path: 'ProductsDetails/:productsID/:categoryName', element: <ProductsDetails />},
              ] },
              {path: '*' , element: <NotFound />},
       ]}
       
])

const query = new QueryClient()

function App() {
       return (
       <>
              <UserContextProvider>
              <QueryClientProvider client={query}>
                     <RouterProvider router={Routing}></RouterProvider>
              </QueryClientProvider>
              </UserContextProvider>
       </>
       )
}

export default App
