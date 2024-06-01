import { createContext,useState } from "react";

export const Usercontext=createContext()
export default function Usercontextprovider({child}){
    const[validuser,setvaliduser]=useState(null)
    return(
        <Usercontext.Provider value={{validuser,setvaliduser}}>{child}</Usercontext.Provider>
    )
}