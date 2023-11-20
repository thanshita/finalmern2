import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { FaRegClock } from 'react-icons/fa';
import { MdOutlineFastfood } from 'react-icons/md';
import { GiHotSpices } from 'react-icons/gi';
import './Home.css'
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import ContactN from '../ContactN/ContactN';

const Home = () => {
  const [location, setLocation] = useState('');

  const handleSearch = () => {
    // Perform search using location value
    console.log('Search:', location);
  }

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleLocationClick = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        setLocation(`${latitude}, ${longitude}`);
      },
      (error) => {
        console.log('Error getting location:', error);
      }
    );
  };
  return (
    <>
      <div className="container">
        <header>
          <Navbar />
        </header>

        <main>
          <section className="search-section">
            <h1>Find the best food near you</h1>
            <div className="search-bar">
              <div>
                <input type="text" className='inp' placeholder="Enter your location" value={location} onChange={handleLocationChange} />
              </div>

              <div className="options">
                 <div>
                    <button type="button" className='btnn' onClick={handleLocationClick}> Use GPS </button>
                  </div>
                  <div>
                    <button type="submit" className='btnn' onClick={handleSearch}> Search </button>
                  </div>
              </div>
            </div>
          </section>
          <section className="services">
            <h2>Our Services</h2>
            <div className="service-container">
              <div className="serviceOne">
                <FaRegClock style={{ fontSize: "200%" }} />
                <h3>Fast Delivery</h3>
                <p>From kitchen to doorstep in record time - Experience lightning-fast delivery of mouthwatering meals!</p>
              </div>
              <div className="serviceTwo">
                <MdOutlineFastfood style={{ fontSize: "200%" }} />
                <h3>Wide Variety</h3>
                <p>Indulge in a culinary adventure with our vast selection of flavors from around the world - Satisfy every craving with our diverse and extensive menu!</p>
              </div>
              <div className="serviceThree">
                <GiHotSpices style={{ fontSize: "200%" }} />
                <h3>Quality Ingredients</h3>
                <p>Savor the Taste of Excellence - Delighting your palate with the finest, freshest ingredients sourced from trusted farmers and producers.</p>
              </div>
            </div>
          </section>
        </main>

        <ContactN/>
      </div>
    </>
  )
}

export default Home
