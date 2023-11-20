import React, { createContext, useState } from 'react'
import App from '../../App';

export const PContext = createContext("")

const PaymentContext = () => {
    const [amount, setTotalAmount] = useState(0);

    return (
        <div>
            <PContext.Provider value={{ amount, setTotalAmount }}>
                <App/>
            </PContext.Provider>
        </div>
    )
}

export default PaymentContext
