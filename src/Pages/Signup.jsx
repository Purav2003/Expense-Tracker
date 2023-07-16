import axios from "axios"
import signup from '../Assets/images/signup.png';
import "../Assets/css/signup.css";
const Signup = () => {

  const handleSubmit = async (e) => {
    e.preventDefault()
    const email = document.querySelector('.email').value
    const password = document.querySelector('.password').value
    const name = document.querySelector('.name').value
    const mobile = document.querySelector('.mobile').value
    const repassword = document.querySelector('.repassword').value
    const phonearray = Array.from(mobile)
    phonearray.length===10?<>
    try {
      await axios.post('http://localhost:5000/api/v1/auth/signup', { email, password, name, mobile})
    } catch (error) {
      
    }</>:<div>
      <h1 style={{background:'yellow',textAlign:'center'}}>Password to sarkho nakh be</h1>    
        {document.querySelector('.repassword').value=''}
    </div>
  }
  return (
    <>
    <div className="lg:flex lg:flex-row">
    <div className="pl-[5vw] pt-[3vw] first-div">
          <div>
            <h1 className="text-[35px] heading-signup font-bold pl-[14vw] pt-[1vw] text-[#1BA329]">Sign up</h1>
            <p className="pl-[2.4vw] pt-[2.5vh] second-signup">Already have an account? <a href="/login" className="underline text-[#1BA329]">Login</a></p>
          </div>
            <div className="w-full max-w-xs">
              <form onSubmit={handleSubmit} className="bg-white rounded w-[40vw] px-8 pt-6 pb-8 mb-4">
                <div className="mb-4 form-field">
                  <label className="block text-black-700 text-sm font-bold mb-2 ">
                    Name
                  </label>
                  <input className="name shadow appearance-none border border-black rounded w-full py-2 px-3 text-black-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username" />
                </div>
                <div className="mb-4 form-field">
                  <label className="block text-black-700 text-sm font-bold mb-2">
                    Phone Number
                  </label>
                  <input className="mobile shadow appearance-none border border-black rounded w-full py-2 px-3 text-black-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username" />
                </div>
                <div className="mb-4 form-field">
                  <label className="block text-black-700 text-sm font-bold mb-2">
                    Email
                  </label>
                  <input className="email shadow appearance-none border border-black rounded w-full py-2 px-3 text-black-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username" />
                </div>
                <div className="mb-4 form-field">
                  <label className="block text-black-700 text-sm font-bold mb-2">
                    Password
                  </label>
                  <input className="password shadow appearance-none border border-black rounded w-full py-2 px-3 text-black-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username" />
                </div>               
                <div className="flex form-field items-center">
                  <button className="bg-[#1BA329] button w-full text-white font-bold py-2 rounded focus:outline-none focus:shadow-outline" type="button">
                    Sign Up
                  </button>

                </div>
              </form>
            </div>
        </div>
<div className="photo-signup ml-[23vw] w-full h-[100vh] pt-[6vw] bg-[#1BA329] invisible sm:invisible md:invisible lg:visible xl:visible">
  <h1 className="text-center font-bold text-[30px] text-bold text-white">Create an Account</h1>
      <img src={signup} className="ml-[3vw] mt-[2vw]"></img>
</div>
    </div>



    </>
  )
}
export default Signup