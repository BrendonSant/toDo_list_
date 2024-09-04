//--------------------- IMPORTS -----------------------------------------------------------------------

import { HTMLProps } from "react";

// -------------------------------------TSX / JSX ------------------------------------------------------

export function Inputarea({...rest}:HTMLProps<HTMLTextAreaElement>){
    return(
        <textarea name="" id="" {...rest}  className="whitespace-pre-wrap w-full h-40 text-black rounded-lg p-1" >

        </textarea>
    )
}