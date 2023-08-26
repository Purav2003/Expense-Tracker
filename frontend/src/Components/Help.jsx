import Sidebar from "./Sidebar";
import { useState } from "react";
import axios from "axios";
import Loader from "./Loader";

const Help = () => {
    const [loading,setLoading] = useState(false)

    let token = localStorage.getItem("Token");
    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault()
        const name = document.querySelector('.name').value
        const email = document.querySelector('.email').value
        const query = document.querySelector('.query').value

    
        let data = JSON.stringify({
          "name":name,
          "email": email,
          "query":query
        });
        try {
          let config = {
            method: 'post',
            url: 'http://localhost:5000/api/v1/auth/signin',
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
                window.location.replace("/dashboard")
                }

            })
        }
        catch (err) {
          console.log(err.code)
        }
    
        const inputs = document.querySelectorAll('.name, .email,.query');
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
                            <input className="name shadow appearance-none border border-black rounded w-full py-2 px-3 text-black-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Name" required />
                            <div id="error"></div>
                        </div>
                        <div className="mb-4 form-field">
                            <label className="block text-black-700 text-sm font-bold mb-2">
                                Email
                            </label>
                            <input className="email shadow appearance-none border border-black rounded w-full py-2 px-3 text-black-700 leading-tight focus:outline-none focus:shadow-outline" type="email" placeholder="E-mail" required />
                            <div id="error"></div>
                        </div>
                        <div className="mb-4 form-field">
                            <label className="block text-black-700 text-sm font-bold mb-2">
                                Query
                            </label>
                            <textarea className="query shadow appearance-none border border-black rounded w-full py-2 px-3 text-black-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Query" required />
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