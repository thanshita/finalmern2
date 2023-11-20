import React, { useContext } from 'react'
import { MultiStepContext } from '../Contexts/StepContext'
import { TableContainer,TableHead,TableBody,TableCell,TableRow,Table } from '@mui/material';

const DisplayAllData = () => {
    const {userData} = useContext(MultiStepContext);
  return (
    <div>
      <TableContainer style={{display:"flex",justifyContent:"center"}}>
        <Table border="1" style={{width:"70%",justifyContent:"center"}} size='small' aria-label="caption table">
            <TableHead >
                <TableRow style={{backgroundColor:'burlywood',color:'aliceblue'}}>
                    <TableCell style={{textAlign:"center"}}> Restaurant Name </TableCell>
                    {/* <TableCell colSpan={2} style={{textAlign:"center"}}> Restaurant location </TableCell> */}
                    <TableCell style={{textAlign:"center"}}> Owner Name </TableCell>
                    <TableCell style={{textAlign:"center"}}> Owner Email </TableCell>
                    <TableCell style={{textAlign:"center"}}> Owner Phone </TableCell>
                    {/* <TableCell style={{textAlign:"center"}}> Password </TableCell> */}
                </TableRow>
            </TableHead>
            <TableBody>
            <TableCell style={{textAlign:"center"}}> {userData.RestaurantName} </TableCell>
            {/* <TableCell style={{textAlign:"center"}}> {userData.RestaurantLocation[0]} </TableCell>
            <TableCell style={{textAlign:"center"}}> {userData.RestaurantLocation[1]} </TableCell> */}
            <TableCell style={{textAlign:"center"}}> {userData.OwnerName} </TableCell>
            <TableCell style={{textAlign:"center"}}> {userData.OwnerEmail} </TableCell>
            <TableCell style={{textAlign:"center"}}> {userData.OwnerPhone} </TableCell>
            {/* <TableCell style={{textAlign:"center"}}> {userData.OwnerPassword} {'*'.repeat(userData.OwnerPassword.length)} </TableCell> */}
            </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default DisplayAllData
