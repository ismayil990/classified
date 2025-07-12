import Input from "./Input";
import SelectCategory from "./SelectCategory";
import Textarea from "./Textarea";
import { locations } from "../../data/options";
import { useState } from "react";

export default function UserDetails(){
    

    return(
        <div className="flex flex-col gap-[5px]">

            <div className="flex flex-col gap-[20px]">
                  <Input 
            placeholder="Adınız"
            />
            <Input 
            placeholder="Email hesabı"
            />
            </div>

        </div>
    )
}