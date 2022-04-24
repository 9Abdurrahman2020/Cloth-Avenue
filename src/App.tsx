import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useRef, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CategoryBasedProduct from './components/categoryBasedProduct/CategoryBasedProduct';
import Footer from './components/common/footer/Footer';
import Navigation from './components/common/navigation/Navigation';
import TopNavbar from './components/common/topNavbar/TopNavbar';
import Home from './components/home/Home';
import SingleProduct from './components/singleProduct/SingleProduct';

function App() {
  const [height, setHeight] = useState(0)
  const ref = useRef<any>()
  useEffect(() => {
    setHeight(ref.current.clientHeight)
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
