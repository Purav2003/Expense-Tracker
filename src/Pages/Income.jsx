import Sidebar from "../Components/Sidebar"
import { Link } from "react-router-dom"
import IncomeForm from "../Components/IncomeForm"
import IncomeBar from "../Components/IncomeBar"
const Income = () =>{
    return(
        <div>
    <Sidebar />
    <div className="p-4 sm:ml-64"><br></br>
  <IncomeForm />
    
    
    </div>
</div>
    
    )
}

export default Income