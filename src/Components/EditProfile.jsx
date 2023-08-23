import { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import { Link } from 'react-router-dom';
import axios from 'axios';
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
    let token = localStorage.getItem("Token")
    if (token === null) {
        window.location.replace("/")
    }

    const fetchData = async () => {
        let id = localStorage.getItem('createdBy');
        const API_URL = 'http://localhost:5000/api/v1/auth/profile/' + id;
        console.log(API_URL)
        try {
            const response = await fetch(API_URL);
            const data_new = await response.json();
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

        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
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
                "email": email+"*bablu"+"Email is changed",
                "mobile": mobile,
            });
        }
        if (mobile !== datas.mobile) {
            datab = JSON.stringify({
                "email": email,
                "mobile": mobile+"*bablu"+"Mobile is changed",
            });
        }
        
        console.log(datab)
        try {
            let config = {
                method: 'put',
                url: 'http://localhost:5000/api/v1/auth/profile/editProfile/' + id,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: datab
            };

            axios.request(config)
                .then((response) => {

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
                    if(response.data.msg === 'Mobile Number is same as previous one'){
                        document.getElementById('errorm').innerHTML = '<h1 className="pt-[0.5vw]">Phone Number Same as Previous. Enter New Detail</h1>'
                    }  
                    if(response.data.msg === 'Enter Valid Number'){
                        document.getElementById('errorm').innerHTML = '<h1 className="pt-[0.5vw]">Enter Valid Number</h1>'
                    }  
                    if( response.data.msg === "Enter Valid Email"){
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
            <div className=" lg:flex lg:flex-row bg-tertiary">
                <div className="update-profile pt-[3vw] first-div">
                    <div>
                        <h1 className="text-[35px] font-bold pt-[1vw] text-[#000]">Edit Profile</h1>
                    </div>
                    <div className="w-full max-w-xs">
                        <form className="bg-white px-4 rounded w-[40vw] pt-8 mt-4 pb-8 mb-4" onSubmit={handleSubmit}>
                            <div className="mb-4 form-field ">
                                <label className="block text-black-700 text-sm font-bold mb-2 ">
                                    Name
                                </label>
                                <input className="bg-tertiary pointer-events-none name shadow appearance-none border border-black rounded w-full py-2 px-3 text-black-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Username" value={data.name} required />
                            </div>
                            <div className="mb-4 form-field">
                                <label className="block text-black-700 text-sm font-bold mb-2">
                                    Email
                                </label>
                                <input
                                    className="email shadow appearance-none border border-black rounded w-full py-2 px-3 text-black-700 leading-tight focus:outline-none focus:shadow-outline"
                                    type="text"
                                    placeholder="E-mail"
                                    value={data.email}
                                    onChange={handleEmailChange}
                                    required
                                />
                                                               <div id="errore" className='text-[red]'></div>

                            </div>
                            <div className="mb-4 form-field">
                                <label className="block text-black-700 text-sm font-bold mb-2">
                                    Phone Number
                                </label>
                                <input
                                    className="mobile shadow appearance-none border border-black rounded w-full py-2 px-3 text-black-700 leading-tight focus:outline-none focus:shadow-outline"
                                    type="number"
                                    placeholder="Phone Number"
                                    value={data.mobile}
                                    onChange={handleMobileChange}
                                    required
                                />
                                <div id="errorm" className='text-[red]'></div>
                            </div>
                            <div className="lg:flex form-field items-center">
                                <Link to="/profile" className='w-full'><button
                                    className="bg-[#1BA329] button w-full text-white font-bold py-2 rounded focus:outline-none focus:shadow-outline"
                                    type="button"
                                >
                                    Go Back
                                </button></Link>
                                <button
                                    className="mx-2 bg-[#1BA329] button w-full text-white font-bold py-2 rounded focus:outline-none focus:shadow-outline"
                                    type="submit"
                                >
                                    Edit Profile
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <div style={{ height: '87vh' }}>

                </div>
            </div>
        </div>
    );
}

export default EditProfile;
