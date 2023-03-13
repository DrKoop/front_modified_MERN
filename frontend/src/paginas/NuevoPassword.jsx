import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";

const NuevoPassword = () => {
  const [ password, setPassword ] = useState('');
  const [ alerta, setAlerta ] = useState({});
  const [ tokenValido, setTokenValido] = useState(false)
  const [ passwordModificado ,setPasswordModificado] = useState(false);
  const params = useParams();
  const { token } = params;

  useEffect( () =>{
    const comprobarToken = async () => {
      try {
        await clienteAxios(`veterinarios/olvide-password/${token}`);
        setAlerta({
          msg : 'Coloca tu Nuevo Password'
        })
        setTokenValido(true)
      } catch (error) {

        setAlerta({
          msg: 'Ocurrio un error con el enlace',
          error: true
        });
      }
    }
    comprobarToken();
  },[]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if( password.length < 6 ){
      setAlerta({
        msg : 'El Password debe contener almenos 6 caracteres.',
        error : true
      })
      return
    }
    try {
      const url = `/veterinarios/olvide-password/${token}`;
      const { data } = await clienteAxios.post(url , { password });

      setAlerta({
        msg : data.msg
      })

      setPasswordModificado(true)
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }
  }

  const { msg } = alerta

  return (
    <>
        {/* Titulo */}
        <div>
            <h1 className="text-indigo-600 font-black text-6xl">Resstablece tu Password y no Pierdas Acceso a {""}<span className="text-black">tus Pacientes</span></h1>
        </div>
        {/* /Titulo */}
        <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
                { msg && 
                  <Alerta
                  alerta = {alerta}
                  />
                }
                {tokenValido && (
                  <>
                    <form onSubmit= { handleSubmit }>
                        <div className="my-5">
                                  <label htmlFor="" className="uppercase block text-gray-600 text-xl font-bold">
                                      Nuevo Password
                                  </label>
                                  <input
                                  className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                                  type="password"
                                  placeholder="Ingresa Tu Nuevo Password"
                                  value={password}
                                  onChange={ e => setPassword(e.target.value)}
                                  />
                        </div>
                        {/* Boton */}
                        <input
                            className="bg-indigo-500 w-full py-3 px-10 mt-5 rounded-xl text-white uppercase font-bold hover:bg-indigo-800 hover:cursor-pointer md:w-auto"
                            type="submit"
                            value="Guardar nuevo Password"
                        />
                        {/* //Boton */}
                    </form>
                  </>
                )}
                { passwordModificado && 
                    <Link
                    className="block text-center my-5 text-gray-500"
                    to="/">Ya tienes una cuenta? Inicia Sesión</Link>
                }
        </div>
    </>
  )
}

export default NuevoPassword