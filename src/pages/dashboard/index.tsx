//---------------------------IMPORTS----------------------------------------------

import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { Inputarea } from "@/components/inputArea";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import { FiShare, FiTrash } from "react-icons/fi";

import {db} from '../../services/firebaseConection';
import {addDoc, collection, query, orderBy, where, onSnapshot, doc, deleteDoc} from 'firebase/firestore';
import Link from "next/link";

//-----------------------------INTERFACES ---------------------------------------

interface HomeProps{
    user:{
        email:string;
    }
}

interface TaskProps{
    id: string;
    created:Date;
    public: boolean;
    tarefa: string;
    user: string;

    
}


export default function Dashboard({user}: HomeProps){


//------------------ USESTATES --------------------------------------------------

    const[input, setInput] = useState("");
    const[publicTask, setPublicTask]= useState(false);
    const[tasks, setTasks] = useState<TaskProps[]>([]);

//-------------------------USEEFFECTS--------------------------------------------

useEffect(() => {
    async function loadTarefas() {
        
        const tarefasRef = collection(db, "tarefas") //criando referencia ao banco.
        const q =query (                             // criando filtro.
            tarefasRef,
            orderBy("created","desc"),              //ordem de cadastro.
            where("user", "==", user?.email)       //apenas tarefas no usuario.

        )
        onSnapshot(q, (snapshot) =>{
            let lista = [] as TaskProps[];

            snapshot.forEach((doc) =>{
                lista.push({
                    id: doc.id,
                    tarefa: doc.data().tarefa,
                    created: doc.data().created,
                    user: doc.data().user,
                    public: doc.data().public,

                })
            })

            setTasks(lista);
        });
    }
    loadTarefas();
},[user?.email])

//-------------------------------------HANDLE FUNCTIONS --------------------------

async function handleShare(id: string){
    await navigator.clipboard.writeText(
        `${process.env.NEXT_PUBLIC_URL}/task/${id}`
    );
    alert("Url copiada com sucesso!")
}



function handleChangePublic(event:ChangeEvent<HTMLInputElement>){
        
      
        setPublicTask(event.target.checked);
}

    async function handleRegisterTask(event: FormEvent){
        event.preventDefault();

        if(input === "") return;

        try{
            
            await addDoc(collection(db, 'tarefas'),{
                tarefa: input,
                created: new Date(),
                user: user?.email,
                public: publicTask
            });

            setInput("");
            setPublicTask(false);

            }catch(err){
                console.log(err);
            }
    }



    async function handleDeleteTask(id: string) {
        const docRef = doc(db, "tarefas", id);
        await deleteDoc(docRef);
    }


//------------------------------------TSX / JSX---------------------------------------------


    return(
        <div className="flex flex-col  items-center min-h-screen h-fit px-4">
            <Head>
                <title>Meu Painel</title>
            </Head>
            <main className="flex flex-col items-center w-full h-full" >
                <section className=" w-full flex flex-col justify-center items-center mb-6  h-full" >
                    <div className=" w-full flex flex-col max-w-screen-lg mt-6 h-full">
                        <h1 className="font-sans font-bold text-2xl my-2">Qual a sua tarefa?</h1>
                        <form 
                        onSubmit={handleRegisterTask}
                        className=" flex flex-col w-full items-center">
                            <Inputarea
                                value={input}
                                onChange={(event:ChangeEvent<HTMLTextAreaElement>)=>{
                                    setInput(event.target.value)
                                }}
                                placeholder=" Digite aqui a sua tarefa..."
                             />
                            <div className="flex w-full items-center m-4">
                            <input  className="size-4" type="checkbox"
                            
                            checked={publicTask}
                            onChange={handleChangePublic}
                            /> 
                            <label className="text-base font-sans font-semibold mx-4">Deixar tarefa publica?</label>
                            </div>
                            <button className="bg-purple-400 rounded transition duration-500 color ease-in w-1/3 h-12 min-w-28 hover:bg-orange-400" type="submit">Registrar</button>
                        </form>
                    </div>
                </section>
                <section className=" h-full w-full flex flex-col px-4  bg-white max-w-screen-lg rounded-t">
                    <h1 className="font-sans font-bold text-2xl mb-6 mt-4 text-black">Minhas terefas</h1>
                   {tasks.map((item)=>(
                     <article key={item.id} className=" mb-4 border-2 rounded border-gray-300">
                     {item.public && (
                        <div className=" flex p-2 items-center">
                        <label className="text-white p-2 bg-orange-400 rounded mr-2">Publico</label>
                        <button className="p-2" onClick={() => handleShare(item.id)}>
                            <FiShare className="hover:stroke-violet-500" size={24} color="#000" />
                        </button>
                    </div>
                     )}
                     <div className="flex items-center p-4 w-full justify-between">
                         {item.public ? (
                            <Link href={`/task/${item.id}`}>
                                <p className="text-black whitespace-pre-wrap">{item.tarefa}</p>
                            </Link>
                         ):(
                            <p className="text-black whitespace-pre-wrap">{item.tarefa}</p>
                         )}
                         <div className=" p-2">
                         <FiTrash className="hover:stroke-red-600" size={24}  color="orange" onClick={()=> handleDeleteTask(item.id)}/>
                         </div>
                        
                     </div>
                 </article>
                   ))}
                </section>
            </main>
        </div>
       
    )
}


//---------------------------------SERVER SIDE ------------------------------------------------


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
        props:{
            user:{
                email: session?.user?.email,
            },
        },
    };
};

