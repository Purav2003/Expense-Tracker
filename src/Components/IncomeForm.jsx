import axios from "axios"
import { Link } from "react-router-dom"
const IncomeForm = () => {

    const handleSubmit = async (e) => {
        e.preventDefault()
        const description = document.querySelector('.description').value
        const amount = document.querySelector('.amount').value
        const date = document.querySelector('.date').value
        const mode = document.querySelector('.mode').value
        let token = localStorage.getItem("Token")
        let createdBy = localStorage.getItem("createdBy")
        let data = JSON.stringify({
            "description": description,
            "amount": amount,
            "date": date,
            "mode": mode,
            "token": token,
            "createdBy":createdBy,
        });
        console.log(token)
        if (amount < 0) {
            document.getElementById('error').innerHTML = '<h1 className="pt-[0.5vw]">Invalid Input</h1>'
        }

    
        let count_success = 0
        if (amount > 0 ) {
            try {
                let config = {
                    method: 'post',
                    url: 'http://localhost:5000/api/v1/income',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: data
                };

                axios.request(config)
                    .then((response) => {
                         count_success = 1
                        console.log(JSON.stringify(response.status));
                        if (JSON.stringify(response.data.status) === '200') {
                            window.location.replace("/dashboard")
                        }
                    })
            }
            catch (err) {
                console.log(err.code)
            }
        }
        if(count_success === 1){
        const inputs = document.querySelectorAll('.description, .amount, .date,.mode');
        inputs.forEach(input => {
            input.value = '';
        });
    }
    }
    return (
        <div className="w-full max-w-xs">
            <form onSubmit={handleSubmit} className="bg-white rounded w-[40vw] px-8 pt-6 pb-8 mb-4">

                <div className="mb-4 form-field">
                    <label className="block text-black-700 text-sm font-bold mb-2">
                        Description
                    </label>
                    <input className="description shadow appearance-none border border-black rounded w-full py-2 px-3 text-black-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Description" required />
                </div>
                <div className="mb-4 form-field">
                    <label className="block text-black-700 text-sm font-bold mb-2">
                        Amount
                    </label>
                    <input className="amount shadow appearance-none border border-black rounded w-full py-2 px-3 text-black-700 leading-tight focus:outline-none focus:shadow-outline" type="number" placeholder="Amount" required />
                    <div id="error"></div>
                </div>
                <div className="mb-4 form-field">
                    <label className="block text-black-700 text-sm font-bold mb-2">
                        Date
                    </label>
                    <input className="date shadow appearance-none border border-black rounded w-full py-2 px-3 text-black-700 leading-tight focus:outline-none focus:shadow-outline" type="datetime-local" placeholder="Amount" required />
                </div>
                <div className="mb-4 form-field">
                    <label className="block text-black-700 text-sm font-bold mb-2">
                        Mode
                    </label>
                    <select className="mode border border-black rounded w-full py-2 px-3 text-black-700 leading-tight focus:outline-none focus:shadow-outline ">
                        <option value="select" disabled>Select</option>
                        <option value="Online" >Online</option>
                        <option value="Offline">Offline</option>
                    </select>
                    <div id="errora"></div>
                </div>
                <div className="flex form-field items-center">
                    <button className="bg-[#1BA329] button w-full text-white font-bold py-2 rounded focus:outline-none focus:shadow-outline" type="submit">
                        Add Entry
                    </button>
                </div>
            </form>

        </div>
    )
}

export default IncomeForm