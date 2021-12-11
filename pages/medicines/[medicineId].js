import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function MedicineDetails() {
  const router = useRouter();
  const [medicine, setMedicine] = useState(null);
  const [stock, setStock] = useState(null);
  const { medicineId } = router.query;

  /**
   * @medicine: Object of medicine{
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

  const fetchData = async (id) => {
    try {
      const response = await fetch(
        `https://demo-04.herokuapp.com/api/medicines/medicine?id=${id}`
      );
      const data = await response.json();
      setMedicine(data.medicine);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    fetch(`https://demo-04.herokuapp.com/api/medicines?id=${medicineId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(new FormData(form)).toString(),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.ok) {
          router.push("/app");
        } else {
          alert("Error");
        }
      })
      .catch((error) => console.error(error));
  };

  const handleDelete = (e) => {
    e.preventDefault();
    fetch(`https://demo-04.herokuapp.com/api/medicines?id=${medicineId}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.ok) {
          router.push("/app");
        } else {
          alert("Error");
        }
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    if (medicineId) {
      fetchData(medicineId);
    }
  }, [medicineId]);

  return (
    <>
      <header className="flex items-center justify-between flex-wrap bg-teal-500 p-6">
        <h1 className="text-white text-3xl font-bold">
          Almacén Proveedores Rodriguez
        </h1>
      </header>
      <main className="flex flex-col justify-center items-center">
        {medicine && (
          <>
            <div className="flex justify-between shadow-md p-4 mb-4 shadow-cyan-200 w-2/5 mt-6">
              <h1 className="text-2xl font-bold">{medicine.name}</h1>
              <div className="flex">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Editar
                </button>
                <button
                  onClick={handleDelete}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-4"
                >
                  Eliminar
                </button>
              </div>
            </div>
            <div className="flex flex-col shadow-md p-4 mb-4 shadow-cyan-200 w-2/5">
              <div className="flex flex-col font-bold text-lg border-b-4 pb-2 border-gray-300">
                <div className="flex flex-col justify-between">
                  <div className="flex justify-between w-full">
                    <p className="text-gray-700">Laboratorio:</p>
                    <p className="text-gray-700 ml-4">{medicine.lab}</p>
                  </div>
                  <div className="flex justify-between w-full">
                    <p className="text-gray-700">Concentración:</p>
                    <p className="text-gray-700 ml-4">
                      {medicine.concentration}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col justify-between">
                  <div className="flex justify-between w-full">
                    <p className="text-gray-700">Precio:</p>
                    <p className="text-gray-700 ml-4">{medicine.unitPrice}</p>
                  </div>
                  <div className="flex justify-between w-full">
                    <p className="text-gray-700">Stock:</p>
                    <p className="text-gray-700 ml-4">{medicine.stock}</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col font-medium text-lg">
                <p className="text-gray-700">Descripción:</p>
                <p className="text-gray-700">{medicine.description}</p>
              </div>
            </div>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col shadow-md p-4 mb-4 shadow-cyan-200 w-2/5"
            >
              <div className="flex flex-col font-bold text-lg border-b-4 pb-2 border-gray-300">
                <div className="flex flex-col justify-between">
                  <div className="flex flex-col justify-between w-full">
                    <p className="text-gray-700">Actualizar Stock</p>
                    <p className="text-gray-700 ml-4">
                      <input
                        name="newStock"
                        type="number"
                        className="bg-gray-200 mb-4 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                        placeholder="Cantidad"
                        onChange={(e) => setStock(e.target.value)}
                      />
                    </p>
                    <p className="text-gray-700 ml-4">
                      <textarea
                        name="description"
                        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                        placeholder="Descripción"
                        onChange={(e) => setStock(e.target.value)}
                      ></textarea>
                    </p>
                  </div>
                  <button
                    type="submit"
                    className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Actualizar
                  </button>
                </div>
              </div>
            </form>
          </>
        )}
      </main>
    </>
  );
}
