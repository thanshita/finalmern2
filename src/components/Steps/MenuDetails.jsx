import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material'
import './Steps.css'
import MenuForm from './MenuForm'
import { MultiStepContext } from '../Contexts/StepContext'
import DisplayAllData from './DisplayAllData'
import Axios from 'axios'

const MenuDetails = () => {
    const [upload, setUpload] = useState(false);
    const [FormVisible, setFormVisibility] = useState(false);
    const [dummy, setDummy] = useState(0);
    const { menuItems, currentStep, setStep, userData, setUserData } = useContext(MultiStepContext);
    const navigator = useNavigate();

    const changeState = () => {
        console.log(menuItems)
        setFormVisibility(!FormVisible);
    }

    const SubmitData = () => {
        if (FormVisible) {
            changeState()
        }
        if (!upload) {

            const menuItemsSep = menuItems.reduce((item, { itemCategory, itemName, itemPrice, itemImg }) => {
                if (!item[itemCategory]) item[itemCategory] = [];
                item[itemCategory].push({ itemName: itemName, itemPrice: itemPrice, itemImg: itemImg });
                return item;
            }, {});

            setUserData({
                ...userData,
                menuItemsSep
            })

            console.log("clicking submit : ", userData)
            setUpload(!upload)
            setStep(currentStep + 1)
        } else {

            console.log(userData.hashedOwnerPassword)

            console.log("clicking submit : ", userData)
            // Axios.post('https://online-food-delivery-system.onrender.com/upload', userData)
                 Axios.post('http://localhost:3000/upload', userData)
                .then((res) => console.log(res))
                .catch(err => console.log(err))

            alert('all details saved successfully✅✅');
            // alert('Will be Redirected to login page');
            navigator('/home')
        }
        // console.log("hoyyyaa");

    }

    const handleDelete = (index) => {
        console.log('delee', index - 1);
        menuItems.splice(index - 1, 1);
        console.log(menuItems)
        setDummy(!dummy);
    }

    return (
        <div id='con'>
            <DisplayAllData />
            {!upload ? <><Button variant='contained' color='secondary' onClick={() => setFormVisibility(!FormVisible)} style={{ marginTop: "30px" }}> {FormVisible ? "Close" : "Add Items"} </Button><br /></> : ''}
            {FormVisible ? <MenuForm change={changeState} /*updateMenu={updateMenu}*/ /> : ''}
            <br />
            {menuItems.length ? (<><h2>Added items list </h2> <br />
                <TableContainer border={1}>
                    <Table border="1" style={{ width: "70%", justifyContent: "center" }} size='small' aria-label="caption table">
                        <TableHead >
                            <TableRow style={{ backgroundColor: 'burlywood', color: 'aliceblue' }}>
                                <TableCell style={{ textAlign: "center" }}> Id </TableCell>
                                <TableCell style={{ textAlign: "center" }}> Item Category </TableCell>
                                <TableCell style={{ textAlign: "center" }}> Item Name </TableCell>
                                <TableCell style={{ textAlign: "center" }}> Item Price </TableCell>
                                <TableCell style={{ textAlign: "center" }}> Item Image </TableCell>
                                {!upload ? <TableCell style={{ textAlign: "center" }}> Action </TableCell> : ''}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                menuItems.map((item, index) => {
                                    return (<TableRow key={index + 1}>
                                        <TableCell style={{ textAlign: "center" }}>{index + 1}</TableCell>
                                        <TableCell style={{ textAlign: "center" }}>{item.itemCategory}</TableCell>
                                        <TableCell style={{ textAlign: "center" }}>{item.itemName}</TableCell>
                                        <TableCell style={{ textAlign: "center" }}>{item.itemPrice}</TableCell>
                                        <TableCell style={{ textAlign: "center" }}><img src={item.itemImg} style={{ height: "50px", width: "50px" }} alt={item.itemName + 'image'} /></TableCell>
                                        {!upload ? <TableCell> <Button variant='contained' sx={{ backgroundColor: "red" }} color='secondary' style={{ marginTop: "0px" }} onClick={() => handleDelete(index + 1)}> Delete  </Button> </TableCell> : ''}
                                    </TableRow>);
                                })
                            }
                        </TableBody>
                    </Table>
                </TableContainer></>) : ''}
            <Button variant='contained' color='secondary' style={{ marginTop: "20px" }} onClick={() => { setStep(currentStep - 1); setUpload(!upload) }} > Back </Button>
            <Button variant='contained' color='primary' style={{ marginTop: "20px", marginBottom: "100px" }} onClick={SubmitData}>  {upload ? "Submit all details" : "Click to preview"}  </Button>
            {/* <Displayer/> */}
        </div>
    )
}

export default MenuDetails
