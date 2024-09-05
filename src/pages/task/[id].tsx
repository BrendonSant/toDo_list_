//------------------------------ IMPORSTS ----------------------------------------
import { ChangeEvent, FormEvent, useState } from "react";
import { useSession } from "next-auth/react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { Inputarea } from "@/components/inputArea";

import {db} from '../../services/firebaseConection'
import {
    doc, 
    collection, 
    query, 
    where,
    getDoc,
    addDoc,
    getDocs,
    deleteDoc
    
} from 'firebase/firestore';
import { FiTrash } from "react-icons/fi";

//------------------------------USESTATES-----------------------------------------




//---------------------------- INTERFACES ----------------------------------------

interface TaskProps {
    item: {
        tarefa: string;
        created: string;
        public: boolean;
        user: string;
        taskId: string;
    };
    allComments: CommentsProps[];
}

interface CommentsProps{
    id: string;
    comment: string;
    taskId: string;
    user: string;
    name: string;
}

//--------------------------------- TSX / JSX -------------------------------------

export default function Task({item, allComments}: TaskProps){

    const {data: session} = useSession();

    const [input, setInput] = useState("");

    const [comments, setComments] = useState<CommentsProps[]>(allComments || []);

    async function handleComment(event:FormEvent) {
        event.preventDefault();

       if(input === "") return;

       if(!session?.user?.email || !session?.user?.name) return;

       try{
            const docRef = await addDoc(collection(db, "comments"),{
                comments: input,
                created: new Date(),
                user: session?.user?.email,
                name: session?.user?.name,
                taskId: item?.taskId
            });

            const data = {
                id: docRef.id,
                comment: input,
                user: session?.user?.email,
                name: session?.user?.name,
                taskId: item?.taskId

            }
            setComments((oldItems) => [...oldItems, data]);
            setInput("");

       }catch(err){
        console.log(err);
       }
    }

    async function handleDeleteComment(id: string){
        try{
            const docRef = doc(db, "comments",id);
            await deleteDoc(docRef);

            const deleteComment = comments.filter((item) => item.id !== id);

            setComments(deleteComment);

        }catch(err){
            console.log(err);
        }
    }

    return(
        <div className=" flex flex-col items-center p-4 l w-full justify-center">
            <Head>
                <title>Detalhes da tarefa</title>
            </Head>
            <main className="w-full flex items-center flex-col max-w-screen-lg">
               
                <article className=" mt-4 p-4 rounded-lg w-full border border-white h-fit whitespace-pre-wrap">
                    <p>
                        {item.tarefa}
                    </p>
                </article>
              
            </main>
            <div className=" mt-8 w-full max-w-screen-lg ">
                <h2 className="text-xl mb-4">Deixar Comentário</h2>
                <div className="w-full rounded-md" >
                   
                    <form 
                    onSubmit={handleComment}
                    className="flex flex-col items-center" >
                        <Inputarea 
                        value={input}
                        onChange={(event: ChangeEvent<HTMLTextAreaElement>) => setInput(event.target.value)}
                        placeholder=" Digite um comentário."
                        />
                        <button 
                        disabled={!session?.user}
                        className=" transition ease-in duration-300 bg-purple-400 h-12 w-full mt-8 rounded-md max-w-md min-w-40 hover:bg-orange-500 disabled:bg-gray-400">Comentar</button>
                    </form>
                    
                </div>
                <div>
                    <h2 className="font-sans text-xl my-4" >Todos comentários</h2>
                    {comments.length === 0 && (
                        <span>Nenhum comentário encontrado ...</span>
                    )}
                    {comments.map((item) => (
                        <article className="border border-white border-opacity-10 p-2 mb-4 rounded-md" key={item?.id}>
                            <div className="flex items-center mb-4">
                                <label className="bg-orange-500 p-2 text-center rounded-md mr-4">{item.name}</label>
                                {item.user === session?.user?.email && (
                                    <button onClick={() => handleDeleteComment(item.id)}>
                                    <FiTrash size={20} className=" transition ease-in duration-150 hover:stroke-red-600"/>
                                </button>
                                )}
                            </div>
                            <p className=" py-2 whitespace-pre-wrap" >{item.comment}</p>
                        </article>
                    ))}
                </div>
            </div>
        </div>
    )
}


//------------------------------------- SERVER SIDE -----------------------------------------------

export const getServerSideProps: GetServerSideProps = async({params}) =>{

   
    const id = params?.id as string;

    const docRef = doc(db, "tarefas", id);

    const q = query(collection(db, "comments"), where("taskId", "==", id));

    const snapshotComments = await getDocs(q);

    let allComments: CommentsProps[] = [];

    snapshotComments.forEach((doc) => {
        allComments.push({
          id: doc.id,
          comment: doc.data().comments,
          user: doc.data().user,
          name: doc.data().name,
          taskId: doc.data().taskId  
        })
    })

    

    const snapshot = await getDoc(docRef);

    if(snapshot.data() === undefined){
        return {
            redirect:{
                destination:"/",
                permanent: false,
            },
        };
    }

    if(!snapshot.data()?.public){
        return {
            redirect:{
                destination:"/",
                permanent: false,
            },
        };
    }

    const miliseconds = snapshot.data()?.created?.seconds * 1000;

    const task ={
        tarefa: snapshot.data()?.tarefa,
        public: snapshot.data()?.public,
        created: new Date(miliseconds).toLocaleDateString(),
        user: snapshot.data()?.user,
        taskId:id,
    }

   
return{
    props:{
        item: task,
        allComments: allComments
    },
}
};