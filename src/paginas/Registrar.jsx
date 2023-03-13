import { Link } from "react-router-dom";
import { useState } from "react";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";

const Registrar = () => {
  
  const [nombre, setNombre ] = useState('')
  const [email, setEmail ] = useState('')
  const [password, setPassword ] = useState('')
  const [repetirpassword, setRepetirPassword ] = useState('')
  const [ alerta, setAlerta] = useState({})

  const handleSubmit =  async e =>{

    e.preventDefault();

    if([nombre, email, password, repetirpassword].includes('')){
      setAlerta({ msg : 'Hay campos vacíos', error : true})
      return
    }
    if( password !== repetirpassword){
      setAlerta({ msg : 'Los Password no son iguales', error : true})
      return
    }
    if( password.length < 6){
      setAlerta({ msg : 'El Password debe contener almenos 6 caracteres.', error : true})
      return
    }
    setAlerta({})

    //Creando el usuario en la api
    try {
      const { data } = await clienteAxios.post('/veterinarios/', {nombre,email,password});
      setAlerta({
        msg: 'Usuario Creado Correctamente revisa Tu Correo Electronico.',
        error: false
      });
    } catch (error) {
      setAlerta({
        msg : error.response.data.msg,
        error: true
      });
    }

    
  }

  const { msg } = alerta;

  return (
    <>
        {/* Titulo */}
        <div>
            <h1 className="text-indigo-600 font-black text-6xl">Crea tu cuenta y Administra {""}<span className="text-black">tus Pacientes</span></h1>
        </div>
        {/* /Titulo */}

        <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
            { msg && 
              <Alerta
              alerta = {alerta}
              />
            }
            <form 
              onSubmit={ handleSubmit }
            >
            <div className="my-5">
                    <label htmlFor="" className="uppercase block text-gray-600 text-xl font-bold">
                        Nombre
                    </label>
                    <input
                    className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                    type="text"
                    placeholder="Tu Nombre"
                    value={nombre}
                    onChange={ e => setNombre(e.target.value)
                    }
                    />
                </div>
                <div className="my-5">
                    <label htmlFor="" className="uppercase block text-gray-600 text-xl font-bold">
                        Email
                    </label>
                    <input
                    className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                    type="email"
                    placeholder="Email de Registro"
                    value={email}
                    onChange={ e => setEmail(e.target.value)}
                    />
                </div>
                <div className="my-5">
                    <label htmlFor="" className="uppercase block text-gray-600 text-xl font-bold">
                        Password
                    </label>
                    <input
                    className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                    type="password"
                    placeholder="Ingresa Tu Password"
                    value={password}
                    onChange={ e => setPassword(e.target.value)}
                    />
                </div>
                <div className="my-5">
                    <label htmlFor="" className="uppercase block text-gray-600 text-xl font-bold">
                        Repite Tu Password
                    </label>
                    <input
                    className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                    type="password"
                    placeholder="Repite Tu Password"
                    value={repetirpassword}
                    onChange={ e => setRepetirPassword(e.target.value)}
                    />
                </div>
                {/* Boton */}
                <input
                    className="bg-indigo-500 w-full py-3 px-10 mt-5 rounded-xl text-white uppercase font-bold hover:bg-indigo-800 hover:cursor-pointer md:w-auto"
                    type="submit"
                    value="Crear Cuenta"
                />
                {/* //Boton */}
              </form>
            {/* Navegacion */}
            <nav className="mt-10 lg:flex lg:justify-between">
                <Link
                    className="block text-center my-5 text-gray-500"
                    to="/">Ya tienes una cuenta? Inicia Sesión</Link>
                <Link
                    className="block text-center my-5 text-gray-500" 
                    to="/olvide-password">Olvide mi Password</Link>
            </nav>
            {/* /Navegacion */}
        </div>
    </>
  )
}

export default Registrar