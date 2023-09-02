import axios from "axios"
import toast, { Toaster } from 'react-hot-toast';
import add from './../assets/images/Add_Items_Vector.png'
import { useEffect, useState } from "react";

const ExpenseForm = () => {
    const [selectedValues, setSelectedValues] = useState([]);

    var todayDate = new Date().toISOString().slice(0, 10);
    const handleSubmit = async (e) => {

        e.preventDefault()
        const description = document.querySelector('.description').value
        const amount = document.querySelector('.amount').value
        const date = document.querySelector('.date').value
        const modeb = document.querySelector('.modeb').value
        const to = document.querySelector('.to').value
        var category = document.querySelector('.category').value   

        let token = localStorage.getItem("Token")
        let createdBy = localStorage.getItem("createdBy")
        let data = JSON.stringify({
            "description": description,
            "amount": amount,
            "date": date,
            "mode": modeb,
            "token": token,
            "to": to,
            "createdBy": createdBy,
            "category": category
        });
        console.log(data)
        if (amount <= 0) {
            document.getElementById('error').innerHTML = '<h1 className="pt-[0.5vw] text-[red]">Invalid Input</h1>'
        }

        let count_success = 0
        if (amount > 0 && category !== 'Other') {
            try {
                let config = {
                    method: 'post',
                    url: 'http://localhost:5000/api/v1/expense',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    data: data
                };

                axios.request(config)
                    .then((response) => {
                        count_success = 1
                        if (JSON.stringify(response.status) === 495) {
                            window.location.replace('/')
                        }
                        if (JSON.stringify(response.status) === '200') {
                            toast.success("Succesfully Added", { duration: 1500 })

                            const inputs = document.querySelectorAll('.description, .amount, .date,.from');
                            inputs.forEach(input => {
                                input.value = '';
                            });
                            window.location.reload()

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
        if (count_success === 1) {
            const inputs = document.querySelectorAll('.description, .amount, .date,.to');
            inputs.forEach(input => {
                input.value = '';
            });
        }
    }
 

    let id = localStorage.getItem('createdBy');

    const fetchData = async () => {
        let token = localStorage.getItem("Token")

        const API_URL = 'http://localhost:5000/api/v1/auth/profile/' + id;
        try {
            const response = await fetch(API_URL, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            const datas = await response.json();
            if (datas.status === 495) {
                window.location.replace('/');
            }
            setSelectedValues(datas.user.categories);
        } catch (error) {
            // Handle error here
        }
    };

    useEffect(() => {
        fetchData()
    }, [])


    return (
        <>
            <div><Toaster /></div>
            <div className="lg:flex ">
                <div className="lg:w-[50%] w-0">
                    <img src={add} className="w-[80%]" />
                </div>
                <div className="w-full max-w-xs">
                    <br></br>
                    <form onSubmit={handleSubmit} className="bg-white rounded w-[40vw] px-8 pt-6 pb-8 mb-4" >

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
                            <input className="date shadow appearance-none border border-black rounded w-full py-2 px-3 text-black-700 leading-tight focus:outline-none focus:shadow-outline" type="date" id="date" placeholder="Date" max={todayDate} required />
                        </div>
                        <div className="mb-4 form-field">
                            <label className="block text-black-700 text-sm font-bold mb-2">
                                To
                            </label>
                            <input className="to shadow appearance-none border border-black rounded w-full py-2 px-3 text-black-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="To" required />
                        </div>
                        <div className="mb-4 form-field">
                            <label className="block text-black-700 text-sm font-bold mb-2">
                                Category
                            </label>
                            <select className="category border border-black rounded w-full py-2 px-3 text-black-700 leading-tight focus:outline-none focus:shadow-outline ">
                                <option value="select" disabled>Select</option>
                                {selectedValues.map((value) => (
                                    <option key={value} value={value}>
                                        {value}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-4 form-field hidden" id="Other">
                            <input className="other shadow appearance-none border border-black rounded w-full py-2 px-3 text-black-700 leading-tight" type="text" placeholder="Specify Other" />
                            <div id="errorother" className="text-[red]"></div>

                        </div>
                        <div className="mb-4 form-field">
                            <label className="block text-black-700 text-sm font-bold mb-2">
                                Mode
                            </label>
                            <select className="modeb border border-black rounded w-full py-2 px-3 text-black-700 leading-tight focus:outline-none focus:shadow-outline ">
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

export default ExpenseForm