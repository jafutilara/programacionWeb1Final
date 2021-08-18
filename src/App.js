// import logo from './logo.svg';
// import './App.css';
import { usRef, useState, useEffect, useRef } from 'react';
import { baseDeDatos } from "./configFireBase";
import Header from "./components/a-header";
import Registro from "./components/a-registro";
import InicioDeSesion from "./components/a-inicioDeSesion";
import MainContainer from "./components/a-mainContainer";
import CrearPublicacion from "./components/a-crearPublicacion";
import "./styles/Global.css";

function App() {
  const [modalRegistro, setModalRegistro] = useState(null);
  const [modalInicioDeSesion, setModalInicioDeSesion] = useState(null);
  const [modalCrearPublicacion, setModalCrearPublicacion] = useState(null);
  const [usuarioActivo, setUsuarioActivo] = useState(null);
  const [publicaciones, setPublicaciones] = useState([]);

  const bodyRef = useRef(null);

  function getPublicaciones() {
    const listado = [];
    baseDeDatos.collection("publicaciones")
      .orderBy("fecha", "asc").get().then(collection => {
        collection.forEach(document => {
          listado.push(document.data());
        })
        setPublicaciones(listado);
      })
  }

  function observadorDeModal(state) {
    if (state) {
      document.body.style.overflow = "hidden"
      // console.log("se abrió el modal registro");
    } else {
      document.body.style.overflow = "auto"
    }
  }

  function guardarUsuario(usuario) {
    localStorage.setItem("usuario", usuario);
  }

  function recordarUsuario() {
    let usuario = localStorage.getItem("usuario");
    // console.log(usuario);
    setUsuarioActivo(usuario);
  }

  function olvidarUsuario() {
    localStorage.setItem("usuario", "")
  }

  useEffect(() => {
    observadorDeModal(modalRegistro)
  }, [modalRegistro]);

  useEffect(() => {
    observadorDeModal(modalCrearPublicacion)
  }, [modalCrearPublicacion]);

  useEffect(() => {
    observadorDeModal(modalInicioDeSesion)
  }, [modalInicioDeSesion]);

  useEffect(getPublicaciones, []);

  useEffect(recordarUsuario, [])


  return (
    <div ref={bodyRef}>
      <Header setModalRegistro={() => { setModalRegistro(true) }} setModalInicioDeSesion={() => { setModalInicioDeSesion(true) }} usuario_activo={usuarioActivo} cerrarSesion={() => { olvidarUsuario(); setUsuarioActivo(null); setModalCrearPublicacion(null) }}></Header>
      {/* modal */}
      {modalRegistro && <Registro modalRegistro={modalRegistro} quitarModal={() => { setModalRegistro(false) }}></Registro>}

      {/* modal */}
      {modalInicioDeSesion && <InicioDeSesion modalInicioDeSesion={modalInicioDeSesion} quitarModal={() => { setModalInicioDeSesion(false) }} activarUsuario={(usuario) => { guardarUsuario(usuario); setUsuarioActivo(usuario) }}></InicioDeSesion>}

      <MainContainer usuario_activo={usuarioActivo} abrirModalPublicacion={() => { setModalCrearPublicacion(true) }} publicaciones={publicaciones}></MainContainer>

      {/* modal */}
      {modalCrearPublicacion && <CrearPublicacion modalCrearPublicacion={modalCrearPublicacion} quitarModal={() => { setModalCrearPublicacion(false) }} usuario_activo={usuarioActivo} actualizarListado={getPublicaciones}></CrearPublicacion>}

    </div>
  );
}

export default App;
