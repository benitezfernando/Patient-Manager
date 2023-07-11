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

  // Obtener valores iniciales del localStorage o establecer valores predeterminados
  useEffect(() => {
    const initialDolarOficial = localStorage.getItem('dolarOficial');
    const initialDolarTurista = localStorage.getItem('dolarTurista');
    const initialDolarBlue = localStorage.getItem('dolarBlue');
    const initialDolarQatar = localStorage.getItem('dolarQatar');

    if (initialDolarOficial) {
      setDolarOficial(JSON.parse(initialDolarOficial));
    }
    if (initialDolarTurista) {
      setDolarTurista(JSON.parse(initialDolarTurista));
    }
    if (initialDolarBlue) {
      setDolarBlue(JSON.parse(initialDolarBlue));
    }
    if (initialDolarQatar) {
      setDolarQatar(JSON.parse(initialDolarQatar));
    }
  }, []);


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

    // Actualizar valores desde la API y guardar en el localStorage
    useEffect(() => {
      axios
        .get(`https://mercados.ambito.com//dolar/oficial/variacion`)
        .then((res) => {
          const ventaDolarOficial = res.data.venta;
          setDolarOficial(ventaDolarOficial);
          localStorage.setItem('dolarOficial', JSON.stringify(ventaDolarOficial));
        })
        .catch((error) => {
          console.log('Error al obtener el valor del Dólar Oficial:', error);
        });
    }, []);
  
    useEffect(() => {
      axios
        .get(`https://mercados.ambito.com//dolarturista/variacion`)
        .then((res) => {
          const ventaDolarTurista = res.data.venta;
          setDolarTurista(ventaDolarTurista);
          localStorage.setItem('dolarTurista', JSON.stringify(ventaDolarTurista));
        })
        .catch((error) => {
          console.log('Error al obtener el valor del Dólar Turista:', error);
        });
    }, []);
  
    useEffect(() => {
      axios
        .get(`https://mercados.ambito.com//dolar/informal/variacion`)
        .then((res) => {
          const ventaDolarBlue = res.data.venta;
          setDolarBlue(ventaDolarBlue);
          localStorage.setItem('dolarBlue', JSON.stringify(ventaDolarBlue));
        })
        .catch((error) => {
          console.log('Error al obtener el valor del Dólar Blue:', error);
        });
    }, []);
  
    useEffect(() => {
      axios
        .get(`https://mercados.ambito.com//dolarqatar/variacion`)
        .then((res) => {
          const ventaDolarQatar = res.data.venta;
          setDolarQatar(ventaDolarQatar);
          localStorage.setItem('dolarQatar', JSON.stringify(ventaDolarQatar));
        })
        .catch((error) => {
          console.log('Error al obtener el valor del Dólar Qatar:', error);
        });
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
