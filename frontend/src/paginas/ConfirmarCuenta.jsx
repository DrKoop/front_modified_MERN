import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";

const ConfirmarCuenta = () => {
  //obteniendo los valores dinamicos de la url
  const params = useParams();
  //Extraccion , para poder mandar la data al backend
  const { id } = params;
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false);
  const [ cargando, setCargando ] = useState(true);
  const [alerta, setAlerta] = useState({});
  
  useEffect(()=> {
    const confirmarCuenta = async () => {
      try {
        const url = `/veterinarios/confirmar/${id}`;
        const { data } = await clienteAxios(url);
        setCuentaConfirmada(true);
        setAlerta({
          msg : data.msg
        });
      } catch (error) {
        setAlerta({
          msg : error.response.data.msg,
          error: true
        });
      }
      setCargando(false);
    }
    confirmarCuenta();
  },[]);

  return (
    <>
        {/* Titulo */}
        <div>
            <h1 className="text-indigo-600 font-black text-6xl">Confirma tu cuenta y empieza a Administrar {""}<span className="text-black">tus Pacientes</span></h1>
        </div>
        {/* /Titulo */}

        <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
            {!cargando &&
              <Alerta
              alerta={alerta}
              />
            }
            {cuentaConfirmada && (
              <Link
                className="block text-center my-5 text-gray-500"
              to="/">Iniciar Sesión</Link>
            )}
        </div>
    </>
  )
}

export default ConfirmarCuenta