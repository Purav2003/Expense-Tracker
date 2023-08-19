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
    return (
        <div className="bg-white">
            <div className="sm:ml-64"><br></br><br></br>
                <div className="flex px-8 main-heading-mob">
                    <h1 className="text-4xl font-bold">Expense </h1>
                    <div className="ml-[33vw] justify-end relative lg:w-[44%] bg-[#eee] rounded-lg shadow-md px-4 py-2 search-bar">
                        <input
                            type="text"
                            placeholder="Type to Search"
                            className="border-none outline-none bg-transparent pr-8 w-[100%]"
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                            <icon.FiSearch className="h-5 w-5 text-gray-500" />
                        </div>
                    </div>
                </div><br></br>
                <ExpenseBar />
                <Sidebar />
            </div>
        </div>
    )
}

export default Expense