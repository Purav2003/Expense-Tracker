import Sidebar from "../Components/Sidebar"
import Profile from "../Components/Profile"
import RecentTransaction from "../Components/RecentTransaction"
import CalendarDashboard from "../Components/CalendarDashboard"
import SummaryDashboard from "../Components/SummayDashboard"
const Dashboard = () => {

    let token = localStorage.getItem("Token")
    if (token === null) {
        window.location.replace("/")
    }
    return (
        <div className="bg-white">
            <Sidebar />

            <div>
                <br />
                <br />
                <div className="lg:flex px-8 main-heading-mob">
                    <h1 className="text-4xl font-bold">Dashboard</h1>
                </div>
                <br />
                <div className="lg:grid grid-cols-2 gap-4">
                    {/* 1st Row */}
                    <div className="col-span-2 w-full"><SummaryDashboard /></div>

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