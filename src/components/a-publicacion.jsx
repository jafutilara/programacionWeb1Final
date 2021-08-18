import React from 'react';


function Publicacion({ titulo, autor, fecha, contenido }) {
    return (
        <div className="columna S-publicacion">
            <div className="columna">
                <h4>{titulo}</h4>
                <p className="parrafo-2">{autor}</p>
                <p className="subtexto" >{fecha}</p>
            </div>
            <p className="parrafo-1">{contenido}</p>
            <div className="divisor"></div>
        </div>
    )
}
export default Publicacion;