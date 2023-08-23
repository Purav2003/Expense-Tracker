import Sidebar from "./Sidebar"
import axios from "axios"
import { Link } from "react-router-dom"
const ResetPassword = () =>{
    
    let token = localStorage.getItem("Token")
    if(token === null){
            window.location.replace("/")
    }
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
        if(newPassword !== oldPassword){
        if(newPassword === retypepass){
        try {
          let config = {
            method: 'post',
            url: 'http://localhost:5000/api/v1/auth/changePassword/'+id,
            headers: {
              'Content-Type': 'application/json'
            },
            data: data
          };
    
          axios.request(config)
            .then((response) => {
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
    else{
        document.getElementById('errora').innerHTML = '<h1 className="pt-[0.5vw]">Password Do Not Match</h1>'
    }
}
else{
    document.getElementById('errora').innerHTML = '<h1 className="pt-[0.5vw]">You Can Not Enter Same Password </h1>'

}
    
        const inputs = document.querySelectorAll('.email, .password');
        inputs.forEach(input => {
          input.value = '';
        });}
        return(
            <div className="bg-tertiary">
                              <Sidebar />

            <div className="reset-password"><br></br><br></br>
                <div className="lg:flex main-heading-mob">
                    <h1 className="text-4xl font-bold">Reset Password </h1>                   
                </div>
                <div className="w-full max-w-xs">
            <form onSubmit={handleSubmit}  className="bg-white rounded w-[40vw] px-8 pt-8 mt-4 pb-8 mb-4">

              <div className="mb-4 form-field">
                <label className="block text-black-700 text-sm font-bold mb-2">
                  Old Password
                </label>
                <input className="oldpass shadow appearance-none border border-black rounded w-full py-2 px-3 text-black-700 leading-tight focus:outline-none focus:shadow-outline" type="password" placeholder="Old Password" required />
                <div id="error"></div>
              </div>
              <div className="mb-4 form-field">
                <label className="block text-black-700 text-sm font-bold mb-2">
                  New Password
                </label>
                <input className="newpass shadow appearance-none border border-black rounded w-full py-2 px-3 text-black-700 leading-tight focus:outline-none focus:shadow-outline" type="password" placeholder="New Password" required />
              </div>
              <div className="mb-4 form-field">
                <label className="block text-black-700 text-sm font-bold mb-2">
                  Re-type New Password
                </label>
                <input className="retypenewpass shadow appearance-none border border-black rounded w-full py-2 px-3 text-black-700 leading-tight focus:outline-none focus:shadow-outline" type="password" placeholder="Retype New Password" required />
                <div id="errora"></div>
              </div>
              <div className="flex form-field items-center">
              <Link to="/profile" className="w-full"><button className="bg-[#009688] button w-full text-white font-bold py-2 rounded focus:outline-none focus:shadow-outline" type="submit">
                  Go Back
                </button> </Link>    
                <button className="mx-2 bg-[#009688] button w-full text-white font-bold py-2 rounded focus:outline-none focus:shadow-outline" type="submit">
                  Update Password
                </button>               
              </div>
            </form>

          </div>
            </div>
            <div style={{height:'87vh'}}>

</div>
        </div>
        
        )
}

export default ResetPassword