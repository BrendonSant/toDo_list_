import { ChangeEvent, useState } from "react";
import { Inputarea } from "@/components/inputArea";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import { FiShare, FiTrash } from "react-icons/fi";



export default function Dashboard(){

    const[input, setInput] = useState("");
    const[publicTask, setPublicTask]= useState(false);

    function handleChangePublic(event:ChangeEvent<HTMLInputElement>){
        
      
        setPublicTask(event.target.checked);
    }

    function handleRegisterTask(){

    }

    return(
        <div className="flex flex-col  items-center h-[calc(100vh-64px)] px-4">
            <Head>
                <title>Meu Painel</title>
            </Head>
            <main className="flex flex-col items-center w-full h-full" >
                <section className=" w-full flex flex-col justify-center items-center  h-[calc(100vh/2)]" >
                    <div className=" w-full flex flex-col max-w-screen-lg mt-6 h-full">
                        <h1 className="font-sans font-bold text-3xl my-2">Qual a sua tarefa?</h1>
                        <form className=" flex flex-col w-full items-center">
                            <Inputarea
                                value={input}
                                onChange={(event:ChangeEvent<HTMLTextAreaElement>)=>{
                                    setInput(event.target.value)
                                }}
                                placeholder="Digite aqui a sua tarefa..."
                             />
                            <div className="flex w-full items-center m-4">
                            <input className="size-6" type="checkbox"
                            onSubmit={handleRegisterTask}
                            checked={publicTask}
                            onChange={handleChangePublic}
                            /> 
                            <label className="text-base font-sans font-semibold mx-4">Deixar tarefa publica?</label>
                            </div>
                            <button className="bg-blue-500 rounded transition duration-300 color ease-in w-1/3 h-12 min-w-28 hover:bg-orange-400" type="submit">Registrar</button>
                        </form>
                    </div>
                </section>
                <section className=" w-full flex flex-col px-4 h-[calc(100vh/2)] bg-white max-w-screen-lg rounded-t">
                    <h1 className="font-sans font-bold text-3xl mb-6 mt-4 text-black">Minhas terefas</h1>
                    <article className="  border-2 rounded border-gray-300">
                        <div className=" flex p-2 items-center">
                            <label className="text-white p-2 bg-blue-400 rounded mr-2">Publico</label>
                            <button className=" transition background-color ease-in-out duration-300 p-2 rounded hover:bg-gray-100">
                                <FiShare size={24} color="#000" />
                            </button>
                        </div>
                        <div className="flex items-center p-4 w-full justify-between">
                            <p className="text-black whitespace-pre-wrap">Minha primeira tarefa</p>
                            <div className=" transition background-color ease-in-out duration-300 p-2 rounded hover:bg-gray-100">
                            <FiTrash size={24}  color="orange"/>
                            </div>
                           
                        </div>
                    </article>
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

