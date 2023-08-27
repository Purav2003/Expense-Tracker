import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import dp from "./../assets/images/signup.png";
import Sidebar from "./Sidebar";
import Loader from "./Loader";
import axios from 'axios'

const Profile = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [showimage, setShowimage] = useState()
  const token = localStorage.getItem("Token");
  const [image, setImage] = useState(null);

  const handleImageChange = async (event) => {
    const selectedImage = event.target.files[0];
    setImage(selectedImage);

    // Automatically submit the form
    await handleImageUpload(selectedImage);
  };

  const handleImageUpload = async (selectedImage) => {
    setLoading(true)
    const id = localStorage.getItem('createdBy');
    const formData = new FormData();
    formData.append('image', selectedImage);

    try {
      await axios.post(`http://localhost:5000/api/v1/auth/uploadImage/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
      });

      // You can add code here to handle success, e.g., display a success message.
      console.log('Image uploaded successfully');

      // Automatically refresh the page after successful image upload
      window.location.reload();
    } catch (error) {
      console.error('Error uploading image:', error);
      // You can add code here to handle the error, e.g., display an error message.
    }
  };

  const fetchData = async () => {
    const id = localStorage.getItem('createdBy');
    const API_URL = `http://localhost:5000/api/v1/auth/profile/${id}`;

    try {
      const response = await fetch(API_URL, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data_new = await response.json();
      if (data_new.status === 495) {
        window.location.replace('/')
      }
      setData(data_new.user);

      // Set the image URL directly from the API response
      setShowimage("data:image/png;base64," + data_new.image);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setLoading(true)
    fetchData();
  }, []);

  return (
    <>
      <Sidebar />
      {loading ? <Loader /> : <div>
        <div className="lg:grid grid-cols-2 gap-0 lg:ml-[11vw]">
          {/* 1st Row */}
          <div className="col-span-1 w-[60%] p-4">
            <div className="bg-white">
              <center><br></br>

                {/* Display the image preview */}
                {showimage ? (
                  <img src={showimage} className="w-64 h-64 object-cover rounded-full cursor-pointer" alt="Profile" />
                ) : (
                  <img src={dp} className="rounded-full cursor-pointer" alt="Profile" />
                )}

                <br></br>
                <h1 className="font-bold text-[20px]">{data.name}</h1>

                {/* Visible input field for image selection */}
                <input type="file" id="imageInput" onChange={handleImageChange} />

              </center>
            </div>
          </div>
          <div className="col-span-1 w-[100%] p-4 lg:ml-[-19vw]">
            <div className="bg-white">
              <div className="p-4">
                <div className="w-[100%]">
                  <h1 className="py-4 font-bold text-[25px]">My Profile</h1>
                  <table className="w-full">
                    {/* Rest of your profile information */}
                  </table>
                  <div id="errore" className='text-[red]'></div>
                  <div id="errorm" className='text-[red]'></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      }
    </>
  );
};

export default Profile;
