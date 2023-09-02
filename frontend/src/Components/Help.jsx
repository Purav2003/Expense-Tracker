import Sidebar from "./Sidebar";
import { useState } from "react";
import axios from "axios";
import Loader from "./Loader";
import { Input } from 'rsuite';

const Help = () => {
  const [loading, setLoading] = useState(false)

  let token = localStorage.getItem("Token");
  const handleSubmit = async (e) => {
    setLoading(true)
    e.preventDefault()
    const name = document.querySelector('.name').value
    const email = document.querySelector('.email').value
    const query = document.querySelector('.query').value
    const mobile = document.querySelector('.mobile').value


    let data = JSON.stringify({
      "name": name,
      "email": email,
      "query": query,
      "mobile": mobile
    });
    const id = localStorage.getItem('createdBy');

    try {
      let config = {
        method: 'post',
        url: `http://localhost:5000/api/v1/auth/contactus/${id}`,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        data: data
      };

      axios.request(config)
        .then((response) => {
          console.log(JSON.stringify(response.status));
          if (JSON.stringify(response.data.status) === '200') {
            setLoading(false)
          }

        })
    }
    catch (err) {
      console.log(err.code)
    }

    const inputs = document.querySelectorAll('.name, .email,.query,.mobile');
    inputs.forEach(input => {
      input.value = '';
    });
  }


  return (
    <div className="bg-background">
      <Sidebar />
      {loading ? <Loader /> : <div className="setting-main lg:px-[120px]">
        <div className="w-[50%]">
          <h1 className="py-4 font-bold text-[25px]">Help</h1>
          <form onSubmit={handleSubmit} className="bg-white rounded w-[40vw] pt-6 pb-8 mb-4">
            <div className="mb-4 form-field">
              <label className="block text-black-700 text-sm font-bold mb-2">
                Name
              </label>
              <Input placeholder="Name" className="name" required/>
              <div id="error"></div>
            </div>
            <div className="mb-4 form-field">
              <label className="block text-black-700 text-sm font-bold mb-2">
                Phone
              </label>
              <Input placeholder="Phone" className="mobile" type="number" required/>
              <div id="error"></div>
            </div>
            <div className="mb-4 form-field">
              <label className="block text-black-700 text-sm font-bold mb-2">
                Email
              </label>
              <Input placeholder="Email" className="email" type="email" required/>
              <div id="error"></div>
            </div>
            <div className="mb-4 form-field">
              <label className="block text-black-700 text-sm font-bold mb-2">
                Query
              </label>
              <Input as="textarea" rows={3} placeholder="Query" className="query" required/>
              <div id="error"></div>
            </div>
            <div className="flex form-field items-center">
              <button className="bg-fourth button w-full text-white font-bold py-2 rounded focus:outline-none focus:shadow-outline" type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>}
    </div>
  );
};

export default Help;