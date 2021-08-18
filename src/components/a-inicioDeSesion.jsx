// Aqui me toca usar los refimport React from 'react';
import x_icon from "../assets/x.svg";
import { baseDeDatos } from "../configFireBase";
import { useRef } from "react"


function InicioDeSesion({ modalInicioDeSesion, quitarModal, activarUsuario }) {

    const b_usuarioRef = useRef(null);
    const b_contrasenaRef = useRef(null);

    function vaciarCampos() {
        b_usuarioRef.current.value = "";
        b_contrasenaRef.current.value = "";
    }


    function iniciarSesion() {
        const cuenta = {
            usuario: b_usuarioRef.current.value,
            contrasena: b_contrasenaRef.current.value
        }
        let origen = []

        baseDeDatos.collection("usuarios").get().then(coleccion => {
            coleccion.forEach(documento => {
                origen.push(documento.data());
            })

            for (let datos of origen) {
                if (cuenta.usuario === datos.usuario && cuenta.contrasena === datos.contrasena) {
                    activarUsuario(cuenta.usuario);
                    window.alert(`Se ha iniciado sesión con ${cuenta.usuario}.`)
                    quitarModal();
                    break;
                } else if (origen.indexOf(datos) === origen.length - 1 && cuenta.usuario !== datos.usuario && cuenta.contrasena !== datos.contrasena) {
                    window.alert("Usuario y/o contraseña no coinciden.")
                }
            }
        });


        vaciarCampos();

    }

    // Render
    if (modalInicioDeSesion) {
        return (
            <div className="GS-modal--background">

                <div className="columna GS-modal">
                    <img className="icon GS-exitButton" src={x_icon} alt="Cerrar" onClick={() => { quitarModal() }} />
                    <h3>Bienvenido</h3>

                    <div className="columna GS-form">
                        <input className="input parragraph1" placeholder="Usuario:" type="text" ref={b_usuarioRef} />
                        <input className="input parragraph1" placeholder="Contraseña:" type="password" ref={b_contrasenaRef} />
                    </div>

                    <div className="fila GS-actions">
                        <button className="button-text button" onClick={() => { vaciarCampos(); quitarModal() }}>Cancelar</button>
                        <button className="button-text button" onClick={() => { iniciarSesion() }}>Iniciar Sesión</button>
                    </div>
                </div>

            </div>
        )
    }
    return;
}
export default InicioDeSesion;