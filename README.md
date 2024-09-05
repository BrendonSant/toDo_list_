# TAREFAS+

Aplicação desenvolvida por **Brendon Santos** com o objetivo de estudar e aprimorar conhecimentos em **Front-End** utilizando **Next.js**. A aplicação permite que os usuários se conectem via Google, cadastrem tarefas e compartilhem-nas com amigos. Somente usuários logados podem comentar nas tarefas compartilhadas.

## 🚀 Funcionalidades

- **Autenticação via Google**: O usuário pode conectar ou cadastrar uma conta usando o Google.
- **Cadastro de Tarefas**: Criação e salvamento de tarefas diretamente no app.
- **Compartilhamento de Tarefas**: Compartilhamento das tarefas por meio de um link (URL) com amigos.
- **Comentários em Tarefas**: Usuários logados podem comentar nas tarefas compartilhadas.

### 📸 Telas do Projeto

#### Tela Principal
![Tela Principal](./public/prints/Tela-Principal.png)

#### Tela de Tarefas
![Tela de Tarefas](./public/prints/Tela_de_terefas.png)

#### Tela de Comentários
![Tela de Comentários](./public/prints/Tela_de_comentarios.png)

## 💻 Tecnologias Utilizadas

- **Next.js**: Framework React para construção de páginas dinâmicas e estáticas.
- **Firebase**: Utilizado para autenticação, armazenamento de tarefas e comentários.
- **Tailwind CSS**: Framework CSS para estilização dos componentes.

## 🔧 Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/BrendonSant/toDo_list_.git
2.Acesse a pasta do projeto:
```bash
cd toDo_list_
```
3.Instale as dependências:

```bash
npm install
````
4.Inicie o servidor de desenvolvimento:
```bash
npm run dev
````
5.Acesse a aplicação em `http://localhost:3000`.

## 🧩 Principais Trechos de Código
### Configuração do Firebase
```javascript

// Import the functions you need from the SDKs you need
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyADamUDCYsKhA8X_gac6z-nMBJEj7XTrBw",
  authDomain: "todolist-daff0.firebaseapp.com",
  projectId: "todolist-daff0",
  storageBucket: "todolist-daff0.appspot.com",
  messagingSenderId: "754599494030",
  appId: "1:754599494030:web:9805106b1cae624cd2a4df"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);

export {db};
````

### Função para adicionar tarefas
```javascript

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


````
### Função para compartilhar link da tarefa
```javascript

async function handleShare(id: string){
    await navigator.clipboard.writeText(
        `${process.env.NEXT_PUBLIC_URL}/task/${id}`
    );
    alert("Url copiada com sucesso!")
}
````
## 📚 Objetivo
Este projeto foi realizado com o intuito de estudar e aprimorar as habilidades em desenvolvimento front-end, utilizando Next.js e Firebase para uma experiência prática e real.

## 📧 Contato
Caso tenha dúvidas ou sugestões, entre em contato pelo GitHub Brendon Santos.
