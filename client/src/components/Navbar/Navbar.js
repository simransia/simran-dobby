import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './navbar.css'

function Navbar() {
    const handleLogout = () => {
        localStorage.removeItem('token');
    }
    const location = useLocation();

    return (
        <div className='navbar'>
            <h2>Image Bucket</h2>
            <div>
                {!localStorage.getItem('token') ?
                <div>
                        <Link to="/" style={location.pathname === "/" ? {color:"rgba(0,0,0,0.6)"} :{color:"white"}}>Login</Link>
                        <Link to="/signup" style={location.pathname === "/signup" ? {color:"rgba(0,0,0,0.6)"} :{color:"white"}}>SignUp</Link>
                  </div>:
                    <Link to="/" onClick={handleLogout} >Logout</Link>
                }
            </div>
        </div>
    )
}

export default Navbar