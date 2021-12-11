import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold text-center">
        Bienvenido a{" "}
        <span className="text-blue-500">Proveedores Rodriguez</span>
      </h1>
      <button
        onClick={() => {
          router.push("/app");
        }}
        className="bg-blue-500 shadow-md text-lg shadow-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
      >
        Acceder a la aplicación
      </button>
    </div>
  );
}
