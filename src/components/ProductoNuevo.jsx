
import { useDispatch, useSelector } from "react-redux"

//Actions de REDUX
import { crearNuevoProductoAction } from "../actions/productoActions"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { mostrarAlerta, ocultarAlertaAction } from "../actions/alertaActions";


function ProductoNuevo() {

   const navigate = useNavigate()

   //state del componente

   const [nombre , setNombre]= useState('')

   const [precio, setPrecio] = useState(0)

   //utilizar useDispatch
   const dispatch = useDispatch();

   //Acceder al state del store
   const cargando = useSelector(state=> state.productos.loading)

   const error = useSelector(state => state.productos.error)

   const alerta = useSelector(state => state.alerta.alerta)


   //mandar a llamar el action de producto action
   const agregarProducto = producto => dispatch ( crearNuevoProductoAction(producto) )


   //Cuando usuario haga submit

   const submitNuevoProducto = e => {
      e.preventDefault()

      //validar Formulario
      if(nombre === '' || precio <= 0){
        const alerta = {
         msg: 'Todos los campos son obligatorios',
         classes: 'alert alert-danger text-center text-uppercase p3'
        }
        //Ver errores
        dispatch( mostrarAlerta(alerta) )
        return
      }

      //No hay errores
      dispatch( ocultarAlertaAction() )
      

      //crear producto
      agregarProducto({
         nombre,
         precio
      });

      //redireccionar
      setTimeout(() => {
         navigate('/')  // <- Aqui, yo le puse un time out para que me lo regresara despues de 1 segundo
       }, 1500);
   }
  return (
   <div className=' row justify-content-center'>
      <div className=' col-md-8'>
          <div className=' card'>
             <div className='card-body'>
                <h2 className=' text-center mb-4 font-weight-bold'>
                      Agregar Nuevo Producto
                </h2>

                {alerta ? <p className={alerta.classes}>{alerta.msg}</p> : null}

                <form
                onSubmit={submitNuevoProducto}
                >
                    <div className=' form-group'>
                     <label>Nombre del producto</label>
                     <input
                     type='text'
                     className=' form-control'
                     placeholder='Nombre del producto'
                     name='nombre'
                     value={nombre}
                     onChange={e => setNombre(e.target.value)}
                     />
                    </div>

                    <div className=' form-group'>
                     <label>Precio del producto</label>
                     <input
                     type='number'
                     className=' form-control'
                     placeholder='Precio del producto'
                     name='precio'
                     value={precio}
                     onChange={e => setPrecio(Number(e.target.value))}
                     />
                    </div>

                    <button
                    type='submit'
                    className=' btn btn-primary font-weight-bold text-uppercase d-block w-100'
                    >Agregar</button>
                </form>

                {cargando ? 'Cargando...' : null}
                {error ? <p className=" alert alert-danger p2 mt-4 text-center">Hubo un error</p> : null}
             </div>
          </div>
      </div>
   </div>
  )
}

export default ProductoNuevo