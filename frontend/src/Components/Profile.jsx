import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import dp from "../Assets/images/signup.png";
import Sidebar from "./Sidebar";
import Loader from "./Loader";
const Profile = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("Token");


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
                <img src={dp} className="rounded-full"></img><br></br>
                <h1 className="font-bold text-[20px]">{data.name}</h1>
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

                        {data.currency}</td>

                    </tr>
                    <tr>

                      <td className="py-4 w-[50%] text-center items-center" colSpan={2} >
                        <Link to="/reset-password"><button type="button" className="bg-white text-fourth border border-fourth py-2 px-4 rounded-full">
                          Reset Password
                        </button></Link>
                        <Link to="/edit-profile"><button type="button" className="ml-4 bg-fourth text-white py-2 px-4 rounded-full">
                          Edit Profile
                        </button></Link>
                      </td>
                    </tr>
                  </table>
                  <div id="errore" className='text-[red]'></div>
                  <div id="errorm" className='text-[red]'></div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>}
    </>
  );
};

export default Profile;
