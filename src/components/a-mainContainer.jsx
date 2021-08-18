import React, { useEffect } from 'react';
import icon_plus from "../assets/plus.svg"
import Publicacion from "./a-publicacion";
function MainContainer({ usuario_activo, abrirModalPublicacion, publicaciones }) {

    return (
        <main className="columna S-mainContainer">
            <h3>Publicaciones Recientes</h3>
            {usuario_activo && <button className="button__circular S-mainContainer--button" onClick={() => { abrirModalPublicacion() }}><img className="icon" src={icon_plus} alt="Crear Publicación" /></button>}
            <div>
                {
                    publicaciones && publicaciones.slice().reverse().map((datos, indice) => {
                        const { titulo, autor, fecha, contenido } = datos;
                        return (<Publicacion key={indice} titulo={titulo} autor={autor} fecha={fecha} contenido={contenido}></Publicacion>)
                    })
                }
            </div>
        </main >
    )
}
export default MainContainer;