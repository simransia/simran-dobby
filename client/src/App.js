import './App.css';
import React, {useState} from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from './pages/Signup/SignUp';
import Login from './pages/Login/Login';
import Home from './pages/Home/Home'
import ImageState from './Context/ImageState';
import Navbar from './components//Navbar/Navbar';
import Alert from './components/Alert/Alert'


function App() {
  const [alert, setAlert]=useState(null);

  const showAlert=(type,msg)=>{
    setAlert({
      type:type,
      message:msg,
    }) ;
    console.log(alert)
    setTimeout(()=>{
      setAlert(null)
    }, 2500)
}

  return (
    <>
      <ImageState>
        <BrowserRouter>
        <Navbar/>
        <Alert alert={alert}/>
          <Routes>
            <Route path="/" element={<Login showAlert={showAlert}/>} />
            <Route path="/Home" element={<Home />} />
            <Route path="/signup" element={<SignUp showAlert={showAlert}/>} />
          </Routes>
        </BrowserRouter>
      </ImageState>
    </>
  );
}

export default App;