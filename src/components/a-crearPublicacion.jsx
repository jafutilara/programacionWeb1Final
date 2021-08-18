// Aqui me toca usar los refimport React from 'react';
import x_icon from "../assets/x.svg";
import { useRef } from "react";
import { baseDeDatos } from "../configFireBase";



function CrearPublicacion({ modalCrearPublicacion, quitarModal, usuario_activo, actualizarListado }) {

    const tituloRef = useRef(null);
    const contenidoRef = useRef(null);

    function vaciarCampos() {
        tituloRef.current.value = "";
        contenidoRef.current.value = "";
    };

    function enviarPublicacion() {
        const titulo = tituloRef.current.value;
        const autor = usuario_activo;
        const now = (new Date).toLocaleString("en-US");
        const contenido = contenidoRef.current.value;

        const publicacion = {
            titulo,
            autor,
            fecha: now,
            contenido
        }
        baseDeDatos.collection("publicaciones").add(publicacion);
        vaciarCampos();
        quitarModal();
    }

    if (modalCrearPublicacion) {
        return (
            <div className="GS-modal--background">

                <div className="columna GS-modal">
                    <img className="icon GS-exitButton" src={x_icon} alt="Cerrar" onClick={() => { quitarModal() }} />
                    <h3>Que quieres compartir?</h3>

                    <div className="columna GS-form">
                        <input className="input parragraph1" placeholder="Titulo:" type="text" ref={tituloRef} />
                        <textarea className="input parragraph1" placeholder="Contenido:" cols="30" rows="10" ref={contenidoRef}></textarea>
                    </div>

                    <div className="fila GS-actions">
                        {/* Debo agregarle la funcionalidad a estos botones */}
                        <button className="button-text button" onClick={() => { vaciarCampos(); quitarModal(); }}>Cancelar</button>
                        <button className="button-text button" onClick={() => { enviarPublicacion(); actualizarListado() }}>Publicar</button>
                    </div>
                </div>

            </div>
        )
    }
    return;
}
export default CrearPublicacion;