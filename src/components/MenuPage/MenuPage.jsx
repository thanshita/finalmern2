import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { FaArrowCircleUp } from 'react-icons/fa';
import { BsCartCheckFill } from 'react-icons/bs'
import Axios from 'axios';
import './MenuPage.css';
import logoimg from './logoimg.jpg';

import search from './../../assets/search.png';
import Footer from '../Footer/Footer';
import './../Navbar2/Navbar2.css'
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const MenuPage = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cartItems, setCartItems] = useState([]);
  const [notify, setNotfiy] = useState(false);

  var abcd = 0;
  useEffect(() => {
    Axios.get('http://localhost:3000/resdetails')
    // Axios.get('https://online-food-delivery-system.onrender.com/resdetails')
      .then((res) => {
        setRestaurants(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleAddToCart = (restaurantId, item) => {
    if (!notify)
      setNotfiy(!notify)
    const existingCartItemIndex = cartItems.findIndex(
      (cartItem) => cartItem.restaurantId === restaurantId && cartItem.item.itemName === item.itemName
    );

    if (existingCartItemIndex !== -1) {
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingCartItemIndex] = {
        ...updatedCartItems[existingCartItemIndex],
        quantity: updatedCartItems[existingCartItemIndex].quantity + 1,
      };
      setCartItems(updatedCartItems);
    } else {
      const newCartItem = { restaurantId, item, quantity: 1 };
      setCartItems((prevCartItems) => [...prevCartItems, newCartItem]);

    }
  };


  const handleRemoveFromCart = (restaurantId, item) => {
    if (!notify)
      setNotfiy(!notify)
    const existingCartItemIndex = cartItems.findIndex(
      (cartItem) => cartItem.restaurantId === restaurantId && cartItem.item.itemName === item.itemName
    );

    if (existingCartItemIndex !== -1) {
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingCartItemIndex] = {
        ...updatedCartItems[existingCartItemIndex],
        quantity: updatedCartItems[existingCartItemIndex].quantity - 1,
      };
      if (updatedCartItems[existingCartItemIndex].quantity === 0) {
        updatedCartItems.splice(existingCartItemIndex, 1);
      }
      setCartItems(updatedCartItems);
    }
  };

  const handleSearch = () => {
    setSearchQuery(searchInput);
  };

  const filteredRestaurants = restaurants.filter((restaurant) =>
    restaurant.menuItems &&
    Object.entries(restaurant.menuItems).some(([category, items]) =>
      items.some(
        (item) =>
          item.itemName.toLowerCase().includes(searchQuery.toLowerCase()) &&
          (selectedCategory.toLowerCase() === 'all' || category.toLowerCase() === selectedCategory.toLowerCase())
      )
    )
  );

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
    // console.log('a')
    if (notify)
      setNotfiy(!notify)
    if (document.getElementById('cart-links').style.display === 'none') {
      document.getElementById('cart-links').style.display = "block";
    }
    else document.getElementById('cart-links').style.display = "none";
  }
  /*

  const handleCheckOut = () => {
    navigator('/payments', { state: { f: 77 } });
  }*/



const handleOpenRazorpay = (data) => {

        const options = {
            key: 'rzp_test_FRazYtp3DBYKDA',
            amount: Number(data.amount),
            currency: data.currency,
            order_id: data.id,
            name: 'YumOnTheRun',//
            description: 'Get your orders in no time',//
            handler: function (response) {
                console.log(response, "34")
                 Axios.post('http://localhost:3000/verify', { response: response })
                // Axios.post('https://online-food-delivery-system.onrender.com/verify', { response: response })
                    .then(res => {
                        console.log(res, "37")
                        
                        // your orders
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }

        }
        const rzp = new window.Razorpay(options)
        rzp.open()

    }

    const handlePayment = (amount) => {
        const _data = { amount: amount }
         Axios.post('http://localhost:3000/orders', _data)
        // Axios.post('https://online-food-delivery-system.onrender.com/orders', _data)
            .then(res => {
                console.log(res.data, "29")
                handleOpenRazorpay(res.data.data)
            })
            .catch(err => {
                console.log(err)
            })
    }




  const calcTotalPrice = (prvTotal, currPrice) => {
    prvTotal += currPrice;
    abcd = prvTotal
    //console.log(abcd)//totalAmount
  }

  return (
    <div className="container">
      <div className="scroll-top" onClick={handleClick2} style={{ display: visibility ? "block" : "none" }} >
        <FaArrowCircleUp className='icon' />
      </div>
      <nav className="navbar">
        {/* <div className="navbar-brand">
          <Link to="/" className="logo">Food Delivery</Link>
        </div> */}
        <div className="logooo">
            <div className="logoo">
              <img src={logoimg} className="imglogo" />
            </div>
            <Link to="/" className="logo">YumOnTheRun</Link>
        </div>
        <div className={isMobile ? 'nav-links-mobile' : 'nav-links'}>
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/menu" className="nav-link">Menu</Link>
          <Link to="/contact2" className="nav-link">Contact</Link>
          <div>
            {notify ? <p className='notifier' style={{ backgroundColor: 'red', marginLeft: '36px', height: "6px", width: '6px', borderRadius: '3px', position: 'absolute' }}>   </p> : ''}
            <BsCartCheckFill onClick={showCartItems} className='nav-link' fontSize={20} style={{ cursor: "pointer", color: 'blue', position: 'relative' }} />
          </div>
          <div className='nav-link' style={{ textDecoration: "none", cursor: "pointer" }} onClick={handleLogOut}><div> username </div> </div>
          {/* <div className='nav-link' style={{backgroundColor:"black",borderRadius:"3px",height:'px',width:'7px'}}>   </div> */}
          {isMobile ? <div id='logout' onClick={logout} className='nav-link'> LogOut </div> : ' '}

        </div>
        <button className='mobile-menu-icon'
          onClick={() => setIsMobile(!isMobile)}
        >
          {isMobile ? <i className='fas fa-times'></i> : <i className='fas fa-bars'></i>}
        </button>
      </nav>
      <div id='logout' onClick={logout} style={{ color: "black", float: 'right', padding: "5px 5px" }}> LogOut </div>
      <div id='cart-links' style={{ display: 'none', backgroundColor: 'black', color: 'white' }} >
        {cartItems.length ? <div>
          <TableContainer border={1}>
            <Table border="1" style={{ width: "70%", justifyContent: "center" }} size='small' aria-label="caption table">
              <TableHead>
                <TableRow style={{ backgroundColor: 'burlywood', color: 'aliceblue' }}>
                  <TableCell style={{ textAlign: "center" }}> Item Name </TableCell>
                  <TableCell style={{ textAlign: "center" }}> Item Price </TableCell>
                  <TableCell style={{ textAlign: "center" }}> Item Quantity </TableCell>
                  <TableCell style={{ textAlign: "center", width: '90px' }}> Price </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  cartItems.map((obj, index) => {
                    return <TableRow key={index} style={{ height: "50px" }}>
                      {/* <div > <img src={obj.item.itemImg} style={{height:"100px",width:"100px"}} alt="" /> </div> */}
                      <TableCell style={{ color: "white", textAlign: "center" }}>{obj.item.itemName} </TableCell>
                      <TableCell style={{ color: "white", textAlign: "center" }}> &#8377;&nbsp;{obj.item.itemPrice} </TableCell>
                      <TableCell style={{ color: "white", textAlign: "center" }}> {obj.quantity} </TableCell>
                      <TableCell style={{ color: "white", textAlign: "center" }}> &#8377;&nbsp;{obj.item.itemPrice * obj.quantity} {calcTotalPrice(abcd, obj.item.itemPrice * obj.quantity)}</TableCell>
                    </TableRow>
                  })
                }
                <TableRow>
                  <TableCell colSpan={3} style={{ color: 'white', textAlign: 'center', padding: '20px 20px' }} >Total Price</TableCell>
                  <TableCell colSpan={3} style={{ color: 'white', textAlign: 'center', padding: '10px 10px' }} > &#8377; {abcd}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
            <Button variant='contained' color='secondary' onClick={() => handlePayment(abcd)} style={{ marginTop: "20px" }}>  Check Out  </Button> </div>

        </div> : <p style={{ width: '500px', textAlign: 'center' }}>No Items Added </p>}
      </div>
      <div className="search-barr">
        <input
          type="text"
          placeholder="Search..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button className="Search-button" onClick={handleSearch}>
          <img src={search} alt="Search Image" />
        </button>
        <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
          <option value="All">All</option>
          {[...new Set(
            restaurants.flatMap((restaurant) =>
              restaurant.menuItems &&
              Object.keys(restaurant.menuItems).map((category) =>
                category.toUpperCase()
              )
            ).filter((category) => category) // Remove blank categories
          )].map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div className="menu">
        <div className="restaurants-container">
          {filteredRestaurants.map((restaurant) => (
            <div key={restaurant.id} className="restaurant">
              <h2 style={{ color: "white", fontWeight: "bold"}}>{restaurant.RestaurantName}</h2>

              {Object.entries(restaurant.menuItems).map(([category, items]) => {
                const filteredItems = items.filter((item) =>
                  item.itemName.toLowerCase().includes(searchQuery.toLowerCase()) &&
                  (selectedCategory.toLowerCase() === 'all' || category.toLowerCase() === selectedCategory.toLowerCase())
                );

                if (filteredItems.length > 0) {
                  return (
                    <div key={category} className="category">
                      <h3 style={{ color: "white", fontWeight: "bold"}}>{category.toUpperCase()}</h3>
                      <div className="items-container">
                        {filteredItems.map((item) => {
                          const cartItem = cartItems.find(
                            (cartItem) =>
                              cartItem.restaurantId === restaurant.id && cartItem.item.itemName === item.itemName
                          );
                          const quantity = cartItem ? cartItem.quantity : 0;

                          return (
                            <div key={item.itemName} className="item-box">
                              <img src={item.itemImg} alt={item.itemName} className="item-image" />
                              <div className="item-details">
                                <p style={{ color: "black", fontWeight: "bold"}}>{item.itemName.toUpperCase()}</p>
                                <p style={{ color: "black", fontWeight: "bold"}}> &#8377;{item.itemPrice}/- </p>
                                <div className="quantity-container">
                                  <button style={{backgroundColor:"black"}}onClick={() => handleRemoveFromCart(restaurant.id, item)}>-</button>
                                  <p style={{ color: "black", fontWeight: "bold"}} >{quantity}</p>
                                  <button style={{backgroundColor:"black"}} onClick={() => handleAddToCart(restaurant.id, item)}>+</button>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                }

                return null;
              })}
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MenuPage;
