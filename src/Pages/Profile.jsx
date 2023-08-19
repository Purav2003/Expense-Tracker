import Sidebar from "../Components/Sidebar"
import { useEffect, useState } from "react";
import axios from "axios";
import dp from "../Assets/images/signup.png"
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
            <br></br><br></br>

            <div className="sm:ml-64">
            <div className="lg:flex px-8 main-heading-mob">
    <h1 className="text-4xl font-bold">Profile</h1> 
    </div>
                <br></br><br></br>
            <center>
                <div className="shadow-2xl w-[50%]">
                <div>
                    <img src={dp}  height={400} width={400} className="rounded-full"/>

                </div><hr></hr><br></br>

                    <table>
                            <tr><td colSpan={4} className="font-semibold">Name:</td><td> {data.name}</td></tr>
                            <tr><td colSpan={4} className="font-semibold">Email:</td><td> {data.email}</td></tr>
                            <tr><td colSpan={4} className="font-semibold">Phone: </td><td>{data.mobile}</td></tr>
                            <tr><td colSpan={4} className="font-semibold">Creation Date:</td><td> {data.createdAt?.slice(0,10)}</td></tr>
                    </table><br></br>
                </div>
            </center>
             
                <Sidebar />
            </div>
        </div>
    )
}

export default Profile