import axios from "axios"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import add from './../assets/images/Add_Items_Vector.png'
import { useEffect, useState } from "react";
import { Input } from 'rsuite';
import { InputPicker } from 'rsuite';


const ExpenseForm = () => {
    const [selectedValues, setSelectedValues] = useState([]);
    const datac = selectedValues.map(item => ({ label: item, value: item }));
    const [selectedCategory, setSelectedCategory] = useState(); // Set the first option as the default value
    const [selectedMode, setSelectedMode] = useState();
    var todayDate = new Date().toISOString().slice(0, 10);
    const handleSubmit = async (e) => {

        e.preventDefault()
        const description = document.querySelector('.description').value
        const amount = document.querySelector('.amount').value
        const date = document.querySelector('.date').value
        const modeb = selectedMode
        const to = document.querySelector('.to').value
        const category = selectedCategory  
        if (!category) {
            toast.error('Category is required.',{hideProgressBar:true})
            return;
          }
          if(!modeb){
            toast.error('Mode is required.',{hideProgressBar:true})
            return;
        }
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
        if (amount > 0 && category && modeb) {
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
                            toast.success("Succesfully Added",{hideProgressBar:true})

                            setTimeout(() => {
                                const inputs = document.querySelectorAll('.description, .amount, .date, .to');
                                inputs.forEach(input => {
                                  input.value = '';
                                });
                                window.location.reload();
                              }, 1500); 
                            

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
        .then(() => {
            if (datac.length > 0) {
              setSelectedCategory(datac[0]?.value);
            }
          });
    }, [])
    console.log()
    const datab = ["Online","Offline"].map(item => ({ label: item, value: item }));
    return (
        <>
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
                            <Input placeholder="Description" className="description" required/>

                        </div>
                        <div className="mb-4 form-field">
                            <label className="block text-black-700 text-sm font-bold mb-2">
                                Amount
                            </label>
                            <Input placeholder="Amount" className="amount" type="number" required/>

                            <div id="error"></div>
                        </div>
                        <div className="mb-4 form-field">
                            <label className="block text-black-700 text-sm font-bold mb-2">
                                Date
                            </label>
                            <Input type="date" className="date" max={todayDate} required/>

                        </div>
                        <div className="mb-4 form-field">
                            <label className="block text-black-700 text-sm font-bold mb-2">
                                To
                            </label>
                            <Input placeholder="To"  className="to" required/>

                        </div>
                        <div className="mb-4 form-field">
                            <label className="block text-black-700 text-sm font-bold mb-2">
                                Category
                            </label>

                            <InputPicker data={datac} className=" w-full" 
                            onChange={(value) => setSelectedCategory(value)}/>
                        </div>

                        <div className="mb-4 form-field">
                            <label className="block text-black-700 text-sm font-bold mb-2">
                                Mode
                            </label>                          
                            <InputPicker data={datab} className="w-full"
                            onChange={(value) => setSelectedMode(value)}/>

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