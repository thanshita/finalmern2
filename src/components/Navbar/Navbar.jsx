import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import './Navbar.css'
import { FaArrowCircleUp } from 'react-icons/fa';
import logoimg from './logoimg.jpg';

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(false);

  const handleClick2 = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }


  const [visibility, setVisibility] = useState(false);
  const changeVisibility = () => {
    if (window.scrollY >= 100) {
      setVisibility(true);
    } else {
      setVisibility(false);
    }
  }

  window.addEventListener("scroll", changeVisibility)
  return (
    <>
      <div className="scroll-top" onClick={handleClick2} style={{ display: visibility ? "block" : "none" }} >
        <FaArrowCircleUp className='icon' />
      </div>

      <nav className="navbar">
        <div className="navbar-brand">
          <div className="logooo">
            <div className="logoo">
              <img src={logoimg} className="imglogo" />
            </div>
            <Link to="/" className="logo">YumOnTheRun</Link>
          </div>
        </div>
        {/* </div>
          <Link to="/" className="logo">YumOnTheRun</Link>
        </div> */}
        <div className={isMobile ? 'nav-links-mobile' : 'nav-links'}>
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/contact2" className="nav-link">Contact</Link>
          <Link to="/login" className="nav-link">Login</Link>
          <Link to="/signupcust" className="nav-link">{isMobile ? 'Sign Up Customer' : 'SignUp customer'}</Link>
          <Link to="/signuprest" className="nav-link">{isMobile ? 'Sign Up Restaurant Owner' : 'SignUp Rest'}</Link>
        </div>
        <button className='mobile-menu-icon'
          onClick={() => setIsMobile(!isMobile)}
        >
          {isMobile ? <i className='fas fa-times'></i> : <i className='fas fa-bars'></i>}
        </button>
      </nav>
    </>
  )
}

export default Navbar
