import { useState } from "react";
import Login from "./Login";
import Register from "./Register";

export default function UserLogin(){
    const [step,setStep]=useState(1)
    return(
        <div className="w-full min-w-[300px] bg-gray-50 min-h-[100vh] flex flex-col items-center justify-center">
         <div className="w-auto min-w-[300px] flex flex-col gap-[5px] h-[400px]">
               <div className="grid  grid-cols-2 bg-white p-[2px] justify-between rounded-[10px] border  border border-gray-200">
                <span className={`${step===1 ? "bg-gray-100" : "bg-white" } p-2 rounded-[10px] flex items-center justify-center`} onClick={()=>{setStep(1)}}>Giriş et</span>
                <span className={`${step===2 ? "bg-gray-100" : "bg-white" } p-2 rounded-[10px] flex items-center justify-center`} onClick={()=>{setStep(2)}}>Qeydiyyat</span>
            </div>
            <div>
                {step===1 && <Login/>}
                {step===2 &&  <Register/>}
            </div>
         </div>
            

           
        </div>
    )
}