import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './Navbar2.css'
import { FaArrowCircleUp } from 'react-icons/fa';
import { BsCartCheckFill } from 'react-icons/bs';
import logoimg from './logoimg.jpg';

const Navbar2 = (props) => {

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


    const [isMobile, setIsMobile] = useState(false);
    const navigator = useNavigate();
    const handleLogOut = () => {
        var a = document.getElementById('logout');
        if (a.style.display === "block")
            a.style.display = "none";
        else a.style.display = "block";
    }

    const logout = () => {
        navigator('/');
    }

    const showCartItems = () => {
        console.log('a')
        if (document.getElementById('cart-links').style.display === 'none') {
            document.getElementById('cart-links').style.display = "block";
        }
        else document.getElementById('cart-links').style.display = "none";
    }

    return (
        <>
            <div className="scroll-top" onClick={handleClick2} style={{ display: visibility ? "block" : "none" }} >
                <FaArrowCircleUp className='icon' />
            </div>
            <nav className="navbar">
                {/* <div className="navbar-brand">
                    <Link to="/" className="logo">Food Delivery</Link>
                </div> */}
                <div className="navbar-brand">
          <div className="logooo">
            <div className="logoo">
              <img src={logoimg} className="imglogo" />
            </div>
          <Link to="/" className="logo">YumOnTheRun</Link>
        </div>
      </div>
                <div className={isMobile ? 'nav-links-mobile' : 'nav-links'}>
                    <Link to="/" className="nav-link">Home</Link>
                    {!window.location.href.includes('restowner') ? <Link to="/menu" className="nav-link">Menu</Link> : ''}
                    {/* <Link to="/contactt" className="nav-link">Contact</Link> */}
                    {props.loc ? <Link to='/cartDisplayer'> <BsCartCheckFill onClick={showCartItems} className='nav-link' fontSize={20} style={{ cursor: "pointer", color: 'blue' }} /> </Link> : ''}
                    <div className='nav-link' style={{ textDecoration: "none", cursor: "pointer" }}><div> {props.ownerName} </div> </div>
                    <div onClick={logout} className='nav-link'> Logout </div>
                </div>
                <button className='mobile-menu-icon'
                    onClick={() => setIsMobile(!isMobile)}
                >
                    {isMobile ? <i className='fas fa-times'></i> : <i className='fas fa-bars'></i>}
                </button>
            </nav>
            <div id='logout' onClick={logout} style={{ color: "black", float: 'right', padding: "5px 5px" }}> LogOut </div>
        </>
    )
}

export default Navbar2
