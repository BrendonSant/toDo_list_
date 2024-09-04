//------------------------------ IMPORSTS ----------------------------------------

import { GetServerSideProps } from "next";
import Head from "next/head";
import { Inputarea } from "@/components/inputArea";

import {db} from '../../services/firebaseConection'
import {
    doc, 
    collection, 
    query, 
    where,
    getDoc
} from 'firebase/firestore';
import { FiTrash } from "react-icons/fi";

//--------------------------------------------------------------------------------


//---------------------------- INTERFACES ----------------------------------------

interface TaskProps {
    item: {
        tarefa: string;
        created: string;
        public: boolean;
        user: string;
        taskId: string;
    };
}

//--------------------------------- TSX / JSX -------------------------------------

export default function Task({item}: TaskProps){
    return(
        <div>
            <Head>
                <title>Detalhes da tarefa</title>
            </Head>
            <main>
                <h1>Tarefa</h1>
                <article>
                    <p>
                        {item.tarefa}
                    </p>
                </article>
              
            </main>
            <div>
                <h2>Comentarios</h2>
                <div>
                    <label>Nome</label>
                    <div>
                    <Inputarea />
                    <FiTrash />
                    </div>
                    
                </div>
            </div>
        </div>
    )
}


//------------------------------------- SERVER SIDE -----------------------------------------------

export const getServerSideProps: GetServerSideProps = async({params}) =>{

   
    const id = params?.id as string;

    const docRef = doc(db, "tarefas", id);
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
    },
}
};