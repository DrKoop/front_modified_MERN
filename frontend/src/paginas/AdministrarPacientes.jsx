import { useState } from "react";
import Formulario from "../components/Formulario";
import ListadoPacientes from "../components/ListadoPacientes";


const AdministrarPacientes = () => {
  const [ mostartFormulario, setMostartFormulario ] = useState(false);
  return (
    <div className="flex flex-col md:flex-row">
      <button
        type="button"
        className="bg-indigo-600 uppercase text-white font-bold mx-10 p-3 rounded-md mb-10 md:hidden"
        onClick={ () => setMostartFormulario(!mostartFormulario)}
        >
        {mostartFormulario ? 'Ocutlar Formulario' : 'Mostrar Formulario'}
      </button>
      <div className={`${mostartFormulario  ? 'block' : 'hidden' } md:block md:w-1/2 lg:w-2/5`}>
        <Formulario/>
      </div>
      <div className="md:w-1/2 lg:w-3/5">
        <ListadoPacientes/>
      </div>
    </div>
  )
}

export default AdministrarPacientes;