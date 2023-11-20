import React, { useRef } from 'react'
import './Contact.css'
import Footer from './../Footer/Footer'
import emailjs from '@emailjs/browser'
import Navbar from '../Navbar/Navbar'
import Navbar2 from '../Navbar2/Navbar2'

const Contact = () => {
    const form = useRef();
    const sendEmail = (e) => {
        e.preventDefault();
        emailjs.sendForm('service_n0k8fma', 'template_i3f4ujb', form.current, '1IAPN9qwM9uk4Xn3p')
            .then((result) => {
                alert("Sent Message Successfully ✅")
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });

        emailjs.sendForm('service_n0k8fma', 'template_5oq37zt', form.current, '1IAPN9qwM9uk4Xn3p')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
    }

    return (<>
        <Navbar2 />
        <section className="contact">
            <div className="content">
                <h2>Contact Us</h2>
            </div>
            <div className="containerrr">
                <div className="contactInfo">
                    <div className="box">
                        <div className="icon"><i className="fa-sharp fa-solid fa-location-dot" aria-hidden="true"></i></div>
                        <div className="text">
                            <h3>Address</h3>
                            <p>XXXXXXXXXX <br /> XXXXXXXXXX <br /> </p>
                        </div>
                    </div>

                    <div className="box">
                        <div className="icon"><i className="fa-solid fa-phone" aria-hidden="true"></i></div>
                        <div className="text">
                            <h3>Phone</h3>
                            <p> +91 XXXXXXXXXX </p>
                        </div>
                    </div>

                    <div className="box">
                        <div className="icon"><i className="fa-solid fa-envelope" aria-hidden="true"></i></div>
                        <div className="text">
                            <h3>Email</h3>
                            <p> XXXX@gmail.com </p>
                        </div>
                    </div>
                </div>
                <div className="contactForm">
                    <form ref={form} onSubmit={sendEmail}>
                        <h2>Send Message</h2>
                        <div className="inputBox">
                            <input type="text" name='user_name' required />
                            <span>Full Name</span>
                        </div>
                        <div className="inputBox">
                            <input type="email" name='user_email' required />
                            <span>Email</span>
                        </div>
                        <div className="inputBox">
                            <input type="tel" name='user_phone' required />
                            <span>Phone</span>
                        </div>
                        <div className="inputBox">
                            <textarea required name='user_message'></textarea>
                            <span>Type your Message</span>
                        </div>
                        <div className="inputBox">
                            <input type="submit" value="Send" />
                        </div>
                    </form>
                </div>
            </div>
        </section>
        <Footer/>
    </>
    )
}

export default Contact
