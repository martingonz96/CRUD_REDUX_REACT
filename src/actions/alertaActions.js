import { MOSTRAR_ALERTA, OCULTAR_ALERTA } from "../types";

export function mostrarAlerta(alerta) {
    return (dispatch)=> {
       dispatch( crearError(alerta) )
    }
}

const crearError = alerta => ({
    type: MOSTRAR_ALERTA,
    payload: alerta
})

export function ocultarAlertaAction() {
    return (dispatch)=> {
       dispatch( ocultarError() )
    }
}

const ocultarError = () => ({
    type: OCULTAR_ALERTA,
    payload: null
})
