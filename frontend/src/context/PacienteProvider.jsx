import { createContext,useState,useEffect } from "react";
import clienteAxios from "../config/axios";
import useAuth from "../hooks/useAuth";

//Creando el context
const PacientesContext = createContext();

//Creando Provider, donde se propagaran los datos, atraves de otros componentes
const PacientesProvider = ({children}) => {

    const [ pacientes, setPacientes]= useState([]);
    const [ paciente, setPaciente] = useState({});
    const { auth } = useAuth();

    useEffect( () => {
        //Consultando API
        const obtenerPacientes = async () =>{

            const token = localStorage.getItem('token');
            if(!token) return

            const config = {
                headers: {
                    "Content-Type" : "application/json",
                    Authorization : `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios('/pacientes',config)


            data.sort((a, b) => {
                return new Date(b.createdAt) - new Date(a.createdAt);
            });
           setPacientes(data);
        }
        obtenerPacientes();
    },[auth]);


    const guardarPaciente = async (paciente) => {

        const token = localStorage.getItem('token');
    
        const config = {
            headers: {
                "Content-Type" : "application/json",
                Authorization : `Bearer ${token}`
            }
        }  

        if(paciente.id){
            try {
                const { data } = await clienteAxios.put(`/pacientes/${paciente.id}`, paciente, config);
                const pacientesActualidos = pacientes.map( pacienteState => pacienteState._id === data._id ? data : pacienteState); 
                setPacientes(pacientesActualidos);
            } catch (error) {
                console.log(error)
            }
        }else{
            try {
                const { data } = await clienteAxios.post('/pacientes',paciente, config);
    
                const { createdAt, updatedAt , __v, ...pacienteAlmacenado} = data;
                
                setPacientes([ pacienteAlmacenado, ...pacientes])
    
    
            } catch (error) {
                console.log(error.response.data.msg)
            }
        }


    }
    /* -------------------------------------------------------------------------- */
    /*                              EDICION PACIENTES                             */
    /* -------------------------------------------------------------------------- */
    const setEdicion = (listadoPacientes) =>{
        setPaciente(listadoPacientes)
    }

    const eliminarPaciente = async id =>{
        const confirmar = confirm('¿Confirmas que deseas eliminar?');

        if(confirmar){
            try {
                const token = localStorage.getItem('token');
    
                const config = {
                    headers: {
                        "Content-Type" : "application/json",
                        Authorization : `Bearer ${token}`
                    }
                }  
                const { data } = await clienteAxios.delete(`/pacientes/${id}`, config);
                const pacientesActualizado = pacientes.filter( pacientesState => pacientesState._id !== id);
                setPacientes(pacientesActualizado);
                console.log(data)
            } catch (error) {
                
            }
        }
    }

    return(
        //Se define a que context , vamos a proveer la informacion ** Requieren un prop OBLIGATORIO
        <PacientesContext.Provider
            value={{
                pacientes,
                guardarPaciente,
                setEdicion,
                paciente,
                eliminarPaciente
            }}
        >
            {children}
        </PacientesContext.Provider>
    )
}
export{
    PacientesProvider
}


export default PacientesContext;