import React from 'react'
import './App.css'
import Contact from './components/Contact/Contact'
import Contact2 from './components/Contact2/Contact2'
import Stepperr from './components/Steps/Stepperr'
import StepContext from './components/Contexts/StepContext'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MenuPage from './components/MenuPage/MenuPage'
import SignUp from './components/Signup/SignUp'
import Login from './components/Login/Login'
import Home from './components/Home/Home'
import OwnerHome from './components/OwnerHome/OwnerHome'
import CustomerHome from './components/CustomerHome/CustomerHome'
import Payments from './components/Payments/Payments'
import ContactN from './components/ContactN/ContactN'
import CartDisplayer from './components/CartDisplayer/CartDisplayer'
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' exact element={<Home />}></Route>
        <Route path='/home' exact element={<Home />}></Route>
        <Route path='/menu' exact element={<MenuPage />}></Route>
        <Route path='/signupcust' exact element={<SignUp />}></Route>
        <Route path='/signuprest' exact element={<StepContext><Stepperr /></StepContext>}></Route>
        <Route path='/login' exact element={<Login />}></Route>
        <Route path='/contactt' exact element={<Contact />}> </Route>
        <Route path='/contact' exact element={<ContactN />}> </Route>
        <Route path='/contact2' exact element={<Contact2 />}> </Route>
        <Route path='/restowner' element={<OwnerHome />}></Route>
        <Route path='/customerlogin' exact element={<CustomerHome />}></Route>
        <Route path='/payments' exact element={<Payments />}></Route>
        <Route path='/displaycart' exact element={<CartDisplayer />}></Route>
      </Routes>
    </BrowserRouter>

  )
}

export default App
