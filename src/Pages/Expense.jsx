import Sidebar from "../Components/Sidebar"
import { Link } from "react-router-dom"
import ExpenseForm from "../Components/ExpenseForm"
import * as icon from "react-icons/fi"
import ExpenseBar from "../Components/ExpenseBar"
const Expense = () => {
    let token = localStorage.getItem("Token")
    if (token === null) {
        window.location.replace("/")
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const search = document.querySelector('.search-expense').value
        localStorage.setItem("expense-trial",search)
        if(search!==""){
        window.location.replace('search-expense')}
        else{
          document.getElementById('errora').innerHTML = '<h1 className="pt-[0.5vw]">Enter Something</h1>'
        }
  
      }
    return (
        <div className="bg-white">
                            <Sidebar />

            <div><br></br><br></br>
                <div className="lg:flex px-8 main-heading-mob">
                    <h1 className="text-4xl font-bold">Expense </h1>
                    <div className="ml-[33vw] justify-end relative lg:w-[44%] bg-[#eee] rounded-lg shadow-md px-4 py-2 search-bar">
                        <form onSubmit={handleSubmit}>

                            <input
                                type="text"
                                placeholder="Type to Search"
                                className="border-none outline-none bg-transparent pr-8 w-[90%] search-expense"
                            />

                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 ">
                                <button type="submit"><icon.FiSearch className="h-5 w-5 text-gray-500" /></button>
                            </div>
                        </form>

                    </div>
                </div><br></br>
                <ExpenseBar />
            </div>
        </div>
    )
}

export default Expense