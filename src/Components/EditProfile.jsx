import { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Loader from './Loader';
const EditProfile = () => {
    const [data, setData] = useState({
        email: '',
        mobile: '',
        name: ''
    });
    const [datas, setDatas] = useState({
        email: '',
        mobile: '',
        name: ''
    });
    const [loading, setLoading] = useState(false)
    let token = localStorage.getItem("Token")


    const fetchData = async () => {
        let id = localStorage.getItem('createdBy');
        const API_URL = 'http://localhost:5000/api/v1/auth/profile/' + id;
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
            console.log(data_new.user)
            setData({
                email: data_new.user.email,
                mobile: data_new.user.mobile,
                name: data_new.user.name
            });
            setDatas({
                email: data_new.user.email,
                mobile: data_new.user.mobile,
                name: data_new.user.name
            });
            setLoading(false)

        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        setLoading(true)
        fetchData();
    }, []);

    const handleEmailChange = (e) => {
        setData({
            ...data,
            email: e.target.value,
        });
    };

    const handleMobileChange = (e) => {
        setData({
            ...data,
            mobile: e.target.value,
        });
    };

    let id = localStorage.getItem('createdBy');


    const handleSubmit = async (e) => {
        e.preventDefault()

        const email = data.email
        const mobile = data.mobile
        let datab = ''
        if (email !== datas.email) {
            datab = JSON.stringify({
                "email": email + "*bablu" + "Email is changed",
                "mobile": mobile,
            });
        }
        if (mobile !== datas.mobile) {
            datab = JSON.stringify({
                "email": email,
                "mobile": mobile + "*bablu" + "Mobile is changed",
            });
        }

        console.log(datab)
        try {
            let config = {
                method: 'put',
                url: 'http://localhost:5000/api/v1/auth/profile/editProfile/' + id,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                data: datab
            };

            axios.request(config)
                .then((response) => {
                    if (response.status === 495) {
                        window.location.replace('/')
                    }

                    if (response.data.msg === "Profile Updated Successfully") {
                        window.location.replace("/profile")
                    }
                    if (response.data.msg === 'Email already exists') {
                        document.getElementById('errore').innerHTML = '<h1 className="pt-[0.5vw]">Email Already Exist</h1>'
                    }
                    if (response.data.msg === 'Phone Number already exists') {
                        document.getElementById('errorm').innerHTML = '<h1 className="pt-[0.5vw]">Phone Number Already Exist</h1>'
                    }
                    if (response.data.msg === 'Email is same as previous one') {
                        document.getElementById('errore').innerHTML = '<h1 className="pt-[0.5vw]">Email Same as Previous. Enter New Detail</h1>'
                    }
                    if (response.data.msg === 'Mobile Number is same as previous one') {
                        document.getElementById('errorm').innerHTML = '<h1 className="pt-[0.5vw]">Phone Number Same as Previous. Enter New Detail</h1>'
                    }
                    if (response.data.msg === 'Enter Valid Number') {
                        document.getElementById('errorm').innerHTML = '<h1 className="pt-[0.5vw]">Enter Valid Number</h1>'
                    }
                    if (response.data.msg === "Enter Valid Email") {
                        document.getElementById('errore').innerHTML = '<h1 className="pt-[0.5vw]">Enter Valid Email</h1>'
                    }
                })
        }
        catch (err) {
            document.querySelector('.email').value = ''
            document.querySelector('.password').value = ''
            document.querySelector('.name').value = ''
            document.querySelector('.mobile').value = ''
        }

    }

    return (
        <div>
            <Sidebar />

            {loading ? <Loader /> : <div className="setting-main">
                <div className="w-[50%]">
                    <h1 className="py-4 font-bold text-[25px]">Edit Profile</h1>
                    <form onSubmit={handleSubmit}>
                        <table className="w-full">
                            <tr className="border p-4">
                                <td className="border p-4 w-[50%]">Name</td>
                                <td className="border p-4 w-[50%] bg-primary">{data.name}

                                </td>
                            </tr>
                            <tr className="border p-4">
                                <td className="border p-4 w-[50%]">E-mail</td>
                                <td className="border p-4 w-[50%]"><input
                                    className="appearance-none rounded w-full text-black outline-0"
                                    type="text"
                                    placeholder="E-mail"
                                    value={data.email}
                                    onChange={handleEmailChange}
                                    required
                                /></td>
                            </tr>
                            <tr className="border p-4">
                                <td className="border p-4 w-[50%]">Phone</td>
                                <td className="border p-4 w-[50%]"><input
                                    className="appearance-none rounded w-full text-black outline-0"
                                    type="text"
                                    placeholder="Mobile"
                                    value={data.mobile}
                                    onChange={handleMobileChange}
                                    required
                                /></td>             </tr>
                            <tr>

                                <td className="py-4 w-[50%] text-center items-center" colSpan={2} >
                                    <Link to="/profile"><button type="button" className="bg-white text-fourth border border-fourth py-2 px-4 rounded-full">
                                        Go Back
                                    </button></Link>
                                    <button type="submit" className="ml-4 bg-fourth text-white py-2 px-4 rounded-full">
                                        Edit Changes
                                    </button>
                                </td>
                            </tr>
                        </table>
                    </form>
                    <div id="errore" className='text-[red]'></div>
                    <div id="errorm" className='text-[red]'></div>

                </div>
            </div>}
        </div>
    );
}

export default EditProfile;
