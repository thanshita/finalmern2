import React, { useState, useContext } from 'react'
import { Button, TextField, Stack } from '@mui/material'
import './Steps.css'
import { MultiStepContext } from '../Contexts/StepContext'

const RestaurantDetails = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    // const [location, setLocation] = useState([]);
    const { setStep, userData, setUserData } = useContext(MultiStepContext);

    const getLocation = () => {
        if (!navigator.geolocation) {
            alert('Geolocation is not supported by your browser');
        } else {
            alert('Locating...');
            navigator.geolocation.getCurrentPosition((position) => {
                console.log(position)
                // setLocation([position.coords.latitude, position.coords.longitude])
                setUserData({
                    ...userData,
                    'RestaurantLocation': [position.coords.latitude, position.coords.longitude]
                })

            }, () => {
                alert('Unable to retrieve your location');
            });
        }
    }

    const handleData = () => {
        var RestaurantName = document.getElementById('rn').value;
        if (RestaurantName === '') {
            alert('please fill restaurant name');
        }
        else {
            if (userData.RestaurantLocation[0] !== undefined && userData.RestaurantLocation[1] !== undefined) {
                // var obj = {
                //     RestaurantName: RestaurantName,
                //     // RestaurantImg: objectUrl,
                //     RestaurantLocation: location
                // }

                // setUserData({
                //     ...userData,
                //     obj
                // })

                console.log(userData);
                setStep(2);
            } else {
                if (userData.RestaurantLocation[0] === undefined) {
                    alert('please click location button')
                }
            }
        }
    }



    return (
        <div id='con'>
            <TextField label="Restaurant Name" id='rn' value={userData.RestaurantName} required margin='normal' variant='filled' color='secondary' onChange={(e) => setUserData({ ...userData, 'RestaurantName': e.target.value })}></TextField>
            <br />
            {/* <Stack direction="row" alignItems="center" spacing={2}>
                <Button variant="contained" component="label">
                    Upload Restaurant Image
                    <input hidden accept="image/*" required type="file" value={userData.RestaurantImg}  onChange={e => {setSelectedImage(e.target.files[0]);setUserData({ ...userData,'RestaurantImg' :  URL.createObjectURL(e.target.files[0]) })}} />
                    <img src={selectedImage} alt="" />
                </Button>
            </Stack> */}
            {/* <br /> */}
            <Stack direction="row" alignItems="center" spacing={2}>
                <Button variant="contained" component="label" onClick={getLocation} value={userData.RestaurantLocation}>
                    Set Restaurant Location
                </Button>
                {/* {(location.latitude && location.longitude) ? (location.latitude + " " + location.longitude) : ''} */}
            </Stack>
            <br />
            {(userData.RestaurantLocation[0]) ? (userData.RestaurantLocation[0] + "  " + userData.RestaurantLocation[0]) : ''}

            {/* <TextField label="Restaurant Location" margin='normal' variant='outlined' color='secondary'></TextField> */}
            <Button variant='contained' color='primary' style={{ marginTop: "20px" }} onClick={handleData}> Next </Button>
        </div>
    )
}

export default RestaurantDetails
