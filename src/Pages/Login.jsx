import axios from "axios"
import signin from '../Assets/images/login.png';
import "../Assets/css/signup.css";
import * as icons from 'react-icons/fc';
import { Link } from "react-router-dom";

const Login = () => {

  const handleSubmit = async (e) => {
    e.preventDefault()
    const email = document.querySelector('.email').value
    const password = document.querySelector('.password').value


    try {
      await axios.post('http://localhost:5000/api/v1/auth/signin', { email, password })
    } catch (error) {
      console.log(error)
    }
    const inputs = document.querySelectorAll('.email, .password');
    inputs.forEach(input => {
      input.value = '';
    });
  }
  return (
    <>
      <div className="lg:flex lg:flex-row">
        <div className="photo-signup w-[50%] h-[100vh] pt-[7vw] bg-[#2a8c34] invisible sm:invisible md:invisible lg:visible xl:visible">
          <h1 className="text-center ml-[80px] w-[70%] font-bold text-[19px] text-bold text-white">A budget tells us what we can't afford, but it doesn't keep us from buying it.</h1>
          <img src={signin} className=" fixed
             inset-x-0
             bottom-0 h-[70%]" alt="signinImage"></img>
        </div>
        <div className="pl-[5vw] pt-[3vw] first-div">
          <div>

            <h1 className="text-[35px] heading-signup font-bold pl-[16vw] pt-[5vw] text-[#1BA329]">Login</h1>
          </div>
          <div className="w-full max-w-xs">
            <form onSubmit={handleSubmit} className="bg-white rounded w-[40vw] px-8 pt-6 pb-8 mb-4">

              <div className="mb-4 form-field">
                <label className="block text-black-700 text-sm font-bold mb-2">
                  Email
                </label>
                <input className="email shadow appearance-none border border-black rounded w-full py-2 px-3 text-black-700 leading-tight focus:outline-none focus:shadow-outline" type="email" placeholder="E-mail" />
              </div>
              <div className="mb-4 form-field">
                <label className="block text-black-700 text-sm font-bold mb-2">
                  Password
                </label>
                <input className="password shadow appearance-none border border-black rounded w-full py-2 px-3 text-black-700 leading-tight focus:outline-none focus:shadow-outline" type="password" placeholder="Password" />
              </div>
              <div className="flex form-field items-center">
                <button className="bg-[#1BA329] button w-full text-white font-bold py-2 rounded focus:outline-none focus:shadow-outline" type="submit">
                  Login
                </button>
                <button className="border content-center border-[#1BA329] ml-[1vw] button w-full text-white font-bold py-2 rounded focus:outline-none focus:shadow-outline flex flex-row " type="button">
                  <icons.FcGoogle className="icon-google"></icons.FcGoogle>
                </button>
              </div>
            </form>
            <p className="pl-[2.4vw] second-signup">New user? <Link to="/signup" className="underline text-[#1BA329]">Sign up</Link></p>

          </div>
        </div>

      </div>

    </>
  )
}
export default Login

