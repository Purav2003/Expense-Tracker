import Sidebar from "./Sidebar"
import axios from "axios"
import { Link } from "react-router-dom"
const ResetPassword = () => {

  let token = localStorage.getItem("Token")
 
  let id = localStorage.getItem('createdBy');

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
              if(JSON.stringify(response.status) === 495){
                window.location.replace('/')
              }              
              if (JSON.stringify(response.data.status) === '200') {
                window.location.replace('/success-changed-pass')
              }

              if (JSON.stringify(response.data.status) === '401') {
                document.getElementById('error').innerHTML = ' '
                document.getElementById('errora').innerHTML = '<h1 className="pt-[0.5vw]">Old Password is incorrect</h1>'
              }
              if (JSON.stringify(response.data.status) === '403') {
                document.getElementById('error').innerHTML = ' '
                document.getElementById('errora').innerHTML = '<h1 className="pt-[0.5vw]">Weak Password</h1>'
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
    }
    else {
      document.getElementById('errora').innerHTML = '<h1 className="pt-[0.5vw]">You Can Not Enter Same Password </h1>'

    }

    const inputs = document.querySelectorAll('.email, .password');
    inputs.forEach(input => {
      input.value = '';
    });
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
                  <input className="oldpass appearance-none rounded w-full py-2 px-3 text-black-700 leading-tight focus:outline-none focus:shadow-outline" type="password" placeholder="Old Password" required />

                </td>
              </tr>
              <tr className="border p-4">
                <td className="border p-4 w-[50%]">New Password</td>
                <td className="border p-4 w-[50%]">                
                <input className="newpass appearance-none rounded w-full py-2 px-3 text-black-700 leading-tight focus:outline-none focus:shadow-outline" type="password" placeholder="New Password" required />
                </td>
              </tr>
              <tr className="border p-4">
                <td className="border p-4 w-[50%]">Retype New Password</td>
                <td className="border p-4 w-[50%]">                <input className="retypenewpass appearance-none rounded w-full py-2 px-3 text-black-700 leading-tight focus:outline-none focus:shadow-outline" type="password" placeholder="Retype New Password" required />
</td>             </tr>
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