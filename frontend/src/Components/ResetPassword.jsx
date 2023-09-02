import Sidebar from "./Sidebar"
import axios from "axios"
import { Input, InputGroup } from 'rsuite';
import EyeIcon from '@rsuite/icons/legacy/Eye';
import EyeSlashIcon from '@rsuite/icons/legacy/EyeSlash';
import { Link } from "react-router-dom"
import { useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const ResetPassword = () => {

  let token = localStorage.getItem("Token")

  let id = localStorage.getItem('createdBy');
  const [visible, setVisible] = useState(false);
  const [visiblea, setVisiblea] = useState(false);
  const [visibleb, setVisibleb] = useState(false);

  const handleChange = () => {
    setVisible(!visible);
  };
  const handleChange_a = () => {
    setVisiblea(!visiblea);
  };
  const handleChange_b = () => {
    setVisibleb(!visibleb);
  };
  const handleSubmit = async (e) => {
    e.preventDefault()
    const oldPassword = document.querySelector('.oldpass').value
    const newPassword = document.querySelector('.newpass').value
    const retypepass = document.querySelector('.retypenewpass').value

    let data = JSON.stringify({
      "oldPassword": oldPassword,
      "newPassword": newPassword
    });
    if (newPassword !== oldPassword) {
      if (newPassword === retypepass) {
        try {
          let config = {
            method: 'post',
            url: 'http://localhost:5000/api/v1/auth/changePassword/' + id,
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
            data: data
          };

          axios.request(config)
            .then((response) => {
              if (JSON.stringify(response.status) === 495) {
                window.location.replace('/')
              }
              if (JSON.stringify(response.data.status) === '200') {
                toast.success("Succefully Changed the Password",{hideProgressBar:true})
                setTimeout(() => {                 
                  window.location.replace('/profile');
                }, 1500);               }

              if (JSON.stringify(response.data.status) === '401') {
                toast.error("Old Password is incorrect")                        
              }
              if (JSON.stringify(response.data.status) === '403') {
                toast.error("Weak Password")              
              }
            })
        }
        catch (err) {
          console.log(err.code)
        }
      }
      else {
        toast.error("Password Do Not Match")
      }
    }
    else {
      toast.error("You Can Not Enter Same Password")

    }
  }

   
  return (
    <div className="bg-white re-pass">
      <Sidebar />


      <div className="setting-main">
        <div className="lg:w-[50%]">
          <h1 className="py-4 font-bold text-[25px] re-heading">Reset Password</h1>
          <form onSubmit={handleSubmit}>
            <table className="w-full">
              <tr className="border p-4">
                <td className="border p-4 w-[50%]">Old Password</td>
                <td className="border p-4 w-[50%]">
                  <InputGroup inside >
                    <Input type={visible ? 'text' : 'password'} placeholder="Old Password" className="oldpass h-full border-none outline-none" />
                    <InputGroup.Button onClick={handleChange}>
                      {visible ? <EyeIcon /> : <EyeSlashIcon />}
                    </InputGroup.Button>
                  </InputGroup>
                </td>
              </tr>
              <tr className="border p-4">
                <td className="border p-4 w-[50%]">New Password</td>
                <td className="border p-4 w-[50%]">
                <InputGroup inside >
                    <Input type={visiblea ? 'text' : 'password'} placeholder="New Password" className="newpass h-full border-none outline-none" />
                    <InputGroup.Button onClick={handleChange_a}>
                      {visiblea ? <EyeIcon /> : <EyeSlashIcon />}
                    </InputGroup.Button>
                  </InputGroup>                </td>
              </tr>
              <tr className="border p-4">
                <td className="border p-4 w-[50%]">Retype New Password</td>
                <td className="border p-4 w-[50%]">              
                <InputGroup inside >
                    <Input type={visibleb ? 'text' : 'password'} placeholder="Retype Password" className="retypenewpass h-full border-none outline-none" />
                    <InputGroup.Button onClick={handleChange_b}>
                      {visibleb ? <EyeIcon /> : <EyeSlashIcon />}
                    </InputGroup.Button>
                  </InputGroup>                </td>             </tr>
              <tr>

                <td className="py-4 w-[50%] text-center items-center" colSpan={2} >
                  <Link to="/profile"><button type="button" className="bg-white text-fourth border border-fourth py-2 px-4 rounded-full">
                    Go Back
                  </button></Link>
                  <button type="submit" className="ml-4 bg-fourth text-white py-2 px-4 rounded-full">
                    Reset Password
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

  )
}

export default ResetPassword