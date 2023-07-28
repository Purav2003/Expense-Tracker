import * as icon from "react-icons/bs"
import "../Assets/css/sidebar.css"
import { barLinks } from "./BarList"
import { useState } from "react"
import { Link } from "react-router-dom"
import IncomeForm from "./IncomeForm"
import IncomeTable from "./IncomeTable"
import IncomeChart from "./IncomeChart"

const IncomeBar = () => {
    const [activebar, setActivebar] = useState('one-week');
    const data = (datas) =>{
        let purav = ['add-income','one-week','one-month','six-month','one-year']
        console.log(purav)
        console.log(purav)
        setActivebar(datas)
        for(let i=0;i<=4;i++){
            if(purav[i]!==datas){
                var trial = document.getElementById(purav[i]);     
                console.log(trial)   
                trial.classList.add("hidden");         
            }
        }
        var element = document.getElementById(datas);        
        element.classList.remove("hidden");
    }

    return (
        <>

            <div class="bg-[#174954] rounded-full left-0 z-50 w-full h-16 border-t border-gray-200">
                <div class="grid h-full grid-cols-5 mx-auto font-medium rounded-full overflow-x-auto">
                    
                    {barLinks.map((link) => (
                        <button key={link.id} type="button" className={`${activebar === link.id
                            ? "text-white bg-[rgba(255,255,255,0.1)] rounded-full"
                            : "text-gray"} hover:text-white items-center justify-center px-5 hover:bg-[rgba(255,255,255,0.1)] hover:rounded-full group`}
                            onClick={() => data(link.id)}
                            >
                            {link.title}
                        </button>
                    ))}

                </div>
            </div>
            <div>
                        <div id="add-income" className="add-income hidden"><IncomeForm /></div>
                        <div id="one-week" className="one-week"><IncomeTable /></div>
                        <div id="one-month" className="one-month hidden"><IncomeChart /></div>
                        <div id="six-month" className="six-month hidden">Six Months</div>
                        <div id="one-year" className="one-year hidden">One Year</div>

            </div>
        </>
    )
}

export default IncomeBar