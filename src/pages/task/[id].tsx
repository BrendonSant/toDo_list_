import { GetServerSideProps } from "next";
import Head from "next/head";

import {db} from '../../services/firebaseConection'
import {
    doc, 
    collection, 
    query, 
    where,
    getDoc
} from 'firebase/firestore';

interface TaskProps {
    item: {
        tarefa: string;
        created: string;
        public: boolean;
        user: string;
        taskId: string;
    };
}

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
                <div>

                </div>
            </main>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async({params}) =>{

    console.log('getServerSideProps called');
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

    console.log(snapshot.data());
    console.log(task);

return{
    props:{
        item: task,
    },
}
};