import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useRef, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navigation from './components/common/navigation/Navigation';
import TopNavbar from './components/common/topNavbar/TopNavbar';
import Home from './components/home/Home';
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
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
