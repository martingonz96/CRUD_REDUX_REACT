import { useSelector, useDispatch } from "react-redux"
import { editarProductoAction } from "../actions/productoActions"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

function ProductoEditar() {

   const navigate = useNavigate()

   const dispatch = useDispatch()

   const [productoEditar, setProductoEditar] = useState({
      nombre: '',
      precio: ''
   })


   //PRODUCTO A EDITAR

   const producto = useSelector(state => state.productos.productoeditar)

   useEffect(()=> {
      setProductoEditar(producto)
   }
   ,[producto])

   //Leer datos de formulario

   const onChangeFormulario = e => {
      setProductoEditar({
         ...productoEditar,
         [e.target.name]: e.target.value
      })
   }

   const submitEditarProducto = e => {
      e.preventDefault();

      dispatch(editarProductoAction(productoEditar));

      navigate('/')
   }

  return (
    <div className=' row justify-content-center'>
      <div className=' col-md-8'>
          <div className=' card'>
             <div className='card-body'>
                <h2 className=' text-center mb-4 font-weight-bold'>
                      Editar Producto
                </h2>

                <form
                onSubmit={submitEditarProducto}
                >
                    <div className=' form-group'>
                     <label>Nombre del producto</label>
                     <input
                     type='text'
                     className=' form-control'
                     placeholder='Nombre del producto'
                     name='nombre'
                     value={productoEditar.nombre}
                     onChange={onChangeFormulario}
                     />
                    </div>

                    <div className=' form-group'>
                     <label>Precio del producto</label>
                     <input
                     type='number'
                     className=' form-control'
                     placeholder='Precio del producto'
                     name='precio'
                     value={productoEditar.precio}
                     onChange={onChangeFormulario}
                     />
                    </div>

                    <button
                    type='submit'
                    className=' btn btn-primary font-weight-bold text-uppercase d-block w-100'
                    >Editar</button>
                </form>
             </div>
          </div>
      </div>
   </div>
  )
}

export default ProductoEditar