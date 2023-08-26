import axios from "axios"
import signin from '../Assets/images/login.png';
import { Link } from "react-router-dom";
import './assets/css/signup.css';
import { useEffect } from "react";

const Login = () => {
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
            console.log(response.data.token)
            localStorage.setItem("Token",response.data.token)
            localStorage.setItem("createdBy",response.data.user._id)
            localStorage.setItem("username",response.data.name)
            window.location.replace("/dashboard")
            }
          if (JSON.stringify(response.data.status) === '404') {
            document.getElementById('error').innerHTML = '<h1 className="pt-[0.5vw]">User Not Found</h1>'
          }
          if (JSON.stringify(response.data.status) === '401') {
            document.getElementById('error').innerHTML = ' '
            document.getElementById('errora').innerHTML = '<h1 className="pt-[0.5vw]">Password is incorrect</h1>'
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
  useEffect(()=>{
    if(token){
      window.location.replace('/dashboard')
    }
  },[])
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
                <input className="email shadow appearance-none border border-black rounded w-full py-2 px-3 text-black-700 leading-tight focus:outline-none focus:shadow-outline" type="email" placeholder="E-mail" required />
                <div id="error"></div>
              </div>
              <div className="mb-4 form-field">
                <label className="block text-black-700 text-sm font-bold mb-2">
                  Password
                </label>
                <input className="password shadow appearance-none border border-black rounded w-full py-2 px-3 text-black-700 leading-tight focus:outline-none focus:shadow-outline" type="password" placeholder="Password" required />
                <div id="errora"></div>
              </div>
              <div className="flex form-field items-center">
                <button className="bg-fourth button w-full text-white font-bold py-2 rounded focus:outline-none focus:shadow-outline" type="submit">
                  Login
                </button>               
              </div>
            </form>
            <p className="pl-[2.4vw] second-signup">New user? <Link to="/signup" className="underline text-fourth">Sign up</Link></p><br></br><br></br>
            <p className="pl-[2.4vw] second-signup"><Link to="/forget-password-mail" className="underline text-fourth">Forget Password? </Link></p>

          </div>
        </div>

      </div>

    </>
  )
}
export default Login

