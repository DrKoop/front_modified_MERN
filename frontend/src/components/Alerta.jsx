

const Alerta = ({alerta}) => {
  return (
    <div
    className={`${alerta.error ? 'from-red-400 to-red-400' : 'from-indigo-400 to-indigo-600'} bg-gradient-to-r text-center p-3 rounded-xl uppercase text-white mb-10 font-bold text-sm`}
    >{alerta.msg}</div>
  )
}

export default Alerta;