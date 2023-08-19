import axios from "axios"
import toast, { Toaster } from 'react-hot-toast';

const ExpenseForm = () => {

    const handleSubmit = async (e) => {
        e.preventDefault()
        const description = document.querySelector('.description').value
        const amount = document.querySelector('.amount').value
        const date = document.querySelector('.date').value
        const modeb = document.querySelector('.modeb').value
        const to = document.querySelector('.to').value
        let category = ' '
        document.querySelector('.category').value === 'Other'? category = document.querySelector('.other').value:category = document.querySelector('.category').value
        

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
        if (amount < 0) {
            document.getElementById('error').innerHTML = '<h1 className="pt-[0.5vw]">Invalid Input</h1>'
        }

        let count_success = 0
        if (amount > 0) {
            try {
                let config = {
                    method: 'post',
                    url: 'http://localhost:5000/api/v1/expense',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: data
                };

                axios.request(config)
                    .then((response) => {
                        count_success = 1
                        if (JSON.stringify(response.status) === '200') {
                            toast.success("Succesfully Added",{duration: 1500})
                            
                            const inputs = document.querySelectorAll('.description, .amount, .date,.from');
                            inputs.forEach(input => {
                                input.value = '';
                            });
                            setTimeout(() => {
                                window.location.reload()
                            }, 2000); 
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
    const handleCategoryChange = (e) => {
        const selectedCategory = e.target.value;
    
        if (selectedCategory === "Other") {
          const inputOtherExpense = document.getElementById("Other");
          if (inputOtherExpense) {
            inputOtherExpense.classList.remove("hidden");
          }
        } else {
          const inputOtherExpense = document.getElementById("Other");
          if (inputOtherExpense) {
            inputOtherExpense.classList.add("hidden");
          }
        }
      };
    return (
        <>
            <div><Toaster /></div>

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
                            To
                        </label>
                        <input className="to shadow appearance-none border border-black rounded w-full py-2 px-3 text-black-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="To" required />
                    </div>
                    <div className="mb-4 form-field">
                        <label className="block text-black-700 text-sm font-bold mb-2">
                            Category
                        </label>
                        <select className="category border border-black rounded w-full py-2 px-3 text-black-700 leading-tight focus:outline-none focus:shadow-outline "  onChange={handleCategoryChange}>
                            <option value="select" disabled>Select</option>
                            <option value="Food" >Food</option>
                            <option value="Petrol">Petrol</option>
                            <option value="Cloths">Cloths</option>
                            <option value="Grocery">Grocery</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div className="mb-4 form-field hidden" id="Other">
                        {/* <input className="other shadow appearance-none border border-black rounded w-full py-2 px-3 text-black-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Specify Other"  required /> */}
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
                        <button className="bg-[#007A6D] button w-full text-white font-bold py-2 rounded focus:outline-none focus:shadow-outline" type="submit">
                            Add Entry
                        </button>
                    </div>
                </form>

            </div>
        </>
    )
}

export default ExpenseForm