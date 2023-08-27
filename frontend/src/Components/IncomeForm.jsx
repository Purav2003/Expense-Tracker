import axios from "axios"
import toast, { Toaster } from 'react-hot-toast';
import add from './../assets/images/Add_Items_Vector.png'

const IncomeForm = () => {
    var todayDate = new Date().toISOString().slice(0, 10);

    const handleSubmit = async (e) => {
        e.preventDefault()
        const description = document.querySelector('.description').value
        const amount = document.querySelector('.amount').value
        const date = document.querySelector('.date').value
        const modea = document.querySelector('.modea').value
        const from = document.querySelector('.from').value

        let token = localStorage.getItem("Token")
        let createdBy = localStorage.getItem("createdBy")
        let data = JSON.stringify({
            "description": description,
            "amount": amount,
            "date": date,
            "mode": modea,
            "token": token,
            "from": from,
            "createdBy":createdBy,
        });
        console.log(data)
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
                        'Authorization': `Bearer ${token}`,                    
                        'Content-Type': 'application/json'
                        
                    },
                    data: data
                };

                axios.request(config)
                    .then((response) => {
                         count_success = 1
                         if(JSON.stringify(response.status) === 495){
                            window.location.replace('/')
                          }
                        if (JSON.stringify(response.data.status) === '200') {
                            window.location.reload()
                            toast.success('Successfully Added');
                            const inputs = document.querySelectorAll('.description, .amount, .date,.from');                        
                            inputs.forEach(input => {
                                input.value = '';
                            });
                        }
                        if (JSON.stringify(response.data.status) === '400') {
                            toast.error('Description Is More Than 25 Letters');
                        }
                    })
            }
            catch (err) {
                console.log(err.code)
            }
        }
        if(count_success === 1){
        const inputs = document.querySelectorAll('.description, .amount, .date,.from');
        inputs.forEach(input => {
            input.value = '';
        });
    }
    }
    return (
        <>
        <div><Toaster/></div>
<div className="lg:flex ">

    <div className="lg:w-[50%] w-0 mt-[-4vw]">
        <img src = {add} className="w-[80%]"/>
        </div>
        <div className="lg:w-full md:w[50%] max-w-xs"><br></br>
            <form onSubmit={handleSubmit} className="bg-white rounded lg:w-[40vw] px-8 pt-6 pb-8 mb-4">

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
                    <input className="amount shadow appearance-none border border-black rounded w-full py-2 px-3 text-black-700 leading-tight focus:outline-none focus:shadow-outline" type="number" placeholder="Amount" required min={0}/>
                    <div id="error"></div>
                </div>
                <div className="mb-4 form-field">
                    <label className="block text-black-700 text-sm font-bold mb-2">
                        Date
                    </label>
                    <input className="date shadow appearance-none border border-black rounded w-full py-2 px-3 text-black-700 leading-tight focus:outline-none focus:shadow-outline" type="date" placeholder="Date" max={todayDate} required />
                </div>
                <div className="mb-4 form-field">
                    <label className="block text-black-700 text-sm font-bold mb-2">
                        From
                    </label>
                    <input className="from shadow appearance-none border border-black rounded w-full py-2 px-3 text-black-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="From" required />
                </div>
                <div className="mb-4 form-field">
                    <label className="block text-black-700 text-sm font-bold mb-2">
                        Mode
                    </label>
                    <select className="modea border border-black rounded w-full py-2 px-3 text-black-700 leading-tight focus:outline-none focus:shadow-outline ">
                        <option value="select" disabled>Select</option>
                        <option value="Online" >Online</option>
                        <option value="Offline">Offline</option>
                    </select>
                    <div id="errora"></div>
                </div>
                <div className="flex form-field items-center">
                    <button className="bg-fourth button w-full text-white font-bold py-2 rounded focus:outline-none focus:shadow-outline" type="submit">
                        Add Entry
                    </button>
                </div>
            </form>

        </div>

        </div>
        </>
    )
}

export default IncomeForm