import React, {Fragment, useState} from 'react';
import { v4 as uuid } from 'uuid';
import PropTypes from 'prop-types';

const Formulario = ({crearCita}) => {

    //Crear State de agenda
    const [cita,actualizarCita] = useState({
        dolarTarjetaArg: '',
        pesosMexicanos: '',
        producto: ''

    })

    const [ error , actualizarError ] = useState(false)


    //Funcion que se ejecuta cada vez que el usuario escribe en un input

    const actualizarState = e => {
        actualizarCita({
            ...cita,
            [e.target.name]: e.target.value
        })
    }

    //Extraer los valores
    const { dolarTarjetaArg,pesosMexicanos,producto} = cita
    
    //Cuando el usuario presiona envar formulario
    const submitCita = e => {
        e.preventDefault();

        //Validar

        if(dolarTarjetaArg.trim() === '' || pesosMexicanos.trim() === '' || producto.trim() === '' ){
            actualizarError(true);
            return
        }
        //Eliminar el mensaje previo
        actualizarError(false);

        //Asignar ID
        cita.id = uuid();
        
        //Crear cita
            crearCita(cita);

        //Reiniciar el form
        actualizarCita({
            dolarTarjetaArg: '',
            pesosMexicanos: '',
            producto: ''
        })
    }

    return ( 
        <Fragment>
            <h2>Cotizar</h2>

            { error ? <p className="alerta-error">Todos los campos son obligatorios</p> : null }

            <form
                onSubmit={submitCita}
            >
                <label>Dolar Tarjeta / Qatar / MEP / Blue (el que quieran) Argentina</label>
                <input
                    type="text"
                    name="dolarTarjetaArg"
                    className="u-full-width"
                    placeholder="Pesos Argentinos"
                    onChange={actualizarState}
                    value={dolarTarjetaArg}
                    
                />
                <label>Valor en pesos Colombianos</label>
                <input
                    type="text"
                    name="pesosMexicanos"
                    className="u-full-width"
                    placeholder="Pesos Colombianos"
                    onChange={actualizarState}
                    value={pesosMexicanos}
                    
                />
                
                <label>Productos</label>
                <textarea
                    className="u-full-width"
                    name="producto"
                    onChange={actualizarState}
                    value={producto}
                ></textarea>

                <button
                    type="submit"
                    className="u-full-width button-primary"
                >Calcular</button>
            </form>
        </Fragment>
     );
}

Formulario.propTypes = {
    crearCita: PropTypes.func.isRequired
}
 
export default Formulario;