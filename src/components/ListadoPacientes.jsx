import usePacientes from "../hooks/usePacientes";
import Paciente from "./Paciente";

function ListadoPacientes() {
  const { pacientes} = usePacientes()
  
  return (
    <>
      { pacientes.length ? 
      (
        <>
        <h2 className="font-black text-3xl">Listado Pacientes</h2>
          <p className="text-xl mt-5 mb-10 text-center">
            Administra tus {''}
            <span className="text-indigo-600 font-bold">Pacientes y Citas</span>
          </p>

            {pacientes.map( listadoPacientes => (
              <Paciente
                key={listadoPacientes._id}
                listadoPacientes={ listadoPacientes }
              />
            ))}

        </>
      )
       : 
      ( 
        <>
        <h2 className="font-black text-3xl">No Hay Pacientes</h2>
          <p className="text-xl mt-5 mb-10 text-center">
            Comienza agregando pacientes {''}
            <span className="text-indigo-600 font-bold">y aparecerán en este lugar</span>
          </p>
        </>
      )}
    </>
  )
}

export default ListadoPacientes;