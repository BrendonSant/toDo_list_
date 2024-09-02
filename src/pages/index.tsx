import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className="w-full h-svh bg-slate-900">
      <h1>Ola Mundo</h1>
    </main>
  );
}
