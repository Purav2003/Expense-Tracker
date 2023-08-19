import Sidebar from "../Components/Sidebar"
import { useEffect, useState } from "react";
import axios from "axios";

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
            <div className="sm:ml-64"><br></br><br></br>
                <center>{data.name}<br></br>
                {data.mobile}<br></br>
                {data.email}<br></br>
                {data.createdAt?.slice(0,10)}</center>
                <Sidebar />
            </div>
        </div>
    )
}

export default Profile