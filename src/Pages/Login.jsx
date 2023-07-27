import axios from "axios"
import signin from '../Assets/images/login.png';
import "../Assets/css/signup.css";
import { Link } from "react-router-dom";

const Login = () => {

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
          'Content-Type': 'application/json'
        },
        data: data
      };

      axios.request(config)
        .then((response) => {
          console.log("By")
          console.log(JSON.stringify(response.status));
          if (JSON.stringify(response.data.status) === '200') {
            console.log(response.data.token)
            localStorage.setItem("Token",response.data.token)
            localStorage.setItem("IdExpense",response.data._id)
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
      console.log("Hi")
      console.log(err.code)
    }

    const inputs = document.querySelectorAll('.email, .password');
    inputs.forEach(input => {
      input.value = '';
    });
  }
  return (
    <>
      <div className="lg:flex lg:flex-row bg-white">
        <div className="photo-signup w-[50%] h-[100vh] pt-[7vw] bg-[#2a8c34] invisible sm:invisible md:invisible lg:visible xl:visible">
          <h1 className="text-center ml-[80px] w-[70%] font-bold text-[19px] text-bold text-white">A budget tells us what we can't afford, but it doesn't keep us from buying it.</h1>
          <img src={signin} className=" fixed
             inset-x-0
             bottom-0 h-[70%]" alt="signinImage"></img>
        </div>
        <div className="pl-[5vw] pt-[3vw] first-div">
          <div>

            <h1 className="text-[35px] heading-signup font-black pl-[16vw] pt-[5vw] text-[#1BA329]">Login</h1>
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
                <button className="bg-[#1BA329] button w-full text-white font-bold py-2 rounded focus:outline-none focus:shadow-outline" type="submit">
                  Login
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

