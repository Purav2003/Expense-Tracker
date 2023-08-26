import axios from "axios"
import signup from '../Assets/images/signup.png';
import "../Assets/css/signup.css";
import { Link } from "react-router-dom";

const Signup = () => {
  let token = localStorage.getItem("Token")

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
            localStorage.setItem("Token",response.data.token)
            localStorage.setItem("createdBy",response.data.user._id)
            localStorage.setItem("username",response.data.user.name)
            window.location.replace("/customize-category")

          }
           if (response.data.msg === 'Phone Number already exists') {
            document.getElementById('phone').innerHTML = '<h1 className="pt-[0.5vw]">Phone Number already exists</h1>'
          }
          else{
            document.getElementById('phone').innerHTML=' '
          }
           if (response.data.msg === 'User already exists') {
            document.getElementById('user').innerHTML = response.data.msg
          }
          else{
            document.getElementById('user').innerHTML=' '
          }

           if (response.data.msg === 'Enter Valid Number') {
            document.getElementById('error').innerHTML = '<h1 className="pt-[0.5vw]">Invalid Phone Number</h1>'
          }
          else{
            document.getElementById('error').innerHTML=' '
          }         
           if (response.data.msg === 'Enter Valid Email') {
            document.getElementById('errorm').innerHTML = '<h1 className="pt-[0.5vw]">Invalid Email</h1>'
          }
          else{
            document.getElementById('errorm').innerHTML=' '
          }
           if (response.data.msg === 'Enter Valid Password') {
            document.getElementById('errora').innerHTML = '<h1 className="pt-[0.5vw]">Password Is Not Safe</h1>'
          }
          else{
            document.getElementById('errora').innerHTML=' '
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
                <input className="name shadow appearance-none border border-black rounded w-full py-2 px-3 text-black-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Username" required />
              </div>
              <div className="mb-4 form-field">
                <label className="block text-black-700 text-sm font-bold mb-2">
                  Phone Number
                </label>
                <input className="mobile shadow appearance-none border border-black rounded w-full py-2 px-3 text-black-700 leading-tight focus:outline-none focus:shadow-outline" type="number" placeholder="Phone Number" required />
                <div id="error"></div>
                <div id="phone"></div>

              </div>
              <div className="mb-4 form-field">
                <label className="block text-black-700 text-sm font-bold mb-2">
                  Email
                </label>
                <input className="email shadow appearance-none border border-black rounded w-full py-2 px-3 text-black-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="E-mail" required />
                <div id="errorm"></div>
                <div id="user"></div>

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
                  Sign Up
                </button>
            
              </div>
            </form>
            <p className="pl-[2.4vw] second-signup">Already have an account? <Link to="/" className="underline text-fourth  ">Login</Link></p><br></br><br></br>

          </div>
        </div>
        <div className="photo-signup ml-[23vw] w-full h-[100vh] pt-[6vw] invisible sm:invisible md:invisible lg:visible xl:visible">
          <h1 className="text-center font-semibold text-[30px] text-bold text-black">Create Your Account</h1>
          <p className="text-center">Lets get started</p>
          <img src={signup} className="pl-[5vw] w-[90%]" alt="signupImage"></img>
        </div>
      </div>
    </>
  )
}
export default Signup