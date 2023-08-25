import axios from 'axios';
const ForgetPasswordMail = () => {
  const token = localStorage.getItem("Token");
  const handleSubmit = async (e) => {
    e.preventDefault()
    const email = document.querySelector('.email').value
    localStorage.setItem("forgetemail", email)

    let data = JSON.stringify({
      "email": email,
    });
    try {
      let config = {
        method: 'post',
        url: 'http://localhost:5000/api/v1/auth/forgetPasswordMailConfirmation',
        headers: {
          'Authorization': `Bearer ${token}`,                    
          'Content-Type': 'application/json'
        },
        data: data
      };
      axios.request(config)
        .then((response) => {
          console.log("By")
          console.log(JSON.stringify(response.status));
          if(JSON.stringify(response.status) === 495){
            window.location.replace('/')
          }
          if (JSON.stringify(response.status) === '200') {
            document.getElementById('error').innerHTML = '<h1 className="pt-[0.5vw]">Check Your Mail</h1>'
          }
          if (JSON.stringify(response.data.status) === '404') {
            document.getElementById('error').innerHTML = '<h1 className="pt-[0.5vw]">User Not Found</h1>'
          }

        })
    }
    catch (err) {
      console.log(err.code)
    }

    const inputs = document.querySelectorAll('.email');
    inputs.forEach(input => {
      input.value = '';
    });
  }
  return (

    <div>
            <div className="setting-main">
        <div className="w-[50%]">
          <h1 className="py-4 font-bold text-[25px]">Forget Password</h1>
          <form onSubmit={handleSubmit}>
            <table className="w-full">
              <tr className="border p-4">
                <td className="border p-4 w-[50%]">Email</td>
                <td className="border p-4 w-[50%]">
                <input className="email appearance-none rounded w-full py-2 px-3 text-black-700 leading-tight focus:outline-none focus:shadow-outline" type="email" placeholder="E-mail" required />

                </td>
              </tr>
             
              <tr>

                <td className="py-4 w-[50%] text-center items-center" colSpan={2} >
                 
                  <button type="submit" className="ml-4 bg-fourth text-white py-2 px-4 rounded-full">
                    Send Mail
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

export default ForgetPasswordMail;