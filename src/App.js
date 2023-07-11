import React, { Fragment, useState, useEffect } from "react";
import Formulario from "./components/Formulario";
import Cita from "./components/Cita";
import Cotizacion from "./components/Cotizacion"
import axios from "axios";

function App() {
  //Citas en local storage
  let citasIniciales = JSON.parse(localStorage.getItem("citas"));
  if (!citasIniciales) {
    citasIniciales = [];
  }

  const [dolarOficial, setDolarOficial] = useState([]);
  const [dolarTurista, setDolarTurista] = useState([]);
  const [dolarBlue, setDolarBlue] = useState([]);
  const [dolarQatar, setDolarQatar] = useState([]);


  //Arreglo de citas
  const [citas, guardarCitas] = useState(citasIniciales);


  

  //Use Effect para realizar ciertas operaciones cuando el state cambia
  useEffect(() => {
    let citasIniciales = JSON.parse(localStorage.getItem("citas"));

    if (citasIniciales) {
      localStorage.setItem("citas", JSON.stringify(citas));
    } else {
      localStorage.setItem("citas", JSON.stringify([]));
    }
  }, [citas]);

  useEffect(() => {
    axios
      .get(`https://mercados.ambito.com//dolar/oficial/variacion`)
      .then((res) => {
        setDolarOficial(res.data.venta);
      })
  }, []);

  useEffect(() => {
    axios
      .get(`https://mercados.ambito.com//dolarturista/variacion`)
      .then((res) => {
        setDolarTurista(res.data.venta);
      })
  }, []);

  useEffect(() => {
    axios
      .get(`https://mercados.ambito.com//dolar/informal/variacion`)
      .then((res) => {
        setDolarBlue(res.data.venta);
      })
  }, []);

  useEffect(() => {
    axios
      .get(`https://mercados.ambito.com//dolarqatar/variacion`)
      .then((res) => {
        setDolarQatar(res.data.venta);
      })
  }, []);

  //Funcion que tome las citas actuales y agregue la nueva.
  const crearCita = (cita) => {
    guardarCitas([...citas, cita]);
  };

  //Funcion que elimina una cita por su id
  const eliminarCita = (id) => {
    const nuevasCitas = citas.filter((cita) => cita.id !== id);
    guardarCitas(nuevasCitas);
  };

  //Mensaje condicional

  const titulo =
    citas.length === 0 ? "No hay calculos" : "Administra tus calculos";

  return (
    <Fragment>
      <div className="container">
        <h2>&#127958; Panama/Colombia &#127958;</h2>
        <div className="row">
          
          <div className="one-half column">
            <div className="cotizacion2">
              <Cotizacion producto="Oficial" precio={dolarOficial} />
              <Cotizacion producto="Blue" precio={dolarBlue} />
              <Cotizacion producto="Turista" precio={dolarTurista} />            
              <Cotizacion producto="Qatar" precio={dolarQatar} />
            </div>
            
            <Formulario crearCita={crearCita} />
          </div>
          <div className="one-half column">
            <h2>{titulo}</h2>
            {citas.map((cita) => (
              <Cita key={cita.id} cita={cita} eliminarCita={eliminarCita} />
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
