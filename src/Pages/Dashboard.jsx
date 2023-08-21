import Sidebar from "../Components/Sidebar"

const Dashboard = () =>{
    
    let token = localStorage.getItem("Token")
    if(token === null){
            window.location.replace("/")
    }
        return(
            <div>
                  <div className="lg:flex px-8 main-heading-mob">
    <h1 className="text-4xl font-bold">Income </h1>    </div>
        <Sidebar />
        <div className="p-4 sm:ml-64">
        <br></br><br></br>
                

            </div>
        
        </div>

        
        )
}

export default Dashboard