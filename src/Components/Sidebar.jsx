import "../Assets/css/sidebar.css"
import { useState } from 'react'
import { navLinks } from './Navlinks'

const Sidebar = () => {
    const [active, setActive] = useState('Dashboard');

    return (
        <div>
            <aside id="default-sidebar" className="fixed top-0 left-0 z-40 w-75 h-screen -translate-x-full sm:translate-x-0" aria-label="Sidebar">
                <div className="h-full px-3 py-4 overflow-y-auto bg-[#174954]">
                    <div>
                        <br></br>   <h1 className='font-bold text-[29px] text-white'>Expense Tracker</h1><br></br><hr></hr><br></br>
                    </div>
                    <ul className="space-y-2 font-medium">
                        {navLinks.map((link) => (
                            <li key={link.id} className={`${active === link.title
                                ? "text-hello bg-[rgba(255,255,255,0.1)] rounded-lg"
                                : "text-by"} hover:text-white text-[18px] font-medium`}
                                onClick={() => setActive(link.title)}>
                                <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-[rgba(255,255,255,0.1)]  group">
                                    {link.icon}<span className="ml-3">{link.title}</span>
                                </a>
                            </li>
                        ))}            
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
                    <div className="grid h-full max-w-lg grid-cols-5 mx-auto font-medium  border border-black border-r-0 border-l-0 border-b-0 ">

                    {navLinks.map((link) => (
                            <button key={link.id} className={`${active === link.title
                                ? "text-white text-hello border border-black border-t-2 border-r-0 border-l-0 border-b-0"
                                : "text-secondary text-by"} inline-flex flex-col items-center justify-center px-5 group`}
                                onClick={() => setActive(link.title)}>
                                <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white group">
                                {link.iconm}                             </a>
                            </button>
                        ))}           
                   
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Sidebar