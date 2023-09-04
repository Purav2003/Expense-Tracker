import * as dash from 'react-icons/rx'
import * as income from 'react-icons/pi'

export const navLinks = [
  {
    id: "dashboard",
    title: "Dashboard",
    link:"/dashboard",
    icon: <dash.RxDashboard></dash.RxDashboard>,
    iconm:<dash.RxDashboard></dash.RxDashboard>,
  },
  {
    id: "income",
    title: "Income",
    icon: <income.PiMoneyLight></income.PiMoneyLight>,
    link:"/income",
    iconm:<income.PiMoneyLight className='text-white text-[25px]'></income.PiMoneyLight>,

  },
  {
    id: "expense",
    title: "Expense",
    icon: <income.PiMoneyLight></income.PiMoneyLight>,
    link:"/expense",
    iconm:<income.PiMoneyLight className='text-white text-[25px]'></income.PiMoneyLight>,
  },

    
  ];





  