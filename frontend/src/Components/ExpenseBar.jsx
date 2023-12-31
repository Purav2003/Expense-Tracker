import "./../assets/css/sidebar.css"
import { barexpLinks } from "./BarListExpense"
import { useState } from "react"
import ExpenseForm from "./ExpenseForm"
import ExpenseTable from "./ExpenseTable"
import './../assets/css/income.css'


const ExpenseBar = () => {
    const [activebar, setActivebar] = useState('all');
    const data = (datas) =>{
        let all = ['all','add-expense','oneweek','onemonth','sixmonth','oneyear']    
        console.log(datas)
        setActivebar(datas)
        for(let i=0;i<=5;i++){
            if(all[i]!==datas){
                var trial = document.getElementById(all[i]);     
                trial.classList.add("hidden");         
            }
        }
        var element = document.getElementById(datas);        
        document.cookie = "daysAgoExp="+datas;
        element.classList.remove("hidden");
    }
    const data_mob = (datas) =>{
        let all = ['all','add-expense','oneweek','onemonth','sixmonth','oneyear']    
        setActivebar(datas.target.value)
        for(let i=0;i<=5;i++){
            if(all[i]!==datas.target.value){
                var trial = document.getElementById(all[i]);     
                trial.classList.add("hidden");         
            }
        }
        var element = document.getElementById(datas.target.value); 
        document.cookie = "daysAgoExp="+datas.target.value;       
        element.classList.remove("hidden");
    }

    return (
        <>
            <div className="px-4 bg-none left-0 z-50 w-full h-16 menu-web">
                <div className="grid h-full grid-cols-6 w-full mx-auto font-medium overflow-auto">                    
                    { barexpLinks.map((link) => (
                        <button key={link.id} type="button" className={`${activebar === link.id
                            ? "text-white bg-fourth rounded-md"
                            : "text-gray bg-[#eee] rounded-md"} hover:text-white mt-1 hover:bg-fourth w-[95%] h-[80%] items-center justify-center hover:rounded-md group`}
                            onClick={() => data(link.id)}
                            >
                            {link.title}
                        </button>
                    ))}
                </div>
            </div>
            <div className="px-4 menu-phone">                   
                    <select className="mode border border-black rounded w-full py-2 px-3 text-black-700 leading-tight focus:outline-none focus:shadow-outline "
                    onChange={(e) => data_mob(e)}>
                        
                             { barexpLinks.map((link) => (
                                <option key={link.id} value={link.id} >
                                <button className={`${activebar === link.id
                                    ? "text-white bg-[#025FBB] rounded-md"
                                    : "text-gray bg-[#eee] rounded-md"} hover:text-white mt-1 hover:bg-[#025FBB] w-[95%] h-[80%] items-center justify-center hover:rounded-md group`}
                                        
                                    >
                                    {link.title}
                                   
                                </button>
                                </option>
                            ))}
                        
                    </select>
                </div>
            <div>
                        <div id="all" className="all"><ExpenseTable /></div>
                        <div id="add-expense" className="addexpense hidden"><ExpenseForm /></div>
                        <div id="oneweek" className="oneweek hidden"><ExpenseTable /></div>
                        <div id="onemonth" className="onemonth hidden"><ExpenseTable /></div>
                        <div id="sixmonth" className="sixmonth hidden"><ExpenseTable /></div>
                        <div id="oneyear" className="oneyear hidden"><ExpenseTable /></div>

            </div>
        </>
    )
}

export default ExpenseBar