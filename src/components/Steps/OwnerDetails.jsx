import React, { useContext, useState } from 'react'
import { Button, TextField } from '@mui/material'
import './Steps.css'
import { MultiStepContext } from '../Contexts/StepContext';
import bcrypt from 'bcryptjs'

const OwnerDetails = () => {
    const { setStep, userData, setUserData } = useContext(MultiStepContext);

    const handleChange = (e, label) => {
        setUserData({ ...userData, [label]: e.target.value })
    }


    const hasher = (pass) => {
        return bcrypt.hashSync(pass, '$2a$10$CwTycUXWue0Thq9StjUM0u')
    }
    const handleData = () => {
        // console.log(userData.RestaurantName)
        var OwnerName = document.getElementById('on');
        var OwnerEmail = document.getElementById('oe');
        var OwnerPhone = document.getElementById('op');
        var OwnerPassword = document.getElementById('opwd');

        // validation

        // var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        var validRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        var validPhone = /^[+]?(1\-|1\s|1|\d{3}\-|\d{3}\s|)?((\(\d{3}\))|\d{3})(\-|\s)?(\d{3})(\-|\s)?(\d{4})$/g;

        var proceedNext = true;
        if (OwnerName.value === '') {
            OwnerName.focus()
            alert("please enter valid name")
            proceedNext = false;
        } else if (!OwnerEmail.value.match(validRegex)) {
            OwnerEmail.focus()
            alert("please enter valid email address")
            proceedNext = false;
        } else if (!validPhone.test(OwnerPhone.value)) {
            OwnerPhone.focus()
            alert("please enter valid phone number")
            proceedNext = false;
        } else if (OwnerPassword.value.length < 6) {
            OwnerPassword.focus()
            alert("password should be atleast 6 characters")
            proceedNext = false;
        }

        if (proceedNext) {
            var hashedOwnerPassword = hasher(OwnerPassword.value);

            setUserData({
                ...userData,
                hashedOwnerPassword: hashedOwnerPassword
            })

            console.log(userData)
            setStep(3);
        }
    }

    return (
        <div id='con'>
            <TextField label="Owner Name" id='on' value={userData.OwnerName} onChange={e => handleChange(e, 'OwnerName')} required margin='normal' variant='filled' color='secondary'></TextField>
            <TextField label="Owner Email" id='oe' value={userData.OwnerEmail} onChange={e => handleChange(e, 'OwnerEmail')} required margin='normal' variant='filled' color='secondary'></TextField>
            <TextField label="Owner Phone" type='number' id='op' value={userData.OwnerPhone} onChange={e => handleChange(e, 'OwnerPhone')} required margin='normal' variant='filled' color='secondary'></TextField>
            <TextField label="Password" type='password' id='opwd' value={userData.OwnerPassword} onChange={e => handleChange(e, 'OwnerPassword')} required margin='normal' variant='filled' color='secondary'></TextField> <br />
            <div>
                <Button variant='contained' color='secondary' onClick={() => setStep(1)}> Back </Button> &nbsp;&nbsp;&nbsp;&nbsp;
                <Button variant='contained' color='primary' onClick={handleData}> Next </Button>
            </div>
        </div>
    )
}

export default OwnerDetails
