import "../Assets/css/sidebar.css"
import { barLinks } from "./BarList"
import { useState } from "react"
import IncomeForm from "./IncomeForm"
import IncomeTable from "./IncomeTable"
import '../Assets/css/income.css'


const IncomeBar = () => {
    const [activebar, setActivebar] = useState('all');
    const data = (datas) =>{
        let all = ['all','add-income','oneweek','onemonth','sixmonth','oneyear']    
        setActivebar(datas)
        for(let i=0;i<=5;i++){
            if(all[i]!==datas){
                var trial = document.getElementById(all[i]);     
                console.log(trial)   
                trial.classList.add("hidden");         
            }
        }
        var element = document.getElementById(datas);    
        document.cookie = "daysAgo="+datas;
        element.classList.remove("hidden");
    }
    const data_mob = (datas) =>{
        let all = ['all','add-income','oneweek','onemonth','sixmonth','oneyear']    
        setActivebar(datas.target.value)
        for(let i=0;i<=5;i++){
            if(all[i]!==datas.target.value){
                var trial = document.getElementById(all[i]);     
                console.log(trial)   
                trial.classList.add("hidden");         
            }
        }
        var element = document.getElementById(datas.target.value);   
        localStorage.setItem("daysAgo",datas.target.value)         
        element.classList.remove("hidden");
    }

    return (
        <>
            <div className="px-4 bg-none left-0 z-50 w-full h-16 menu-web">
                <div className="grid h-full grid-cols-6 w-full mx-auto font-medium overflow-auto">                    
                    {barLinks.map((link) => (
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
                        
                             {barLinks.map((link) => (
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
                        <div id="all" className="all"><IncomeTable /></div>
                        <div id="add-income" className="add-income hidden"><IncomeForm /></div>
                        <div id="oneweek" className="oneweek hidden"><IncomeTable /></div>
                        <div id="onemonth" className="onemonth hidden"><IncomeTable/></div>
                        <div id="sixmonth" className="sixmonth hidden"><IncomeTable /></div>
                        <div id="oneyear" className="oneyear hidden"><IncomeTable /></div>

            </div>
        </>
    )
}

export default IncomeBar