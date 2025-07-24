import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

const _404_page:React.FC = ()=>{

    const navigate = useNavigate();

    return(
        <div className="h-screen flex items-center justify-center bg-green-950">
            <div className="py-6 mx-4 flex flex-col  gap-4 items-center      font-rubik text-white">
                <img src="https://cdn.prod.website-files.com/5e0a5d9d743608d0f3ea6753/65819264a7a62c9422e9df54_Vectors-Wrapper.svg" className="w-56" alt="" />
                <div className="text-xl sm:text-3xl">Why are you here?</div>
                <div className="text-lg sm:text-xl font-lexend font-normal ">
                    You're not supposed to be here.
                </div>
                <Button className="bg-white hover:bg-green-950 hover:text-white hover:border text-green-900 p-2 rounded-xl cursor-pointer" onClick={()=>navigate('/')}>
                    Go Home
                </Button>
            </div>
        </div>
    )
} 

export default _404_page;