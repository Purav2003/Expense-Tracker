import Sidebar from "../Components/Sidebar"
import Profile from "../Components/Profile"
import RecentTransaction from "../Components/RecentTransaction"
import CalendarDashboard from "../Components/CalendarDashboard"
import SummaryDashboard from "../Components/SummayDashboard"
import * as icon from "react-icons/fi"
import '../assets/css/dashboard.css'

const Dashboard = () => {

    let token = localStorage.getItem("Token")
    if (token === null) {
        window.location.replace("/")
    }
    let name = localStorage.getItem("username")
    const handleSubmit = async (e) => {
        e.preventDefault();
        const search = document.querySelector('.search-income').value
        localStorage.setItem("income-trial",search)
        if(search!==""){
        window.location.replace('search-dashboard')}
        else{
          document.getElementById('errora').innerHTML = '<h1 className="pt-[0.5vw]">Enter Something</h1>'
        }
  
      }
    return (
        <div className="bg-white">
            <Sidebar />

            <div>
                <br />
                <br />
                <div className="lg:flex px-8 main-heading-mob">
    <h1 className="text-4xl w-full font-bold">Hello, <i>{name} </i></h1>    
    <div className="ml-[33vw] justify-end	relative lg:w-[80%] bg-[#eee] rounded-lg shadow-md px-4 py-2 search-bar">

    <form onSubmit={handleSubmit}>

      <input
        type="text"
        placeholder="Type to Search"
        className="border-none outline-none bg-transparent pr-8 w-[90%] search-income"
      />                  
    
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 ">
        <button type="submit"><icon.FiSearch className="h-5 w-5 text-gray-500" /></button>
      </div>
      </form>

    </div>
   

</div>
<div id="errora" className="ml-[69vw] pt-[2vh]" ></div>             <br />
                <div className="lg:grid grid-cols-2 gap-4">
                    {/* 1st Row */}
                    <div className="col-span-2 w-full"><SummaryDashboard /><br></br></div>

                    {/* 2nd Row */}
                    <div className="col-span-2"><CalendarDashboard /></div>

                    {/* 3rd Row */}
                    <div className="p-2 col-span-2">
                        <RecentTransaction />
                    </div>
                </div>
            </div>
            <br></br>
        </div>

    )
}

export default Dashboard