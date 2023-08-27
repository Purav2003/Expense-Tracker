import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import dp from "./../assets/images/signup.png";
import Sidebar from "./Sidebar";
import Loader from "./Loader";
import axios from 'axios';

const Profile = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [showimage, setShowimage] = useState();
  const token = localStorage.getItem("Token");
  const [image, setImage] = useState(null);

  const fileInputRef = useRef(null);

  const handleImageChange = async (event) => {
    const selectedImage = event.target.files[0];
    setImage(selectedImage);

    // Automatically submit the form
    await handleImageUpload(selectedImage);
  };

  const handleImageUpload = async (selectedImage) => {
    setLoading(true);
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
      setShowimage("data:image/png;base64," + data_new.image)
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleImageClick = () => {
    // Trigger the file input when the image is clicked
    fileInputRef.current.click();
  };

  useEffect(() => {
    setLoading(true);
    fetchData();
  }, []);

  // ... (previous code)

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
              <div className="relative cursor-pointer">
                <img
                  src={showimage || dp} // Use dp if showimage is not available
                  className="w-64 h-64 object-cover rounded-full"
                  alt="Profile"
                  onClick={handleImageClick} // Handle click event
                />
                <span className="absolute top-0 rounded-full w-64 h-64 left-10 bottom-0 flex items-center justify-center opacity-0 transition-opacity duration-300 hover:opacity-100 bg-black bg-opacity-60 text-white text-sm cursor-pointer">
                  Choose Image
                </span>
              </div>

              <br></br>
              <h1 className="font-bold text-[20px]">{data.name}</h1>

              {/* Hidden file input for image selection */}
              <input
                type="file"
                id="imageInput"
                onChange={handleImageChange}
                ref={fileInputRef} // Reference to the file input
                style={{ display: "none" }} // Hide the input element
              />

            </center>
          </div>
        </div>
        <div className="col-span-1 w-[100%] p-4 lg:ml-[-19vw]">
            <div className="bg-white">
              <div className="p-4">
                <div className="w-[100%]">
                  <h1 className="py-4 font-bold text-[25px]">My Profile</h1>
                  <table className="w-full">
                    <tr className="border p-4">
                      <td className="border p-4 w-[50%]">Name</td>
                      <td className="border p-4 w-[50%] ">{data.name}</td>
                    </tr>
                    <tr className="border p-4">
                      <td className="border p-4 w-[50%]">E-mail</td>
                      <td className="p-4">{data.email}</td>
                    </tr>
                    <tr className="border p-4">
                      <td className="border p-4 w-[50%]">Phone</td>
                      <td className="p-4">{data.mobile}</td>
                    </tr>
                    <tr className="border p-4">
                      <td className="border p-4 w-[50%]">Join Date</td>
                      <td className="p-4">{data.createdAt?.slice(0, 10)}</td>
                    </tr>
                    <tr className="border p-4">
                      <td className="border p-4 w-[50%]">No of. Categories</td>
                      <td className="p-4">{data.categories.length}</td>
                    </tr>
                    <tr className="border p-4">
                      <td className="border p-4 w-[50%]">Categories</td>
                      <td className="p-4">{data.categories.join(' , ')}</td>
                    </tr>
                    <tr className="border p-4">
                      <td className="border p-4 w-[50%]">Currency</td>
                      <td className="p-4">
                        {
                          data.currency === 'INR' ? '₹ '
                            : data.currency === 'USD' ? "$ "
                              : data.currency === 'CAD' ? "C$ "
                                : data.currency === "AED" ? "د.إ "
                                  : data.currency === "EUR" ? "€ "
                                    : data.currency === "GBP" ? "£ "
                                      : data.currency === "JPY" ? "¥ "
                                        : data.currency === "AUD" ? "AU$ "
                                          : ""
                        }
                        {data.currency}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-4 w-[50%] text-center items-center" colSpan={2} >
                        <Link to="/reset-password">
                          <button type="button" className="bg-white text-fourth border border-fourth py-2 px-4 rounded-full">
                            Reset Password
                          </button>
                        </Link>
                        <Link to="/edit-profile">
                          <button type="button" className="ml-4 bg-fourth text-white py-2 px-4 rounded-full">
                            Edit Profile
                          </button>
                        </Link>
                      </td>
                    </tr>
                  </table>
                  <div id="errore" className='text-[red]'></div>
                  <div id="errorm" className='text-[red]'></div>
                </div>
              </div>
              </div></div>             </div>
    </div>
    }
  </>
);
  }

export default Profile;
