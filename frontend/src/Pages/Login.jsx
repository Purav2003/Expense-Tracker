import axios from "axios"
import signin from './../assets/images/login.png';
import { Link } from "react-router-dom";
import './../assets/css/signup.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Input, InputGroup } from 'rsuite';
import EyeIcon from '@rsuite/icons/legacy/Eye';
import EyeSlashIcon from '@rsuite/icons/legacy/EyeSlash';
import { useEffect,useState } from "react";
import * as icon from 'react-icons/fc'

const Login =  () => {
  const [visible, setVisible] = useState(false);
const googleAuth = async () => {
  let API_URL = ''
 
    API_URL = 'http://localhost:5000/api/v1/auth/google' 

  try {
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    const datas = await response.json();
    if (datas.status === 495) {
      window.location.replace('/')
    }

  } catch (error) {
    // Handle error here
  }
}
  const handleChange = () => {
    setVisible(!visible);
  };
  let token = localStorage.getItem("Token")
  const handleSubmit = async (e) => {
    e.preventDefault()
    const email = document.querySelector('.email').value
    const password = document.querySelector('.password').value
    let data = JSON.stringify({
      "email": email,
      "password": password
    });
    try {
      let config = {
        method: 'post',
        url: 'http://localhost:5000/api/v1/auth/signin',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        data: data
      };

      axios.request(config)
        .then((response) => {
          console.log(JSON.stringify(response.status));
          if (JSON.stringify(response.data.status) === '200') {
            console.log(response.data.user.currency)
            localStorage.setItem("Token", response.data.token)
            localStorage.setItem("createdBy", response.data.user._id)
            localStorage.setItem("username", response.data.name)
            localStorage.setItem("selectedCurrency",response.data.user.currency);
            localStorage.setItem("userMail",response.data.user.email);

            window.location.replace("/dashboard")
          }
          if (JSON.stringify(response.data.status) === '404') {
            toast.error('User Not Found', {
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
          if (JSON.stringify(response.data.status) === '401') {
            toast.error('Incorrect Password', {
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
      console.log(err.code)
    }

    const inputs = document.querySelectorAll('.email, .password');
    inputs.forEach(input => {
      input.value = '';
    });
  }
  useEffect(() => {
    if (token) {
      window.location.replace('/dashboard')
    }
  }, [])
  return (
    <>
      <div className="lg:flex lg:flex-row bg-white">
        <div className="photo-signup w-[50%] h-[100vh] pt-[7vw] invisible sm:invisible md:invisible lg:visible xl:visible">
          <h1 className="ml-[80px] text-center w-[70%] font-semibold text-[25px] text-bold text-black">
            Welcome Back !!
          </h1>
          <p className="text-center">Start managing your finance faster and better</p>
          <img src={signin} className=" pl-[7vw]
             
              w-[80%]" alt="signinImage"></img>
        </div>
        <div className="pl-[5vw] pt-[3vw] first-div">
          <div>

            <h1 className="text-[35px] heading-signup font-semibold pl-[16vw] pt-[5vw] text-black">Login</h1>
          </div>
          <div className="w-full max-w-xs">
            <form onSubmit={handleSubmit} className="bg-white rounded w-[40vw] px-8 pt-6 pb-8 mb-4">

              <div className="mb-4 form-field">
                <label className="block text-black-700 text-sm font-bold mb-2">
                  Email
                </label>
                <Input placeholder="Enter Email" className="email" />

                <div id="error"></div>
              </div>
              <div className="mb-4 form-field">
                <label className="block text-black-700 text-sm font-bold mb-2">
                  Password
                </label>
                <InputGroup inside >
      <Input type={visible ? 'text' : 'password'} className="password" placeholder="Enter Password" />
      <InputGroup.Button onClick={handleChange}>
        {visible ? <EyeIcon /> : <EyeSlashIcon />}
      </InputGroup.Button>
    </InputGroup>
                <div id="errora"></div>
              </div>
              <div className="flex form-field items-center">
                <button className="bg-fourth button w-1/2 text-white font-bold py-2 rounded focus:outline-none focus:shadow-outline" type="submit">
                  Login
                </button>
                <div className="flex justify-center items-center w-1/2">
  
</div>

              </div>
              <div className="flex justify-center">
     
    </div>

            </form>
            <button className="bg-white border border-fourth flex items-center p-8 ml-2 button font-bold py-2 rounded focus:outline-none focus:shadow-outline" type="button" onClick={googleAuth}>
    <icon.FcGoogle className="mr-2" /> Login with Google
  </button><br></br><br></br>
            <p className="pl-[2.4vw] second-signup">New user? <Link to="/signup" className="underline text-fourth">Sign up</Link></p><br></br><br></br>
            <p className="pl-[2.4vw] second-signup"><Link to="/forget-password-mail" className="underline text-fourth">Forget Password? </Link></p>

          </div>
        </div>

      </div>

    </>
  )
}
export default Login

