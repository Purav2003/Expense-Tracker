import Sidebar from "../Components/Sidebar"
import Profile from "../Components/Profile"
const Dashboard = () =>{
    
    let token = localStorage.getItem("Token")
    if(token === null){
            window.location.replace("/")
    }
        return(
            <div className="bg-white">
            <div className="sm:ml-64"><br></br><br></br>
                <div className="lg:flex px-8 main-heading-mob">
                    <h1 className="text-4xl font-bold">Dashboard </h1>
                   

                </div><br></br>
                <Profile />
                <Sidebar />
            </div>
        </div>
        
        )
}

export default Dashboard