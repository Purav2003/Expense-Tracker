import axios from 'axios';
const ForgetPasswordMail = () => {
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
          'Content-Type': 'application/json'
        },
        data: data
      };
      axios.request(config)
        .then((response) => {
          console.log("By")
          console.log(JSON.stringify(response.status));
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
      <div onSubmit={handleSubmit} className="w-full max-w-xs">
        <form className="bg-white rounded w-[40vw] px-8 pt-6 pb-8 mb-4">

          <div className="mb-4 form-field">
            <label className="block text-black-700 text-sm font-bold mb-2">
              Email
            </label>
            <input className="email shadow appearance-none border border-black rounded w-full py-2 px-3 text-black-700 leading-tight focus:outline-none focus:shadow-outline" type="email" placeholder="E-mail" required />
          </div>

          <div className="flex form-field items-center">
            <button className="bg-[#1BA329] button w-full text-white font-bold py-2 rounded focus:outline-none focus:shadow-outline" type="submit">
              Submit
            </button>

          </div><br></br>
          <div id="error"></div>

        </form>
      </div>
    </div>
  );
}

export default ForgetPasswordMail;