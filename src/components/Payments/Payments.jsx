import React, { useEffect, useState } from 'react';
import './Payments.css';
import { useLocation, useNavigate } from 'react-router-dom';

const Payments = () => {
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [totalAmount, setTotalAmount] = useState(0);
    const location = useLocation();
    const [dummy, setDummy] = useState(false);
    console.log("out L ", location)
    const navigate = useNavigate();
    // const amount = useLocation();



    const handleCardNumberChange = (event) => {
        setCardNumber(event.target.value);
    };

    const handleExpiryDateChange = (event) => {
        setExpiryDate(event.target.value);
    };

    const handleCvvChange = (event) => {
        setCvv(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Perform payment processing logic here
        // You can send the card number, expiry date, and cvv to a server for processing
        console.log('Payment submitted');
    };

    // useEffect(() => {
    //     console.log(location)
    //     setDummy(!dummy)
    //     // navigate(1);
    //     // setTotalAmount(location.state.totalCost)
    // }, [])

    return (
        <div class="PaymentPage">
            <h1>Payment Page</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Card Number:
                    <input type="text" value={cardNumber} onChange={handleCardNumberChange} />
                </label>
                <br />
                <label>
                    Expiry Date:
                    <input type="text" value={expiryDate} onChange={handleExpiryDateChange} />
                </label>
                <br />
                <label>
                    CVV:
                    <input type="text" value={cvv} onChange={handleCvvChange} />
                </label>
                <label>
                    Amount:
                    <input type="text" disabled value={location.state !== null ? location.state.f : '000'} />
                </label>

                <br />
                <button type="submit">Submit Payment</button>
                {dummy ? setDummy(!dummy) : ''}
            </form>
        </div>
    );
};

export default Payments;