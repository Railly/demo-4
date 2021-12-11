import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function App() {
  const [medicines, setMedicines] = useState(null);
  const router = useRouter();
  /**
   * @medicines: Array of medicines{
      "code": "BCDG-31233",
      "name": "Orfenadrina",
      "lab": "IqFarma",
      "concentration": "100 mg",
      "stock": 200,
      "unitPrice": 2.5,
      "description": "Blister de diez unidades",
      "createdAt": "2021-12-09T03:48:48.097Z",
      "updatedAt": "2021-12-10T23:39:48.401Z",
      "medicineId": "61b17ca01c4e005a2aed9b51"
    },
   */

  const fetchData = async () => {
    try {
      const res = await fetch(
        "https://demo-04.herokuapp.com/api/medicines?from=0&limit=5"
      );
      const data = await res.json();
      setMedicines(data.medicines);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [medicines]);

  return (
    <>
      <header className="flex items-center justify-between flex-wrap bg-teal-500 p-6">
        <h1 className="text-white text-3xl font-bold">
          Almacén Proveedores Rodriguez
        </h1>
      </header>
      <main className="flex flex-col mx-8 my-8">
        <h1 className="text-4xl font-bold my-4 w-full flex justify-between">
          <span className="text-teal-500">
            Medicinas de Almacén Proveedores Rodriguez
          </span>
          <button
            onClick={() => router.push("/medicines/new")}
            className="bg-cyan-500 text-lg shadow-md shadow-cyan-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-cyan-600 transition-colors my-2"
          >
            Crear medicina
          </button>
        </h1>
        <div className="grid grid-cols-3 gap-4">
          {medicines &&
            medicines.map((medicine) => (
              <div
                key={medicine.medicineId}
                className="flex flex-col items-center justify-center py-2 m-2 bg-white rounded-lg shadow-md shadow-teal-200"
              >
                <p className="text-2xl font-bold text-teal-800 bg-teal-200 p-2 rounded-lg w-full text-center">
                  {medicine.name}
                </p>
                <div className="flex text-lg font-medium flex-col items-center justify-center w-full">
                  <p className="p-2 rounded-lg w-full flex justify-between px-8">
                    <span className="text-teal-500">Laboratorio: </span>
                    <span className="text-teal-800 truncate ml-6">
                      {medicine.lab}
                    </span>
                  </p>
                  <p className="p-2 rounded-lg w-full flex justify-between px-8">
                    <span className="text-teal-500">Concentración: </span>
                    <span className="text-teal-800">
                      {medicine.concentration}
                    </span>
                  </p>
                  <p className="p-2 rounded-lg w-full flex justify-between px-8">
                    <span className="text-teal-500">Stock: </span>
                    <span className="text-teal-800">{medicine.stock}</span>
                  </p>
                  <p className=" p-2 rounded-lg w-full flex justify-between px-8">
                    <span className="text-teal-500">Precio: </span>
                    <span className="text-teal-800">{medicine.unitPrice}</span>
                  </p>
                  <p className="p-2 rounded-lg w-full flex justify-between px-8">
                    <span className="text-teal-500">Descripción: </span>
                    <span className="text-teal-800 text-right">
                      {medicine.description}
                    </span>
                  </p>
                  <button
                    onClick={() =>
                      router.push(`/medicines/${medicine.medicineId}`)
                    }
                    className="bg-cyan-500 shadow-md shadow-cyan-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-cyan-600 transition-colors my-2"
                  >
                    Ver detalles
                  </button>
                </div>
              </div>
            ))}
        </div>
      </main>
    </>
  );
}
