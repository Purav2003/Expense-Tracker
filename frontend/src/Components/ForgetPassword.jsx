import axios from "axios"
import { Link } from "react-router-dom"
import { Input, InputGroup } from 'rsuite';
import EyeIcon from '@rsuite/icons/legacy/Eye';
import EyeSlashIcon from '@rsuite/icons/legacy/EyeSlash';
import { useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as icon from 'react-icons/hi'
import { Tooltip } from 'react-tooltip'


const ForgetPassword = () => {
  const token = localStorage.getItem("Token");
  const [visible, setVisible] = useState(false);
  const [visiblea, setVisiblea] = useState(false);
  const handleChange = () => {
    setVisible(!visible);
  };
  const handleChange_a = () => {
    setVisiblea(!visiblea);
  };
  const handleSubmit = async (e) => {
    e.preventDefault()
    const email = localStorage.getItem("forgetemail")
    const password = document.querySelector('.password').value
    const repassword = document.querySelector('.repassword').value

    let data = JSON.stringify({
      "email": email,
      "newPassword": password
    });
    if (password === repassword) {
      try {
        let config = {
          method: 'post',
          url: 'http://localhost:5000/api/v1/auth/forgetPassword',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          data: data
        };

        axios.request(config)
          .then((response) => {
            if (JSON.stringify(response.status) === 495) {
              window.location.replace('/')
            }
            console.log(response)
            if (JSON.stringify(response.data.status) === '200') {
              toast.success("Changed Password Successfully", { hideProgressBar: true })
              setTimeout(() => {
                window.location.replace('/');
              }, 1500);
            }
            if (JSON.stringify(response.data.status) === '404') {
              toast.error("User Not Found")
            }
            if (JSON.stringify(response.data.status) === '403') {
              toast.error("Password is not strong")
            }
            if (JSON.stringify(response.data.status) === '402') {
              toast.error("Your Old Password Can Not Be Your New Password")
            }

          })
      }
      catch (err) {
        console.log(err.code)
      }
    }
    else {
      document.getElementById('errora').innerHTML = '<h1 className="pt-[0.5vw]">Password Do Not Match</h1>'
    }

    const inputs = document.querySelectorAll('.email');
    inputs.forEach(input => {
      input.value = '';
    });
  }
  return (
    <div className="forget">
      <div className="setting-main">
        <div className="w-[100%] lg:w-[50%]">
          <h1 className="py-4 font-bold text-[25px]">Change Password</h1>
          <form onSubmit={handleSubmit}>
            <table className="w-full">
              <tr className="border p-4">
                <td className="items-center px-4 py-6 w-full flex">New Password
                <icon.HiInformationCircle
      className="ml-2 text-[16px] cursor-pointer"
      data-tooltip-id="my-tooltip"
    />  <Tooltip
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
                </td>
                <td className="border p-4 w-[50%]">
                  <InputGroup inside >
                    <Input type={visible ? 'text' : 'password'} placeholder="New Password" className="password h-full border-none outline-none" />
                    <InputGroup.Button onClick={handleChange}>
                      {visible ? <EyeIcon /> : <EyeSlashIcon />}
                    </InputGroup.Button>
                  </InputGroup>                </td>
              </tr>
              <tr className="border p-4">
                <td className="border p-4 w-[50%]">Retype New Password</td>
                <td className="border p-4 w-[50%]">
                  <InputGroup inside >
                    <Input type={visiblea ? 'text' : 'password'} placeholder="Retype New Password" className="repassword h-full border-none outline-none" />
                    <InputGroup.Button onClick={handleChange_a}>
                      {visiblea ? <EyeIcon /> : <EyeSlashIcon />}
                    </InputGroup.Button>
                  </InputGroup>
                </td>             </tr>
              <tr>

                <td className="py-4 w-[50%] text-center items-center" colSpan={2} >
                  <Link to="/"><button type="button" className="ml-4 bg-white text-fourth border border-fourth py-2 px-4 rounded-full">
                    Back to Login
                  </button></Link>
                  <button type="submit" className="ml-4 bg-fourth text-white py-2 px-4 rounded-full">
                    Change Password
                  </button>
                </td>
              </tr>
            </table>
          </form>
          <div id="error" className='text-[red]'></div>
          <div id="errora" className='text-[red]'></div>

        </div>
      </div>
    </div>
  );
}

export default ForgetPassword;