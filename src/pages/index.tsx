//---------------------------IMPORTS --------------------------------

import Image from "next/image";
import { Inter } from "next/font/google";

import Heroimage from '../../public/home_img.webp';
import { GetStaticProps } from "next";

import {collection,getDocs} from 'firebase/firestore';

import { db } from "@/services/firebaseConection";

const inter = Inter({ subsets: ["latin"] });

//------------------------------TSX/JSX----------------------------------

interface HomeProps{
    post: number;
    comments: number;
}




export default function Home({post,comments}: HomeProps) {
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
          <span className="font-semibold">+{post} Postagens </span>
        </div>
        <div className="  m-4 p-4 border border-white rounded-lg text-center w-48 transition-all hover:scale-110 max-sm:w-4/5">
          <span className="font-semibold">+{comments} Comentários </span>
        </div>
      </div>
    </main>
  );
}

export const getStaticProps: GetStaticProps = async () => {

  const commentRef = collection(db, "comments");
  const postRef = collection(db, "tarefas");

  const commentSnapshot = await getDocs(commentRef);
  const postSnapshot = await getDocs(postRef);



  return{
    props:{
      post: postSnapshot.size || 0,
      comments: commentSnapshot.size || 0,
    },
    revalidate: 60  // revalidado a cada 60 segundos
  };
};
