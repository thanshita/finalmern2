import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Axios from 'axios';
import imageCompression from 'browser-image-compression';
import Navbar2 from '../Navbar2/Navbar2';
import './OwnerHome.css'

const OwnerHome = () => {
    // const { userDetails, setUserDetails, isCustomer, setAsCustomer } = useContext(userdetailscontext);
    // const {userDetails} = useNavigate()
    const location = useLocation();
  const loggedInRestaurant = location.state?.loggedInRestaurant;

  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    if (loggedInRestaurant) {
      const { menuItems: initialMenuItems } = loggedInRestaurant;
      setMenuItems(initialMenuItems);
    }
  }, [loggedInRestaurant]);

  useEffect(() => {
    if (loggedInRestaurant) {
      updateMenuItemsInDatabase();
    }
  }, [menuItems, loggedInRestaurant]);

  const updateMenuItemsInDatabase = () => {
     Axios.put('http://localhost:3000/update', {
    // Axios.put('https://online-food-delivery-system.onrender.com/update', {
      OwnerEmail: loggedInRestaurant.OwnerEmail,
      menuItems,
    })
      .then((res) => {
        console.log('Menu items updated successfully');
      })
      .catch((err) => {
        alert('Error updating menu items:', err);
      });
  };

  const handleAddItem = async (category, newItem) => {
    const compressedImage = await compressImage(newItem.itemImg);
    const base64Image = await convertToBase64(compressedImage);
    const updatedItem = { ...newItem, itemImg: base64Image };

    setMenuItems((prevMenuItems) => {
      const updatedItems = { ...prevMenuItems };

      if (!updatedItems[category]) {
        updatedItems[category] = [];
      }

      updatedItems[category] = [...updatedItems[category], updatedItem];

      return updatedItems;
    });
  };

  const handleRemoveItem = (category, itemName) => {
    const confirmed = window.confirm("Are you sure you want to delete this item?");
    if (confirmed) {
      setMenuItems((prevMenuItems) => {
        const updatedItems = { ...prevMenuItems };
  
        if (updatedItems[category]) {
          updatedItems[category] = updatedItems[category].filter((item) => item.itemName !== itemName);
        }
  
        return updatedItems;
      });
    }
  };
  

  const compressImage = async (imageFile) => {
    try {
      const options = {
        maxSizeMB: 0.01, // Maximum size in MB
        maxWidthOrHeight: 1920, // Maximum width or height in pixels
        useWebWorker: true, // Use web workers for compression (recommended)
      };

      const compressedFile = await imageCompression(imageFile, options);
      return compressedFile;
    } catch (error) {
      console.log('Image compression error:', error);
      return imageFile;
    }
  };

  const convertToBase64 = (imageFile) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(imageFile);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  if (!loggedInRestaurant) {
    return <div>No restaurant found.</div>;
  }

  const { RestaurantName} = loggedInRestaurant;
  const {OwnerName}=loggedInRestaurant;

  return (
    <div className="menu">
        <Navbar2 ownerName={OwnerName} />
      <header>
        <h2>Welcome {OwnerName}</h2>
      </header>

      <section className="restaurant">
        <h4>{RestaurantName} Menu:</h4>
        {Object.entries(menuItems).map(([category, items]) => (
          <div className="category" key={category}>
            <h3>{category}</h3>
            <div className="items-container">
              {items.map((item) => (
                <div className="item-box" key={item.itemName}>
                  <img className="item-image" src={item.itemImg} alt={item.itemName} />
                  <p className="item-details">{item.itemName}</p>
                  <p className="item-details">{item.itemPrice}</p>
                  <button onClick={() => handleRemoveItem(category, item.itemName)}>Delete</button>
                </div>
              ))}
            </div>
          </div>
        ))}
        <h4>Add New Item:</h4>
      </section>

      <section className='addnew'>
        
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const category = e.target.category.value;
            const itemName = e.target.itemName.value;
            const itemPrice = e.target.itemPrice.value;
            const itemImg = e.target.itemImg.files[0];

            if (!category || !itemName || !itemPrice || !itemImg) {
              console.log('Please fill in all the fields');
              return;
            }

            handleAddItem(category, {
              itemName,
              itemPrice,
              itemImg,
            });

            e.target.reset();
          }}
        >
          <label>
            Category:<br/>
            <input type="text" name="category" />
          </label>
          <br />
          <label>
            Item Name:<br/>
            <input type="text" name="itemName" />
          </label>
          <br />
          <label>
            Item Price:<br/>
            <input type="text" name="itemPrice" />
          </label>
          <br />
          <label>
            Item Image:<br/>
            <input type="file" name="itemImg" accept="image/*" style={{ display: "none" }} />
            <span className="custom-file-label">Upload Image</span>
            </label>
          <br />
          <button type="submit">Add Item</button>
        </form>
      </section>
    </div>
  );
};

    
export default OwnerHome
