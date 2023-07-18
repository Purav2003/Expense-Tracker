import * as dash from 'react-icons/rx'
import * as income from 'react-icons/pi'
import * as expenses from 'react-icons/fa'
import * as report from 'react-icons/hi'
import * as profile from 'react-icons/cg'
import "../Assets/css/sidebar.css"
const Sidebar = () => {
    return (
        <div>
            <aside id="default-sidebar" className="fixed top-0 left-0 z-40 w-75 h-screen -translate-x-full sm:translate-x-0" aria-label="Sidebar">
                <div className="h-full px-3 py-4 overflow-y-auto bg-[#27374D]">
                    <div>
                        <br></br>   <h1 className='font-bold text-[29px] text-white'>Expense Tracker</h1><br></br><hr></hr><br></br>
                    </div>
                    <ul className="space-y-2 font-medium">
                        <li>
                            <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-[rgba(255,255,255,0.1)]  group">
                                <dash.RxDashboard></dash.RxDashboard><span className="ml-3">Dashboard</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-[rgba(255,255,255,0.1)]  group">
                                <income.PiMoneyLight></income.PiMoneyLight><span className="flex-1 ml-3 whitespace-nowrap">Income</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-[rgba(255,255,255,0.1)]  group">
                                <span className="flex-1 ml-3 whitespace-nowrap">Expenses</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-[rgba(255,255,255,0.1)]  group">

                                <report.HiOutlineDocumentReport></report.HiOutlineDocumentReport><span className="flex-1 ml-3 whitespace-nowrap">Report</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-[rgba(255,255,255,0.1)]  group">
                                <profile.CgProfile></profile.CgProfile><span className="flex-1 ml-3 whitespace-nowrap">Profile</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </aside>

            <div className="p-4 sm:ml-64">

            </div>
            <div className='mobile-nav fixed top-0 w-full h-16'>
                    <div className="h-full bg-[#27374D]">
                                <h1 className='font-bold text-white items-center justify-center py-5 px-3'>Expense Tracker</h1>
                    </div>
            </div>
            <div className='w-0 sm:w-full fixed
             inset-x-0
             bottom-0 bottom-menu'>

                <div className="fixed bottom-0 left-0 z-50 w-full h-16">
                    <div className="grid h-full max-w-lg grid-cols-5 mx-auto font-medium bg-[#27374D]">
                        <button type="button" className="inline-flex flex-col items-center justify-center px-5 hover:bg-[rgba(255,255,255,0.1)] group">
                            <dash.RxDashboard className='text-white text-[25px]'></dash.RxDashboard>
                            {/* <span className="text-sm text-white dark:text-white-400 group-hover:text-[#409447] dark:group-hover:text-white">Dashboard</span> */}
                        </button>
                        <button type="button" className="inline-flex flex-col items-center justify-center px-5 hover:bg-[rgba(255,255,255,0.1)] group">
                            <income.PiMoneyLight className='text-white text-[25px]'></income.PiMoneyLight>
                            {/* <span className="text-sm text-white dark:text-white-400 group-hover:text-[#409447] dark:group-hover:text-white">Income</span> */}
                        </button>
                        <button type="button" className="inline-flex flex-col items-center justify-center px-5 hover:bg-[rgba(255,255,255,0.1)] group">
                            {/* <span className="text-sm text-white dark:text-white-400 group-hover:text-[#409447] dark:group-hover:text-white">Expense</span> */}
                        </button>
                        <button type="button" className="inline-flex flex-col items-center justify-center px-5 hover:bg-[rgba(255,255,255,0.1)] group">
                            <report.HiOutlineDocumentReport className='text-white text-[25px]'></report.HiOutlineDocumentReport>
                            {/* <span className="text-sm text-white dark:text-white-400 group-hover:text-[#409447] dark:group-hover:text-white">Report</span> */}
                        </button>
                        <button type="button" className="inline-flex flex-col items-center justify-center px-5 hover:bg-[rgba(255,255,255,0.1)] group">
                            <profile.CgProfile className='text-white text-[25px]'></profile.CgProfile>
                            {/* <span className="text-sm text-white dark:text-white-400 group-hover:text-[#409447] dark:group-hover:text-white">Profile</span> */}
                        </button>
                    </div>
                </div>

            </div>
        </div>



    )
}

export default Sidebar