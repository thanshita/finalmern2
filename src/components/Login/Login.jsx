import React, { useContext, useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import Axios from 'axios'
import { FormControl, Stack, TextField, Button, Checkbox, FormControlLabel } from '@mui/material';
import './../Login/Login.css'
import { Link } from 'react-router-dom';
import bcrypt from 'bcryptjs'
import Footer from '../Footer/Footer';
import Navbar from './../Navbar/Navbar'
import { userdetailscontext } from '../Contexts/UserContext';
import loginimg from './loginimage.jpg';

const Login = () => {
    // const { userDetails, setUserDetails, isCustomer, setAsCustomer } = useContext(userdetailscontext)
    const [userDetails, setUserDetails] = useState({});
    const [isCustomer, setAsCustomer] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const navigator = useNavigate();

    const hasher = (pass) => {
        return bcrypt.hashSync(pass, '$2a$10$CwTycUXWue0Thq9StjUM0u')
    }

    const handlechange = (e, label) => {
        setUserDetails({ ...userDetails, [label]: e.target.value })
    }

    const checkUserExistence = () => {

        if (userDetails.email === '') {
            alert('please enter ur email id');
            return;
        }

        if (userDetails.password === '') {
            alert('please enter ur password');
            return;
        }

        var hashedpass = hasher(userDetails.password)
        var url = 'usercheck';
        if (isCustomer) {
            /*
            url = url + '1';
            Axios.get('http://localhost:3001/' + url, { params: { email: userDetails.email.toLowerCase() } })
            .then(function (response) {
                // console.log(response);
                // console.log(hashedpass)
                console.log(response)
                if (response.data.length === 0) {
                    alert('user doesnt not exist');
                }
                else {
                    var temp;
                    temp = response.data[0].CustomerPassword;
                    if (response.data.length !== 0 && hashedpass === temp) {
                        // alert("Login successfull hoyya");
                        navigator('/customerlogin',{state:{email : userDetails.email}})
                    } else {
                        alert('Invalid password')
                    }
                }

            }).catch(err => console.log(err))*/
            Axios.get('http://localhost:3000/custdetails')
            // Axios.get('https://online-food-delivery-system.onrender.com/custdetails')
      .then((res) => {
        const cust = res.data.find((d) => d.CustomerEmail === userDetails.email);

        if (!cust) {
          setError('Restaurant owner not found.');
          return;
        }

        const isPasswordMatch = bcrypt.compare(userDetails.password, cust.CustomerPassword);

        if (isPasswordMatch) {
          // Password matches, navigate to the dashboard
          //navigate('/restowner', { state: { loggedInRestaurant: restaurant } });
          navigator('/customerlogin',{state:{email : userDetails.email}})
        } else {
          setError('Invalid password.');
        }
      })
      .catch((err) => {
        console.log(err);
        setError('An error occurred. Please try again later.');
      });
    }
        else {
            //url = url +'2';
            Axios.get('http://localhost:3000/resdetails')
            // Axios.get('https://online-food-delivery-system.onrender.com/resdetails')
      .then((res) => {
        const restaurant = res.data.find((d) => d.OwnerEmail === userDetails.email);

        if (!restaurant) {
          setError('Restaurant owner not found.');
          return;
        }

        const isPasswordMatch = bcrypt.compare(userDetails.password, restaurant.OwnerPassword);

        if (isPasswordMatch) {
          // Password matches, navigate to the dashboard
          navigate('/restowner', { state: { loggedInRestaurant: restaurant } });
        } else {
          setError('Invalid password.');
        }
      })
      .catch((err) => {
        console.log(err);
        setError('An error occurred. Please try again later.');
      });
  };
        
    }
        // Axios.get('https://online-food-delivery-system.onrender.com/' + url, { params: { email: userDetails.email.toLowerCase() } })
            
        

                    
    return (
        <>
            <Navbar />
            <div className='logincontainer'>
            <div id='abcd2' style={{ margin: "auto" }}>
                <FormControl id='logindiv' style={{ width: "1000px"}}>
                    <h2 style={{ color: "magenta", margin: "30px 0" }}>Login Form</h2>
                    <Stack direction="column" alignItems="center" spacing={2}>
                        <TextField label="Email" required margin='normal' variant='filled' color='secondary' onChange={e => handlechange(e, 'email')}></TextField>
                        <TextField label="Password" type='password' required margin='normal' variant='filled' color='secondary' onChange={e => handlechange(e, 'password')}></TextField>
                        <FormControlLabel control={<Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }} />} label="Check if ur an customer" onChange={() => setAsCustomer(!isCustomer)} />
                        <Button type='submit' variant="contained" component="label" onClick={checkUserExistence}> Submit </Button>
                        <Link to='/signupcust' style={{ textDecoration: "none" }}> <p className='c' style={{ color: "blue"}}>Create an account as a customer</p> </Link>
                        <Link to='/signuprest' style={{ textDecoration: "none" }}> <p className='c' style={{ color: "blue"}}>Create an account as a Restaurant Owner</p> </Link>
                    </Stack>
                </FormControl>
            </div>
            <img
          src={loginimg}
          alt="logimg"
          width={700}
          height={504}
          loading="lazy"
          className="loginimg "
        />
            </div>
            
            <Footer />
        </>
    )
}

export default Login

