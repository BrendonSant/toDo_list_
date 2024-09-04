//---------------------------IMPORTS --------------------------------

import Image from "next/image";
import { Inter } from "next/font/google";

import Heroimage from '../../public/home_img.webp';


const inter = Inter({ subsets: ["latin"] });

//------------------------------TSX/JSX----------------------------------

export default function Home() {
  return (
    <main className="w-full h-[calc(100vh-64px)] bg-slate-900 flex flex-col justify-center items-center">
      <div className=" max-w-96">
      <Image 
      alt="heroImage"

      src={Heroimage}
      />
      </div>
      
      <h1 className="text-center text-3xl font-bold max-sm:text-2xl mb-4">Feito para organizar seus <br />
      estudos e tarefas</h1>
      <div className="flex w-full justify-center items-center max-sm:flex-col max-sm:w-4/5">
        <div className=" m-4 p-4 border border-white rounded-lg text-center w-48 transition-all hover:scale-110 max-sm:w-4/5">
          <span className="font-semibold">+500 usuários </span>
        </div>
        <div className="  m-4 p-4 border border-white rounded-lg text-center w-48 transition-all hover:scale-110 max-sm:w-4/5">
          <span className="font-semibold">+1000 comentarios </span>
        </div>
      </div>
    </main>
  );
}
