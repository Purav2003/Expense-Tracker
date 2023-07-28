import Sidebar from "../Components/Sidebar"

const Dashboard = () =>{
    
    let token = localStorage.getItem("Token")
    if(token === null){
            window.location.replace("/")
    }
        return(
            <div>
        <Sidebar />
        <div className="p-4 sm:ml-64">
        <br></br><br></br>
                

            </div>
        
        </div>

        
        )
}

export default Dashboard