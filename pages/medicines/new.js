import { useRouter } from "next/router";
import { useState } from "react";

const useField = (type) => {
  const [value, setValue] = useState("");

  function onChange(event) {
    setValue(event.target.value);
    console.log(event.target.value);
  }

  return {
    type,
    value,
    onChange,
  };
};

export default function CreateMedicine() {
  const router = useRouter();
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
  const code = useField("text");
  const name = useField("text");
  const lab = useField("text");
  const concentration = useField("text");
  const stock = useField("number");
  const unitPrice = useField("number");
  const description = useField("text");

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    fetch("https://demo-04.herokuapp.com/api/medicines", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(new FormData(form)).toString(),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.ok) {
          router.push("/app");
        } else {
          alert("Error");
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <>
      <header className="flex items-center justify-between flex-wrap bg-teal-500 p-6">
        <h1 className="text-white text-3xl font-bold">
          Almacén Proveedores Rodriguez
        </h1>
      </header>
      <main className="flex flex-col justify-center items-center w-full">
        <h1 className="text-2xl font-bold mb-4">Crear medicina</h1>
        <form className="flex flex-col w-7/12" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label htmlFor="code" className="text-lg font-bold mb-2">
              Codigo
            </label>
            <input
              type="text"
              name="code"
              id="code"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              {...code}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="name" className="text-lg font-bold mb-2">
              Nombre
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              {...name}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="lab" className="text-lg font-bold mb-2">
              Laboratorio
            </label>
            <input
              type="text"
              name="lab"
              id="lab"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              {...lab}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="concentration" className="text-lg font-bold mb-2">
              Concentracion
            </label>
            <input
              type="text"
              name="concentration"
              id="concentration"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              {...concentration}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="stock" className="text-lg font-bold mb-2">
              Stock
            </label>
            <input
              type="text"
              name="stock"
              id="stock"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              {...stock}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="unitPrice" className="text-lg font-bold mb-2">
              Precio unitario
            </label>
            <input
              type="text"
              name="unitPrice"
              id="unitPrice"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              {...unitPrice}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="description" className="text-lg font-bold mb-2">
              Descripcion
            </label>
            <textarea
              name="description"
              id="description"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              {...description}
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-teal-500 mt-4 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Crear medicina
          </button>
        </form>
      </main>
    </>
  );
}
