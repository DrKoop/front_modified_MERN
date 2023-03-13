import { useState } from "react";
import { Link } from "react-router-dom";
import  Alerta from '../components/Alerta';
import clienteAxios  from '../config/axios';

const OlvidePassword = () => {

    const [ email, setEmail] = useState('');
    const [ alerta, setAlerta] = useState({});

    const handleSubmit = async e => {
        e.preventDefault();

        if( email === '' || email.length < 6){
            setAlerta({ msg : 'El Email es obligatorio..', error: true})
            return
        }

        try {
            const { data } = await clienteAxios.post('/veterinarios/olvide-password', { email });
            console.log(data)
            setAlerta({ msg : data.msg })
        } catch (error) {
            setAlerta({
                msg : error.response.data.msg,
                error : true
            })
        }
    }

    const { msg } = alerta

  return (
    <>
        {/* Titulo */}
        <div>
            <h1 className="text-indigo-600 font-black text-6xl">Recupera Tu Acceso y no Pierdas {""}<span className="text-black">tus Pacientes</span></h1>
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
                        Email
                    </label>
                    <input
                    className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                    type="email"
                    placeholder="Email de Registro"
                    value={email}
                    onChange={ e=>setEmail(e.target.value) }
                    />
                </div>
                {/* Boton */}
                <input
                    className="bg-indigo-500 w-full py-3 px-10 mt-5 rounded-xl text-white uppercase font-bold hover:bg-indigo-800 hover:cursor-pointer md:w-auto"
                    type="submit"
                    placeholder="Reestablecer Password"
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
                    to="/registrar">No tienes una cuenta? Registrate</Link>
            </nav>
            {/* /Navegacion */}
        </div>
    </>
  )
};

export default OlvidePassword