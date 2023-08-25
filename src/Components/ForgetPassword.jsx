import axios from "axios"
import { Link } from "react-router-dom"
const ForgetPassword = () => {
  const token = localStorage.getItem("Token");

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
            console.log(response)
            if (JSON.stringify(response.data.status) === '200') {
              window.location.replace('/')
            }
            if (JSON.stringify(response.data.status) === '404') {
              document.getElementById('error').innerHTML = '<h1 className="pt-[0.5vw]">User Not Found</h1>'
            }
            if (JSON.stringify(response.data.status) === '403') {
              document.getElementById('error').innerHTML = '<h1 className="pt-[0.5vw]">Password is not strong</h1>'
            }
            if (JSON.stringify(response.data.status) === '402') {
              document.getElementById('error').innerHTML = '<h1 className="pt-[0.5vw]">Your Old Password Can Not Be Your New Password</h1>'
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
    <div>
      {/* <div className="w-full max-w-xs">
            <form onSubmit={handleSubmit} className="bg-white rounded w-[40vw] px-8 pt-6 pb-8 mb-4">

              <div className="mb-4 form-field">
                <label className="block text-black-700 text-sm font-bold mb-2">
                  New Password
                </label>
                <input className="password shadow appearance-none border border-black rounded w-full py-2 px-3 text-black-700 leading-tight focus:outline-none focus:shadow-outline" type="password" placeholder="Enter New Password" required />
              </div>
              <div className="mb-4 form-field">
                <label className="block text-black-700 text-sm font-bold mb-2">
                  Re-type New Password
                </label>
                <input className="repassword shadow appearance-none border border-black rounded w-full py-2 px-3 text-black-700 leading-tight focus:outline-none focus:shadow-outline" type="password" placeholder="Re-type New Password" required />
                <div id="errora"></div>
              </div>
              <div className="flex form-field items-center">
                <button className="bg-[#1BA329] button w-full text-white font-bold py-2 rounded focus:outline-none focus:shadow-outline" type="submit">
                  Reset Password
                </button>               
              </div>
<br></br>              <div id="error"></div>

            </form>
       </div>     */}

      <div className="setting-main">
        <div className="w-[50%]">
          <h1 className="py-4 font-bold text-[25px]">Change Password</h1>
          <form onSubmit={handleSubmit}>
            <table className="w-full">
              <tr className="border p-4">
                <td className="border p-4 w-[50%]">New Password</td>
                <td className="border p-4 w-[50%]">
                  <input className="password appearance-none rounded w-full py-2 px-3 text-black-700 leading-tight focus:outline-none focus:shadow-outline" type="password" placeholder="Enter New Password" required />
                </td>
              </tr>
              <tr className="border p-4">
                <td className="border p-4 w-[50%]">Retype New Password</td>
                <td className="border p-4 w-[50%]">
                  <input className="repassword appearance-none rounded w-full py-2 px-3 text-black-700 leading-tight focus:outline-none focus:shadow-outline" type="password" placeholder="Re-type New Password" required />

                </td>             </tr>
              <tr>

                <td className="py-4 w-[50%] text-center items-center" colSpan={2} >
                <Link to="/"><button type="button" className="ml-4 bg-fourth text-white py-2 px-4 rounded-full">
                    Login
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