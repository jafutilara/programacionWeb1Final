// Aqui me toca usar los refimport React from 'react';
import x_icon from "../assets/x.svg";
import { useRef } from "react"
import { baseDeDatos } from "../configFireBase";

function Registro({ modalRegistro, quitarModal }) {

    const a_nombreRef = useRef(null);
    const a_apellidoRef = useRef(null);
    const a_usuarioRef = useRef(null);
    const a_contrasenaRef = useRef(null);
    const a_confirmarContrasenaRef = useRef(null);

    function crearCuenta() {
        const nombre = a_nombreRef.current.value;
        const apellido = a_apellidoRef.current.value;
        const usuario = a_usuarioRef.current.value;
        const contrasena = a_contrasenaRef.current.value;
        const confirmarContrasena = a_confirmarContrasenaRef.current.value;

        const cuenta = {
            nombre, apellido, usuario, contrasena
        }

        if (nombre === "" && apellido === "" && usuario === "" && contrasena === "" && confirmarContrasena === "") {
            window.alert("No puede dejar nín campo vacio.")
        } else if (contrasena !== confirmarContrasena) {
            window.alert("Las contraseñas no coinciden.");
        } else if (contrasena === confirmarContrasena && nombre !== "" && apellido !== "" && usuario !== "" && contrasena !== "") {
            baseDeDatos.collection("usuarios").add(cuenta);
            window.alert("Ya puedes iniciar sesión.");
            vaciarCampos();
            quitarModal();
        }


    }

    function vaciarCampos() {
        a_nombreRef.current.value = "";
        a_apellidoRef.current.value = "";
        a_usuarioRef.current.value = "";
        a_contrasenaRef.current.value = "";
        a_confirmarContrasenaRef.current.value = "";
    }

    // Render
    if ({ modalRegistro }) {

        return (
            <div className="GS-modal--background">

                <div className="columna GS-modal">
                    <img className="icon GS-exitButton" src={x_icon} alt="Cerrar" onClick={() => { quitarModal() }} />
                    <h3>Crea tu Cuenta</h3>

                    <div className="columna GS-form">
                        <input className="input parragraph1" placeholder="Nombre:" type="text" ref={a_nombreRef} />
                        <input className="input parragraph1" placeholder="Apellido:" type="text" ref={a_apellidoRef} />
                        <input className="input parragraph1" placeholder="Usuario:" type="text" ref={a_usuarioRef} />
                        <input className="input parragraph1" placeholder="Contraseña:" type="text" ref={a_contrasenaRef} />
                        <input className="input parragraph1" placeholder="Confirmar Contraseña:" type="text" ref={a_confirmarContrasenaRef} />
                    </div>

                    <div className="fila GS-actions">
                        <button className="button-text button" onClick={() => { vaciarCampos(); quitarModal() }}>Cancelar</button>
                        <button className="button-text button" onClick={() => { crearCuenta() }}>Crear Cuenta</button>
                    </div>
                </div>

            </div>
        )
    }
    return;
}
export default Registro;