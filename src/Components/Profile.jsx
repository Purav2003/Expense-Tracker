import Sidebar from "./Sidebar"
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import dp from "../Assets/images/signup.png"
import * as icon from 'react-icons/bi'

const Profile = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    let token = localStorage.getItem("Token")
    if (token === null) {
        window.location.replace("/")
    }

    const fetchData = async () => {
        let id = localStorage.getItem('createdBy');
        const API_URL = 'http://localhost:5000/api/v1/auth/profile/' + id
        console.log(API_URL)
        try {
            const response = await fetch(API_URL);
            const data_new = await response.json();
            console.log(data_new.user)
            setData(data_new.user)
            console.log(data)
            setLoading(false)
        } catch (error) {
            console.log(error)
        }
    };
    useEffect(() => {
        setLoading(true);
        fetchData();
    }, []);

    return (

        <div className="bg-tertiary">
        <Sidebar /> 
        <center><div className="profile w-full flex items-center sm:max-w-2xl bg-white shadow-xl rounded-lg overflow-hidden profile">
      <img className="w-64 h-64 mx-8 object-cover items-center" src={dp} alt={data.name} />
      <div className="px-8 ">
        <h2 className="text-lg text-gray-600 flex items-center pt-2"><icon.BiUser className="text-[20px]"/>&nbsp;User: {data.name}</h2>
       <p className="text-lg text-gray-600 flex items-center pt-2"><icon.BiEnvelope className="text-[20px]"/>&nbsp;Email:&nbsp;{data.email}</p>
        <p className="text-lg text-gray-600 flex items-center pt-2"><icon.BiPhone className="text-[20px]"/>&nbsp;Phone:&nbsp; {data.mobile}</p>
        <p className="text-lg text-gray-600 flex items-center pt-2"><icon.BiCalendar className="text-[20px]"/>&nbsp;&nbsp;Created At:&nbsp;{data.createdAt?.slice(0,10)}</p><br></br>
        <div className="mt-4 flex ">
          <Link
            to="/reset-password"
            className="block bg-blue-500 px-4 text-white py-2 rounded-full text-center "
          >
            Reset Password
          </Link>
          <Link
            to="/edit-profile"
            className="block bg-blue-500 text-white px-4 mx-2 py-2 rounded-full text-center "
          >
            
            Edit Profile
          </Link>
        </div>
      </div>
    </div>

    </center>
    <div style={{height:'87vh'}}></div>
        </div>
    )
}

export default Profile