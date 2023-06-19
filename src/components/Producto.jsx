import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { borrarProductAction, obtenerProductoEditar } from "../actions/productoActions"
import Swal from "sweetalert2";

//REDUX


function Producto({producto}) {

    const navigate = useNavigate()

    const dispatch = useDispatch();

    // CONFIRMAR SI DESEA ELIMINAR

    const confirmarEliminarProducto = id => {
         //preguntar
         Swal.fire({
            title: 'Estas seguro?',
            text: "No se puede revertir!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminalo',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result.isConfirmed) {
                //Pasar al action
                dispatch( borrarProductAction(id))
            }
          })
         
    }

    /// Redireccionar a editar producto

    const redireccionarEdicion = producto => {
        dispatch ( obtenerProductoEditar(producto))
        navigate(`/productos/editar/${producto.id}`)
    }

const { nombre, precio, id } = producto

  return (
    <tr>
        <td>{nombre}</td>
        <td><span className=" font-weight-bold">$</span>{precio}</td>
        <td className="acciones">
        <button 
        type="button" 
        className=" btn btn-primary mr-2"
        onClick={()=> redireccionarEdicion(producto)}
        >Editar</button>
        <button
        type="button"
        className=" btn btn-danger"
        onClick={()=> confirmarEliminarProducto(id)}
        >
            Eliminar
        </button>
        </td>
    </tr>
  )
}

export default Producto