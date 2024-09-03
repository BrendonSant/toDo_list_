import { Inputarea } from "@/components/inputArea";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";



export default function Dashboard(){
    return(
        <div className="flex flex-col  items-center h-[calc(100vh-64px)]">
            <Head>
                <title>Meu Painel</title>
            </Head>
            <main className="flex flex-col items-center w-full h-full" >
                <section className=" w-full flex flex-col px-4 justify-center items-center  h-[calc(100vh/2)]" >
                    <div className=" w-full flex flex-col max-w-screen-lg mt-6 h-full">
                        <h1 className="font-sans font-bold text-3xl m-2">Qual a sua tarefa?</h1>
                        <form className=" flex flex-col w-full items-center">
                            <Inputarea
                            
                                placeholder="Digite aqui a sua tarefa..."
                             />
                            <div className="flex w-full items-center m-4">
                            <input className="size-6" type="checkbox"/> 
                            <label className="text-base font-sans font-semibold mx-4">Deixar tarefa publica?</label>
                            </div>
                            <button className="bg-blue-500 rounded transition duration-300 color ease-in w-1/3 h-12 min-w-28 hover:bg-orange-400" type="submit">Registrar</button>
                        </form>
                    </div>
                </section>
            </main>
        </div>
       
    )
}



export const getServerSideProps: GetServerSideProps = async ({req}) =>{
    const session = await getSession({req});

    if (!session?.user){
        return{
            redirect:{
                destination:"/",
                permanent: false,
            },

        };
    }
    return{
        props:{},
    }
};

