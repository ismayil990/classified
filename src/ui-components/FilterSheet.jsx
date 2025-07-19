import {SlidersHorizontal} from "lucide-react"
export default function FilterSheet(){
    return(
         <div onClick={()=>{setShowFilter(true)}} className="w-full flex justify-between bg-white px-2 py-[7px] border-1 border-gray-100 rounded-xl min-[770px]:hidden">
          <div className="flex items-center gap-[15px] px-3">
            <p className="font-medium text-slate-600">Axtarış</p>
          </div>
          <div className=" rounded-xl p-[5px] bg-blue-600 flex items-center justify-center">
        <SlidersHorizontal className="text-white text-[10px]" size={20}/>
          </div>
         </div>
    )
}