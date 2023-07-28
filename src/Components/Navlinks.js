import * as dash from 'react-icons/rx'
import * as income from 'react-icons/pi'
import * as expenses from 'react-icons/fa'
import * as report from 'react-icons/hi'
import * as profile from 'react-icons/cg'
export const navLinks = [
  {
    id: "dashboard",
    title: "Dashboard",
    link:"/dashboard",
    icon: <dash.RxDashboard></dash.RxDashboard>,
    iconm:<dash.RxDashboard className='text-white text-[25px]'></dash.RxDashboard>,
  },
  {
    id: "income",
    title: "Credit",
    icon: <income.PiMoneyLight></income.PiMoneyLight>,
    link:"/income",
    iconm:<income.PiMoneyLight className='text-white text-[25px]'></income.PiMoneyLight>,

  },
  {
    id: "expense",
    title: "Debit",
    icon: <income.PiMoneyLight></income.PiMoneyLight>,
    iconm:<income.PiMoneyLight className='text-white text-[25px]'></income.PiMoneyLight>,
  },
  {
    id:"report",
    title:"Report",
    icon:<report.HiOutlineDocumentReport></report.HiOutlineDocumentReport>,
    iconm:<report.HiOutlineDocumentReport className='text-white text-[25px]'></report.HiOutlineDocumentReport>,
  },
  {
    id:"profile",
    title:"Profile",
    icon:<profile.CgProfile></profile.CgProfile>,
    iconm:<profile.CgProfile className='text-white text-[25px]'></profile.CgProfile>,
  }
    
  ];





  