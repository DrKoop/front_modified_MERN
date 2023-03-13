import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import clienteAxios from "../config/axios";

const AuthContext = createContext();

const AuthProvider = ({children}) => {
    
    //Evitando falsos positivos al iniciar sesion en los endpoints privados
    const [ cargando, setCargando ] = useState(true);

    const [auth, setAuth] = useState({});

    const navigate = useNavigate();

    useEffect(()=>{
        const autenticarUsuario = async () => {
            //Accediendo al token almacenado en el localstorage
            const token = localStorage.getItem('token')
            if(!token){
                setCargando(false)
                return
            }

            const config = {
                headers : {
                    "Content-Type" : "application/json",
                    Authorization : `Bearer ${token}`
                }
            }

            try {
                const  {data}  = await clienteAxios('veterinarios/perfil', config)
                setAuth(data)
                navigate('/admin')
            } catch (error) {
                console.log(error.response.data.msg)
                setAuth({})
            }
            setCargando(false)

        }
        autenticarUsuario();
    },[])

    const cerrarSesion = () => {
        localStorage.removeItem('token')
        setAuth({})
    }

    const actualizarPerfil = async datos => {

        const token = localStorage.getItem('token')
        if(!token){
            setCargando(false)
            return
        }

        const config = {
            headers : {
                "Content-Type" : "application/json",
                Authorization : `Bearer ${token}`
            }
        }

        try {
            const url = `/veterinarios/perfil/${datos._id}`;
            const  data  = await clienteAxios.put(url,datos,config)
            console.log(data)
            return{
                msg : 'Alemacenado Correctamente'
            }
        } catch (error) {
            return { 
                msg : error.response.data.msg,
                error : true
            }
            //console.log(error.response.data.msg)
        }
    }


    const guardarPassword = async (datos) => {
        const token = localStorage.getItem('token')
        if(!token){
            setCargando(false)
            return
        }

        const config = {
            headers : {
                "Content-Type" : "application/json",
                Authorization : `Bearer ${token}`
            }
        }

        try {
            const url = '/veterinarios/actualizar-password'
            //const { data } = await clienteAxios.put(url, datos, config)
            const data = await clienteAxios.put(url, datos, config) 
            console.log(data)
            return {
                msg : data.msg
            }

        } catch (error) {
            return { 
                msg : error.response.data.msg,
                error : true
            }
        }
    }



    return(
        <AuthContext.Provider
            value={{
               auth,
               setAuth,
               cargando,
               cerrarSesion,
               actualizarPerfil,
               guardarPassword
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthProvider
}

export default AuthContext;
