import Sidebar from "../Components/Sidebar"
import Profile from "../Components/Profile"
import RecentTransaction from "../Components/RecentTransaction"
const Dashboard = () => {

    let token = localStorage.getItem("Token")
    if (token === null) {
        window.location.replace("/")
    }
    return (
        <div className="bg-white">
            <div className="sm:ml-[13vw]">
                <br />
                <br />
                <div className="lg:flex px-8 main-heading-mob">
                    <h1 className="text-4xl font-bold">Dashboard</h1>
                </div>
                <br />
                <div className="lg:grid grid-cols-3 gap-4">
                    {/* 1st Row */}
                    <div className="p-2"><Profile /></div>
                    <div className="bg-green-300">Cell 2</div>
                    <div className="bg-red-300">Cell 3</div>

                    {/* 2nd Row */}
                    <div className="bg-purple-300 col-span-2">Cell 4</div>
                    <div className="bg-yellow-300 row-span-2">Cell 6</div>

                    {/* 3rd Row */}
                    <div className="p-2 col-span-2">
                        <RecentTransaction />
                    </div>
                </div>
            </div>
            <br></br>
            <Sidebar />
        </div>

    )
}

export default Dashboard