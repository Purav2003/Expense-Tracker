import Sidebar from "./Sidebar"
import { Link } from "react-router-dom"
const PassSuccess = () =>{
    
    let token = localStorage.getItem("Token")
    if(token === null){
            window.location.replace("/")
    }
        return(
            <div className="bg-white">
            <div className="sm:ml-64"><br></br><br></br>
                <br></br>
                <center>Updates Succesfully </center>
                <Link to="/dashboard"><button>Go to Dashboard</button></Link>
                <Sidebar />
            </div>
        </div>
        
        )
}

export default PassSuccess