import axios from "axios"
import signup from './../assets/images/signup.png';
import "./../assets/css/signup.css";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from 'react-tooltip'
import * as icon from 'react-icons/hi'
import { Input, InputGroup } from 'rsuite';
import EyeIcon from '@rsuite/icons/legacy/Eye';
import EyeSlashIcon from '@rsuite/icons/legacy/EyeSlash';
import { useState } from "react";

const Signup = () => {
  let token = localStorage.getItem("Token")
  const [visible, setVisible] = useState(false);

  const handleChange = () => {
    setVisible(!visible);
  };
  const handleSubmit = async (e) => {
    e.preventDefault()
    const email = document.querySelector('.email').value
    const password = document.querySelector('.password').value
    const name = document.querySelector('.name').value
    const mobile = document.querySelector('.mobile').value
    let data = JSON.stringify({
      "name": name,
      "email": email,
      "mobile": mobile,
      "password": password
    });

    try {
      let config = {
        method: 'post',
        url: 'http://localhost:5000/api/v1/auth/signup',
        headers: {
          'Content-Type': 'application/json'
        },
        data: data
      };

      axios.request(config)
        .then((response) => {
          if (JSON.stringify(response.data.status) === '200') {
            localStorage.setItem("Token", response.data.token)
            localStorage.setItem("createdBy", response.data.user._id)
            localStorage.setItem("username", response.data.user.name)
            window.location.replace("/customize-category")

          }
          if (response.data.msg === 'Phone Number already exists') {
            toast.error('Phone Number already exists', {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
          }

          if (response.data.msg === 'User already exists') {
            toast.error('User already exists', {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
          }


          if (response.data.msg === 'Enter Valid Number') {
            toast.error('Enter Valid Number', {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
          }

          if (response.data.msg === 'Enter Valid Email') {
            toast.error('Enter Valid Email', {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
          }

          if (response.data.msg === 'Enter Valid Password') {
            toast.error('Enter Valid Password', {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
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
    <>
      <div className="lg:flex lg:flex-row bg-white">
        <div className="pl-[5vw] pt-[3vw] first-div">
          <div>

            <h1 className="text-[35px] heading-signup font-bold pl-[12vw] pt-[1vw] text-black">Sign up</h1>
          </div>
          <div className="w-full max-w-xs">
            <form onSubmit={handleSubmit} className="bg-white rounded w-[40vw] px-8 pt-6 pb-8 mb-4">
              <div className="mb-4 form-field">
                <label className="block text-black-700 text-sm font-bold mb-2 ">
                  Name
                </label>
                <Input placeholder="Enter Name" className="name"  required/>
              </div>
              <div className="mb-4 form-field">
                <label className="block text-black-700 text-sm font-bold mb-2">
                  Phone Number
                </label>
                <Input placeholder="Enter Phone Number" className="mobile"  type="number" required/>

                <div id="error"></div>
                <div id="phone"></div>

              </div>
              <div className="mb-4 form-field">
                <label className="block text-black-700 text-sm font-bold mb-2">
                  Email
                </label>
                <Input placeholder="Enter Email" className="email"  type="email" required/>
                <div id="errorm"></div>
                <div id="user"></div>

              </div>
              <div className="mb-4 form-field relative">
  <label className="block text-black-700 text-sm font-bold mb-2">
    Password
  </label>
  <div className="relative">
  <InputGroup inside >
      <Input type={visible ? 'text' : 'password'} className="password" placeholder="Enter Password" />
      <InputGroup.Button onClick={handleChange}>
        {visible ? <EyeIcon /> : <EyeSlashIcon />}
        
      </InputGroup.Button>
      <icon.HiInformationCircle
      className="absolute pl-[100px] top-1/2 right-2 transform -translate-y-1/2 cursor-pointer"
      data-tooltip-id="my-tooltip"
    />
    </InputGroup>

  </div>
  <Tooltip
    id="my-tooltip"
    content={
      <>
        <ul>
          <li>Password Must be At least 8 Characters Long</li>
          <li>
            Password Should Contain At least
            <br></br>1 Uppercase Letter
            <br></br>1 Digit<br></br>
            1 Special Character
          </li>
        </ul>
      </>
    }
  />
</div>

              <div className="flex form-field items-center">
                <button className="bg-fourth button w-full text-white font-bold py-2 rounded focus:outline-none focus:shadow-outline" type="submit">
                  Sign Up
                </button>

              </div>
            </form>
            <p className="pl-[2.4vw] second-signup">Already have an account? <Link to="/" className="underline text-fourth  ">Login</Link></p><br></br><br></br>

          </div>
        </div>
        <div className="photo-signup ml-[23vw] w-full h-[100vh] pt-[6vw] invisible sm:invisible md:invisible lg:visible xl:visible">
          <h1 className="text-center font-semibold text-[30px] text-bold text-black">Create Your Account</h1>
          <p className="text-center">Let's get started</p>
          <img src={signup} className="pl-[5vw] w-[90%]" alt="signupImage"></img>
        </div>
      </div>
    </>
  )
}
export default Signup