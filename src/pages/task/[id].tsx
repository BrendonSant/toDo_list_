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

export default function Task(){
    return(
        <div>
            <Head>
                <title>Detalhes da tarefa</title>
            </Head>
            <main>
                <h1>Tarefa</h1>
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
    props:{}
}
};