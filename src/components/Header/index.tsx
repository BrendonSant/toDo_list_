//---------------------------IMPORTS -------------------------------------------

import { useSession, signIn, signOut } from "next-auth/react"
import Link from "next/link"

//-------------------------------- TSX / JSX ----------------------------------------

export function Header(){

    const { data: session, status} = useSession();

    return(
       <nav className=" flex w-full h-12 justify-center bg-slate-900 mt-4 ">
        <ul className=" h-full w-full flex justify-between px-4 items-center max-w-screen-xl">
            <div className="flex items-center">
            <Link href="/"> <li className="font-bold text-2xl mx-2 bg-gradient-to-r from-purple-500 to-orange-500 bg-clip-text text-transparent">
                TAREFAS<span className="text-orange-500 ">+</span>
            </li>
            </Link>
            {session?.user &&(
                <Link href="/dashboard">
                <span className="transition ease-in duration-300 hover:text-orange-500 hover:font-semibold ">Meu Painel</span>
                </Link>
            )}
            
            </div>
            
            <li >{
                status === "loading" ? (
                    <></>
                ) : session ?   (
                    <button className="  transition ease-in border border-white p-1 w-fit text-center rounded-full hover:bg-white hover:text-slate-900" onClick={() => signOut()}>Ola {session?.user?.name}</button>
                ) : (
                    <button className="  transition ease-in border border-white p-1 w-24 text-center rounded-full hover:bg-white hover:text-slate-900" onClick={() => signIn("google")}>Login</button>
                )
                }</li>
        </ul>
       </nav> 
    )
}