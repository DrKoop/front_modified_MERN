import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Header = () => {
    const { cerrarSesion } = useAuth() 
  return (
    <header className="py-10 bg-indigo-600">
        <div className="container flex-col lg:flex-row mx-auto flex justify-between items-center">
            <h1 className="font-bold text-2xl text-indigo-200 text-center">Administrador de Pacientes</h1>
            <nav className="flex gap-4 flex-col items-center lg:flex-row mt-5 lg:mt-0">
            <Link to="/admin" className="text-white font-bold text-sm uppercase" >Pacientes</Link>
            <Link to="/admin/perfil" className="text-white font-bold text-sm uppercase" >Perfil</Link>
            <button
             type="button"
             className="text-white font-bold text-sm uppercase"
             onClick={cerrarSesion}
             >Cerrar Cesión</button>
            </nav>
        </div>
    </header>
  )
}

export default Header