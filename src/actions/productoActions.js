import Swal from 'sweetalert2';
import clienteAxios from '../config/axios';

import {
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_EXITO,
    AGREGAR_PRODUCTO_ERROR,
    COMENZAR_DESCARGA_PRODUCTOS,
    DESCARGA_PRODUCTOS_EXITO,
    DESCARGA_PRODUCTOS_ERROR,
    OBTENER_PRODUCTOS_ELIMINAR,
    PRODUCTO_ELIMINAR_EXITOSO,
    PRODUCTO_ELIMINAR_ERROR,
    OBTENER_PRODUCTOS_EDITAR,
    COMENZAR_EDICION_PRODUCTO,
    PRODUCTO_EDITAR_ERROR,
    PRODUCTO_EDITAR_EXITOSO
} from '../types'


//Crear nuevos productos

export function crearNuevoProductoAction(producto) {
    return async (dispatch) => {
        dispatch( agregarProducto());

        try {
            //Insertar producto en API
           await clienteAxios.post('/productos', producto)
            //Si hay exito , actualizar state
            dispatch( agregarProductoExito(producto) )

            //Alerta
            Swal.fire(
                'Correcto',
                'Producto Agregado',
                'success'
            )
        } catch (error) {
            //Si hay error, cambiar state
            console.log(error)
            dispatch( agregarProductoError(true) )
            //alerta error
            Swal.fire({
                icon: 'error',
                title: 'Hubo un error',
                text: 'Hubo un error, intenta de nuevo'
            })
        }
    }
}

const agregarProducto = () => ({
    type: AGREGAR_PRODUCTO,
    payload: true
})

//Producto exitoso
const agregarProductoExito = producto => ({
    type: AGREGAR_PRODUCTO_EXITO,
    payload: producto
})

//Error
const agregarProductoError = estado => ({
    type: AGREGAR_PRODUCTO_ERROR,
    payload: estado
})


/// funcion para descargar productos de bd

export function obtenerProductosAction () {
    return async (dispatch) => {
        dispatch ( descargarProductos ());

        try {
           const respuesta = await clienteAxios('/productos')
           const { data } = respuesta
           dispatch( descargaProductosExitosa(data))
        } catch (error) {
            console.log(error)
            dispatch (descargaProductosError())
        }
    }
}

const descargarProductos = ()=> ({
    type: COMENZAR_DESCARGA_PRODUCTOS,
    payload: true
})

const descargaProductosExitosa = productos => ({
    type: DESCARGA_PRODUCTOS_EXITO,
    payload: productos
})

const descargaProductosError = () => ({
    type: DESCARGA_PRODUCTOS_ERROR,
    payload: true
})

//Selecciona y elimina producto
export function borrarProductAction(id) {
    return async (dispatch) => {
        dispatch (obtenerProductoEliminar(id))
        
        try {
            await clienteAxios.delete(`/productos/${id}`)
            dispatch( eliminarProductoExito() );
            //Si se elimina, mostrar alerta

            Swal.fire(
                'Eliminado!',
                'Tu producto se ha eliminado',
                'success'
              )

        } catch (error) {
            console.log(error)
            dispatch ( eliminarProductoError() )
        }
    }
}

const obtenerProductoEliminar = (id)=> ({
    type: OBTENER_PRODUCTOS_ELIMINAR,
    payload: id
})

const eliminarProductoExito = ()=> ({
    type: PRODUCTO_ELIMINAR_EXITOSO
})

const eliminarProductoError = ()=> ({
    type: PRODUCTO_ELIMINAR_ERROR,
    payload: true
})

//Colocar producto en edicion
export function obtenerProductoEditar(producto) {
    return (dispatch)=> {
        dispatch ( obtenerProductoEditarAction(producto) )
    }
}

const obtenerProductoEditarAction = producto => ({
    type: OBTENER_PRODUCTOS_EDITAR,
    payload: producto
})

//Editar un regitro en la api
export function editarProductoAction (producto) {
    return async (dispatch)=> {
         dispatch ( editarProducto() )

         try {
           await clienteAxios.put(`/productos/${producto.id}`, producto)
           
           dispatch ( editarProductoExito (producto) )
         } catch (error) {
            dispatch ( editarProductoError() )
         }
    }
}

const editarProducto = () => ({
      type: COMENZAR_EDICION_PRODUCTO
})

const editarProductoExito = producto => ({
    type: PRODUCTO_EDITAR_EXITOSO,
    payload: producto
})

const editarProductoError = () => ({
    type: PRODUCTO_ELIMINAR_ERROR,
    payload: true
})

