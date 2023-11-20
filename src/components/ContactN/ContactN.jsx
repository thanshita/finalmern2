import React,{useRef} from 'react'
import './ContactN.css'
import Footer from '../Footer/Footer'
import Navbar from '../Navbar/Navbar'
import emailjs from '@emailjs/browser';
import contactimg from './contactimg.jpg';
import conimg from './conimg.png';


const ContactN = () => {
    const form = useRef();
    const sendEmail = (e) => {
        e.preventDefault();
        emailjs.sendForm('service_n0k8fma', 'template_i3f4ujb',form.current, '1IAPN9qwM9uk4Xn3p')
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
    return (
        <>
            {/* <Navbar/> */}
            <section className="contact-section">

            <div className="contact-container">
               <img src={conimg} className="conimg"/>

               <div className="contact-content">
                    <h2>Contact Us</h2>
                    <p>Have a question or feedback? Reach out to us!</p>
                    <form ref={form} onSubmit={sendEmail}>
                        <input type="text" name='user_name' placeholder="Your Name" required/>
                        <input type="email" name='user_email' placeholder="Your Email" required />
                        <input type="phone" name='user_phone' placeholder="Your Mobile" required />
                        <textarea required name='user_message' placeholder="Your Message"></textarea>
                        <button type="submit">Send Message</button>
                    </form>
                </div>
            </div>
            </section>
            <Footer />
        </>
    )
}

export default ContactN
