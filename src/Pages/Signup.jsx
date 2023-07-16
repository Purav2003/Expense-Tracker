import axios from "axios"
import signup from '../Assets/images/signup.png';
import "../Assets/css/signup.css";
import * as icons from 'react-icons/fc';
const Signup = () => {

  const handleSubmit = async (e) => {
    e.preventDefault()
    const email = document.querySelector('.email').value
    const password = document.querySelector('.password').value
    const name = document.querySelector('.name').value
    const mobile = document.querySelector('.mobile').value
    const phonearray = Array.from(mobile)
    if (phonearray.length !== 10) {
      const error_number = 1
    }
    if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,1024}$/.test(password)) {
      const error_password = 1
    }
    phonearray.length === 10 && /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,1024}$/.test(password) ?
      <>
        {document.getElementById('error').innerHTML = ''}
        try {
          await axios.post('http://localhost:5000/api/v1/auth/signup', { email, password, name, mobile })                            
        } catch (error) {

        }</> : document.getElementById('error').innerHTML = '<h1 className="pt-[0.5vw]">Invalid Phone Number</h1>'



  }
  return (
    <>
      <div className="lg:flex lg:flex-row">
        <div className="pl-[5vw] pt-[3vw] first-div">
          <div>

            <h1 className="text-[35px] heading-signup font-bold pl-[12vw] pt-[1vw] text-[#1BA329]">Sign up</h1>
          </div>
          <div className="w-full max-w-xs">
            <form onSubmit={handleSubmit} className="bg-white rounded w-[40vw] px-8 pt-6 pb-8 mb-4">
              <div className="mb-4 form-field">
                <label className="block text-black-700 text-sm font-bold mb-2 ">
                  Name
                </label>
                <input className="name shadow appearance-none border border-black rounded w-full py-2 px-3 text-black-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Username" />
              </div>
              <div className="mb-4 form-field">
                <label className="block text-black-700 text-sm font-bold mb-2">
                  Phone Number
                </label>
                <input className="mobile shadow appearance-none border border-black rounded w-full py-2 px-3 text-black-700 leading-tight focus:outline-none focus:shadow-outline" type="number" placeholder="Phone Number" />
                <div id="error"></div>

              </div>
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
                  Sign Up
                </button>
                <button className="border content-center border-[#1BA329] ml-[1vw] button w-full text-white font-bold py-2 rounded focus:outline-none focus:shadow-outline" type="button">
                  <icons.FcGoogle className="icon-google"></icons.FcGoogle>
                </button>

              </div>
            </form>
            <p className="pl-[2.4vw] second-signup">Already have an account? <a href="/login" className="underline text-[#1BA329]">Login</a></p>

          </div>
        </div>
        <div className="photo-signup ml-[23vw] w-full h-[100vh] pt-[6vw] bg-[#1BA329] invisible sm:invisible md:invisible lg:visible xl:visible">
          <h1 className="text-center font-bold text-[30px] text-bold text-white">Create an Account</h1>
          <img src={signup} className="pl-[5vw] pt-[3vw]"></img>
        </div>
      </div>



    </>
  )
}
export default Signup