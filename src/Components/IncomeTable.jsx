import { useEffect, useState } from "react";
const IncomeTable = () => {
    const [data,setData] = useState([]);
    let id = localStorage.getItem("IdExpense")
    const API_URL = 'localhost:5000/api/v1/income/'+id
    useEffect(() => {
        fetch(API_URL)
          .then((res) => res.json())
          .then(data => {
            setData(data.results) 
          })      
        
      }, [])
    return (
        <>
        <br></br><br></br>
<div className="relative overflow-x-auto">
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    Description
                </th>
                <th scope="col" className="px-6 py-3">
                    Amount
                </th>
                <th scope="col" className="px-6 py-3">
                    Date
                </th>
                <th scope="col" className="px-6 py-3">
                    Mode
                </th>
            </tr>
        </thead>
        <tbody>
            
                {
                    data.map((tables)=>{
                        const{description,amount,date,mode} = tables

                        return(
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <td>{description}</td>
                            </tr>
                        )
                    })

                    

                }
            
            
        </tbody>
    </table>
</div>
</>
    )
}

export default IncomeTable