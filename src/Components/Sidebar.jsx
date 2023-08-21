import "../Assets/css/sidebar.css"
import { useState } from 'react'
import { navLinks } from './Navlinks'
import { Link } from "react-router-dom"
const Sidebar = () => {

    const highlight = (e) =>{
        localStorage.setItem('highlights', JSON.stringify(e))
    }

    if(window.location.href.includes('income')){
        highlight("Income")
      }
      if(window.location.href.includes('dashboard')){
        highlight("Dashboard")
      }
      if(window.location.href.includes('expense')){
        highlight("Expense")
      }
      if(window.location.href.includes('report')){
        highlight("Report")
      }
      if(window.location.href.includes('profile')){
        highlight("Profile")
      }    
      let active = (localStorage.getItem('highlights'))
      active = JSON.parse(localStorage.getItem('highlights'))
    return (
        <div>
            <aside id="default-sidebar" className="fixed top-0 left-0 z-40 w-75 h-screen -translate-x-full sm:translate-x-0" aria-label="Sidebar">
                <div className="h-full px-3 py-4 overflow-y-auto " style={{background:'#56A054'}}>
                    <div>
                        <br></br>   <h1 className='font-bold text-[19px] text-white'>Expense Tracker</h1><br></br><hr></hr><br></br>
                    </div>
                    <ul className="space-y-2 font-medium">
                        {navLinks.map((link) => (
                            <li key={link.id} className={`${active === link.title
                                ? "font-bold bg-[rgba(255,255,255,0.1)] rounded-lg"
                                : "font-medium"} text-hello hover:text-white text-[18px]`
                            }                               
                               >
                                <Link to={link.link}  className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-[rgba(255,255,255,0.1)]  group">
                                    {link.icon}<span className="ml-3">{link.title}</span>
                                </Link>
                            </li>
                        ))}            
                    </ul>
                </div>
            </aside>            
            <div className="p-4 sm:ml-64">
            </div>

            <div className='w-0 sm:w-full fixed
             bottom-0 bottom-menu'>
                <div className="fixed bottom-0 left-0 w-full h-16">
                    <div className="grid bg-[white] h-full max-w-lg grid-cols-5 mx-auto font-medium  border border-black border-r-0 border-l-0 border-b-0 ">
                    {navLinks.map((link) => (
                            <button key={link.id} className={`${active === link.title
                                ? "text-white text-hello border border-black border-t-2 border-r-0 border-l-0 border-b-0"
                                : "text-secondary text-by"} inline-flex flex-col items-center justify-center px-5 group`}
                               >
                                <Link to={link.link} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white group">
                                {link.iconm}                             </Link>
                            </button>
                        ))}                              
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar

