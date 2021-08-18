// import logo from './logo.svg';
// import './App.css';
import { useState, useEffect } from 'react';
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

  useEffect(getPublicaciones, []);

  function guardarUsuario(usuario) {
    localStorage.setItem("usuario", usuario);
  }

  function recordarUsuario() {
    let usuario = localStorage.getItem("usuario");
    // console.log(usuario);
    setUsuarioActivo(usuario);
  }
  useEffect(recordarUsuario, [])

  function olvidarUsuario() {
    localStorage.setItem("usuario", "")
  }
  // useEffect(() => {
  //   localStorage.getItem("usuario")

  // }, [])

  // useEffect(() => {
  //   localStorage.setItem({ "usuario": { usuarioActivo } })

  // }, [usuarioActivo])

  return (
    <div className="S-globalContainer">
      <Header setModalRegistro={() => { setModalRegistro(true) }} setModalInicioDeSesion={() => { setModalInicioDeSesion(true) }} usuario_activo={usuarioActivo} cerrarSesion={() => { olvidarUsuario(); setUsuarioActivo(null); setModalCrearPublicacion(null) }}></Header>

      {modalRegistro && <Registro modalRegistro={modalRegistro} quitarModal={() => { setModalRegistro(false) }}></Registro>}

      {modalInicioDeSesion && <InicioDeSesion modalInicioDeSesion={modalInicioDeSesion} quitarModal={() => { setModalInicioDeSesion(false) }} activarUsuario={(usuario) => { guardarUsuario(usuario); setUsuarioActivo(usuario) }}></InicioDeSesion>}

      <MainContainer usuario_activo={usuarioActivo} abrirModalPublicacion={() => { setModalCrearPublicacion(true) }} publicaciones={publicaciones}></MainContainer>

      {modalCrearPublicacion && <CrearPublicacion modalCrearPublicacion={modalCrearPublicacion} quitarModal={() => { setModalCrearPublicacion(false) }} usuario_activo={usuarioActivo} actualizarListado={getPublicaciones}></CrearPublicacion>}

    </div>
  );
}

export default App;
