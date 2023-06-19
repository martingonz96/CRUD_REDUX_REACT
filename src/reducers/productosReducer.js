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
    PRODUCTO_EDITAR_ERROR,
    PRODUCTO_EDITAR_EXITOSO
} from '../types'

//cada reducer tiene su propio state
const initialState = {
    productos: [],
    error: false,
    loading: false,
    productoeliminar: null,
    productoeditar: null
}

export default function(state = initialState, action) {
    switch(action.type) {
        case COMENZAR_DESCARGA_PRODUCTOS:
        case AGREGAR_PRODUCTO: 
        return {
            ...state,
            loading: action.payload
        }
        case AGREGAR_PRODUCTO_EXITO:
            return {
            ...state,
            loading:false,
            productos: [...state.productos, action.payload]
            }
        case DESCARGA_PRODUCTOS_ERROR:
        case AGREGAR_PRODUCTO_ERROR: 
        case PRODUCTO_ELIMINAR_ERROR:
        case PRODUCTO_EDITAR_ERROR:
        return {
            ...state,
            loading:false,
            error: action.payload
        }
        case DESCARGA_PRODUCTOS_EXITO: 
        return {
            ...state,
            loading:false,
            error:false,
            productos: action.payload
        }
        case OBTENER_PRODUCTOS_ELIMINAR:
            return {
                ...state,
                productoeliminar: action.payload
            }
        case PRODUCTO_ELIMINAR_EXITOSO: 
            return {
                ...state,
                productos : state.productos.filter(producto => producto.id !== state.productoeliminar),
                productoeliminar: null
            }
        case OBTENER_PRODUCTOS_EDITAR: 
        return {
            ...state,
            productoeditar: action.payload
        }
        case PRODUCTO_EDITAR_EXITOSO:
            return {
                ...state,
                productoeditar: null,
                productos: state.productos.map(
                    producto => producto.id === action.payload.id ? action.payload : producto
                )
            }

        default:
            return state;
    }
}