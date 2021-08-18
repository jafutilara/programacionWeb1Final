import React from 'react';
import registro from './a-registro';

function header({ usuario_activo, setModalRegistro, setModalInicioDeSesion, cerrarSesion }) {
    if (usuario_activo) {
        return (
            <div className="fila S-header">
                <h6>{usuario_activo}</h6>
                <h6 onClick={() => { cerrarSesion(); window.alert("Se ha cerrado sesión.") }}>Cerrar Sesión</h6>
            </div>
        )
    }
    return (
        <div className="fila S-header">
            <h6 onClick={() => { setModalRegistro() }}>Registrate</h6>
            <h6 onClick={() => setModalInicioDeSesion()}>Inicia Sesión</h6>
        </div>
    )
}
export default header;