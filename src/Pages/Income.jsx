import Sidebar from "../Components/Sidebar"
import { Link } from "react-router-dom"
import IncomeForm from "../Components/IncomeForm"
import * as icon from "react-icons/fi"
import IncomeBar from "../Components/IncomeBar"
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { Toaster } from "react-hot-toast"
import axios from "axios"
const Income = () =>{
  let id = localStorage.getItem('createdBy');

    let token = localStorage.getItem("Token")
    if(token === null){
            window.location.replace("/")
    }
    const handleSubmit = async (e) => {
      e.preventDefault();
      const search = document.querySelector('.search-income').value
      localStorage.setItem("income-trial",search)
      if(search!==""){
      window.location.replace('search-income')}
      else{
        document.getElementById('errora').innerHTML = '<h1 className="pt-[0.5vw]">Enter Something</h1>'
      }

    }
    return(
      
        <div className="bg-white">            
                    <div><Toaster /></div>

    <div className="sm:ml-64"><br></br><br></br> 
    <div className="lg:flex px-8 main-heading-mob">
    <h1 className="text-4xl font-bold">Income </h1>    
    <div className="ml-[33vw] justify-end	relative lg:w-[44%] bg-[#eee] rounded-lg shadow-md px-4 py-2 search-bar">

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
   

</div> <div id="errora" className="ml-[45vw] pt-[2vh]" ></div><br></br>

  <IncomeBar />
  <Sidebar />

    
    </div>
</div>
    
    )
}

export default Income