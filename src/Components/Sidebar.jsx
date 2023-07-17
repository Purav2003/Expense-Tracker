import * as dash from 'react-icons/rx'
import * as income from 'react-icons/pi'
import * as expense from 'react-icons/gi'
import * as report from 'react-icons/hi'
import * as profile from 'react-icons/cg'

const Sidebar = () => {
    return (
        <div>
            <aside id="default-sidebar" className="fixed top-0 left-0 z-40 w-75 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
                <div className="h-full px-3 py-4 overflow-y-auto bg-[#2a8c34]">
                    <div>
                     <br></br>   <h1 className='font-bold text-[29px] text-white'>Expense Tracker</h1><br></br>
                    </div>
                    <ul className="space-y-2 font-medium">
                        <li>
                            <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-[#409447]  group">
                                <dash.RxDashboard></dash.RxDashboard><span className="ml-3">Dashboard</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-[#409447]  group">
                                <income.PiMoneyLight></income.PiMoneyLight><span className="flex-1 ml-3 whitespace-nowrap">Income</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-[#409447]  group">
                                <expense.GiExpense></expense.GiExpense><span className="flex-1 ml-3 whitespace-nowrap">Expenses</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-[#409447]  group">

                                <report.HiOutlineDocumentReport></report.HiOutlineDocumentReport><span className="flex-1 ml-3 whitespace-nowrap">Report</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-[#409447]  group">
                                <profile.CgProfile></profile.CgProfile><span className="flex-1 ml-3 whitespace-nowrap">Profile</span>
                            </a>
                        </li>

                    </ul>
                </div>
            </aside>

            <div className="p-4 sm:ml-64">
                
            </div>
        </div>
    )
}

export default Sidebar