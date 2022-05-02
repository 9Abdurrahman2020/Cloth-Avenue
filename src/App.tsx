import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useRef, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAppDispatch } from './app/store';
import CategoryBasedProduct from './components/categoryBasedProduct/CategoryBasedProduct';
import CheckOut from './components/checkOut/CheckOut';
import Footer from './components/common/footer/Footer';
import Navigation from './components/common/navigation/Navigation';
import TopNavbar from './components/common/topNavbar/TopNavbar';
import FilteredProducts from './components/filteredProducts/FilteredProducts';
import GanderBasedProduct from './components/ganderBasedProduct/GanderBasedProduct';
import Home from './components/home/Home';
import Shop from './components/shop/Shop';
import SingleProduct from './components/singleProduct/SingleProduct';
import Login from './components/userProfile/login/Login';
import Orders from './components/userProfile/orders/Orders';
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
        <Route path="/checkout" element={<CheckOut/>}/>
        

        <Route path="/user-profile" element={<UserProfile/>}>
          <Route path="/user-profile/" element={<Profile/>}/>
          <Route path="/user-profile/my-orders" element={<Orders/>}/>
          <Route path="/user-profile/login" element={<Login/>}/>
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
  );
}

export default App;
