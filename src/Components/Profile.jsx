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
        <div className="bg-white">
<div className="max-w-sm w-full flex items-center sm:max-w-md bg-white shadow-xl rounded-lg overflow-hidden">
      <img className="w-32 h-32 mx-8 object-cover items-center" src={dp} alt={data.name} />
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800">{data.name}</h2>
        <p className="text-sm text-gray-600 flex items-center pt-2"><icon.BiEnvelope className="text-[20px]"/>&nbsp;{data.email}</p>
        <p className="text-sm text-gray-600 flex items-center pt-2"><icon.BiPhone className="text-[20px]"/>&nbsp; {data.mobile}</p>
        <p className="text-sm text-gray-600 flex items-center pt-2"><icon.BiCalendar className="text-[20px]"/>&nbsp;&nbsp;{data.createdAt?.slice(0,10)}</p>
        <div className="mt-4">
          <a
            href="#"
            className="block text-blue-500 hover:underline hover:text-blue-700"
          >
            
            Edit Profile
          </a>
        </div>
      </div>
    </div>


            <Sidebar />
        </div>
    )
}

export default Profile