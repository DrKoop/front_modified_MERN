import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";

const Login = () => {
    const [ email,    setEmail] = useState('');
    const [ password, setPassword] = useState('');
    const [ alerta,   setAlerta] = useState({})
    const { setAuth } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async e => {
        e.preventDefault();
        if([ email, password].includes('')){
            setAlerta({
                msg: 'Todos los campos son Obligatorios.',
                error: true
            });
            return;
        }

        try {
            const { data } =  await clienteAxios.post('/veterinarios/login',{ email, password})
            localStorage.setItem('token', data.token)
            console.log(data)
            setAuth(data)
            navigate('/admin')
        } catch (error) {
            setAlerta({
                msg : error.response.data.msg,
                error: true
            })
        }
    }

    const { msg} = alerta
  return (
    <>
        {/* Titulo */}
        <div>
            <h1 className="text-indigo-600 font-black text-6xl">Inicia Sesión y Administra Tus {""}<span className="text-black">Pacientes</span></h1>
        </div>
        {/* /Titulo */}
        <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
             { msg &&<Alerta
                alerta={alerta}
              /> 
             }
            <form onSubmit={ handleSubmit }>
                <div className="my-5">
                    <label htmlFor="" className="uppercase block text-gray-600 text-xl font-bold">
                        Email
                    </label>
                    <input
                    className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                    type="email"
                    placeholder="Email de Registro"
                    value={ email }
                    onChange = { e => setEmail(e.target.value)}
                    />
                </div>

                <div className="my-5">
                    <label htmlFor="" className="uppercase block text-gray-600 text-xl font-bold">
                        Password
                    </label>
                    <input
                    className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                    type="password"
                    placeholder="Ingresa el Password"
                    value={ password }
                    onChange = { e => setPassword(e.target.value)}
                    />
                </div>
                {/* Boton */}
                <input
                className="bg-indigo-500 w-full py-3 px-10 mt-5 rounded-xl text-white uppercase font-bold hover:bg-indigo-800 hover:cursor-pointer md:w-auto"
                    type="submit"
                    value="iniciar Sesión"
                />
                {/* //Boton */}
            </form>
            {/* Navegacion */}
            <nav className="mt-10 lg:flex lg:justify-between">
                <Link
                    className="block text-center my-5 text-gray-500"
                    to="/registrar">No tienes una cuenta? Registrate</Link>
                <Link
                    className="block text-center my-5 text-gray-500" 
                    to="/olvide-password">Olvide mi Password</Link>
            </nav>
            {/* /Navegacion */}
        </div>
    </>
  )
}

export default Login