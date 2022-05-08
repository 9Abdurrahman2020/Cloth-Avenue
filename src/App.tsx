import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useRef, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAppDispatch } from './app/store';
import BellingAddress from './components/bellingAddress/BellingAddress';
import CategoryBasedProduct from './components/categoryBasedProduct/CategoryBasedProduct';
import CheckOut from './components/checkOut/CheckOut';
import Footer from './components/common/footer/Footer';
import Navigation from './components/common/navigation/Navigation';
import TopNavbar from './components/common/topNavbar/TopNavbar';
import AuthProvider from './components/context/AuthProvider';
import FilteredProducts from './components/filteredProducts/FilteredProducts';
import GanderBasedProduct from './components/ganderBasedProduct/GanderBasedProduct';
import Home from './components/home/Home';
import PaymentSuccesful from './components/paymentSuccesful/PaymentSuccesful';
import Shop from './components/shop/Shop';
import SingleProduct from './components/singleProduct/SingleProduct';
import AdminRoute from './components/userProfile/adminRoute/AdminRoute';
import Login from './components/userProfile/login/Login';
import MakeAdmin from './components/userProfile/makeAdmin/MakeAdmin';
import Orders from './components/userProfile/orders/Orders';
import PrivateRoute from './components/userProfile/privateRoute/PrivateRoute';
import Profile from './components/userProfile/profile/Profile';
import Registration from './components/userProfile/registration/Registration';
import UserProfile from './components/userProfile/UserProfile';
import { setNavHeight } from './features/counter/storeSlice';

function App() {
  const [height, setHeight] = useState(0);
  const ref = useRef<any>();
  const dispatch = useAppDispatch()
  useEffect(() => {
    setHeight(ref.current.clientHeight)
    dispatch(setNavHeight(ref.current.clientHeight))
  },[])
  
  return (
    <AuthProvider>
    <BrowserRouter>
    <div ref={ref} className="fixed-top header">
      <TopNavbar/>
      <Navigation/>
    </div>
    <div style={{marginTop:`${height}px`}} className='main-body'>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/product/:id" element={<SingleProduct/>}/>
        <Route path="/products/:category" element={<CategoryBasedProduct/>}/>
        <Route path="/products-for/:gander" element={<GanderBasedProduct/>}/>
        <Route path="/filtered-products" element={<FilteredProducts/>}/>
        <Route path="/shop" element={<Shop/>}/>
        <Route path="/checkout" element={<PrivateRoute><CheckOut/></PrivateRoute>}/>
        <Route path="/belling-address/:id" element={<PrivateRoute><BellingAddress/></PrivateRoute>}/>
        <Route path="/payment/:id" element={<PrivateRoute><PaymentSuccesful/></PrivateRoute>}/>
        
        <Route path="/user-profile" element={<UserProfile/>}>
          
          <Route path="/user-profile" element={<Profile/>}/>
          <Route path="/user-profile/my-orders" element={<PrivateRoute><Orders/></PrivateRoute>}/>
          <Route path="/user-profile/login" element={<Login/>}/>
          <Route path="/user-profile/logout" element={<Login/>}/>
          <Route path="/user-profile/make-admin" element={<AdminRoute><MakeAdmin/></AdminRoute>}/>
          <Route path="/user-profile/registration" element={<Registration/>}/>

        </Route>

      </Routes>
    </div>
    <ToastContainer
      position="top-center"
      autoClose={2000}
    />
    <Footer/>
    </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
