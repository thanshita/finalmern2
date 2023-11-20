import React, { useContext, useState } from 'react'
import { Stack, Button, TextField, FormControl } from '@mui/material'
import StepContext from '../Contexts/StepContext';
import { MultiStepContext } from '../Contexts/StepContext';
import imageCompressor from 'browser-image-compression'
import './Steps.css'
//menuForm
const MenuForm = ({ change }) => {
    const [selectedImage, setSelectedImage] = useState('');
    const { menuItems, setMenuItems } = useContext(MultiStepContext);


    var reader;
    const convertToBase64 = (abcd) => {
        reader = new FileReader();
        reader.readAsDataURL(abcd);
        reader.onload = () => {
            // console.log(reader.result)
            setSelectedImage(reader.result)
        }
    }

    const compressImage = async (img) => {
        try {
            const compressedFile = await imageCompressor(img, { maxSizeMB: 0.01, maxWidthOrHeight: 1920 })
            console.log("after",compressedFile.size)
            convertToBase64(compressedFile);
        } catch (error) {
            console.log(error);
            alert("image compression failed")
        }
    }

    var obj;
    const doSomething = (e) => {
        e.preventDefault();
        // console.log("hehe");
        var itemCategory = document.getElementById('ic');
        var itemName = document.getElementById('in');
        var itemPrice = document.getElementById('ip');
        var itemImg = selectedImage;

        obj = {
            itemCategory: itemCategory.value,
            itemName: itemName.value,
            itemPrice: itemPrice.value,
            itemImg: itemImg
        }

        if (itemCategory.value === '') {
            alert('please add item category');
            itemCategory.focus()
            return
        }

        if (itemName.value === '') {
            alert('please add item name');
            itemName.focus()
            return
        }

        if (itemPrice.value === '') {
            alert('please add item price');
            itemPrice.focus()
            return
        }

        if (itemImg === '') {
            alert('please upload item image')
            return
        }

        setMenuItems([...menuItems, obj]);
        document.getElementById('mm').style.display = "none";
        change();

    }

    return (
        <>
            <div id='mm'>
                <FormControl>
                    <Stack direction="column" alignItems="center" spacing={2}>
                        <TextField label="Item Category" required margin='normal' variant='filled' color='secondary' id='ic'></TextField>
                        <TextField label="Item Name" required margin='normal' variant='filled' color='secondary' id='in'></TextField>
                        <TextField label="Item Price" required type='number' margin='normal' variant='filled' color='secondary' id='ip'></TextField>
                        <div>
                            <Button variant="contained" component="label">
                                Upload Item Image
                                <input hidden accept="image/*" required type="file" onChange={e => compressImage(e.target.files[0])} />
                            </Button>
                            {/* {selectedImage ? "selected" : "notslected"} */}
                        </div>
                        <Button type='submit' variant="contained" onClick={doSomething} component="label"> Submit </Button>
                    </Stack>
                </FormControl>
            </div>
            <br />
        </>
    )
}

export default MenuForm
