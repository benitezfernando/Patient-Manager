import React from 'react';
import PropTypes from 'prop-types';

const Cita = ({cita, eliminarCita}) =>  ( 
    <div className="cita">
    <p>Producto: <span>{cita.producto}</span></p>
        <p>Precio en USD: <span>{cita.pesosMexicanos*0.050}</span></p>
        <p>Precio en MEX: <span>{cita.pesosMexicanos}</span></p>
        <p>Precio en ARG: <span>{(cita.pesosMexicanos*0.05)*cita.dolarTarjetaArg}</span></p>


        <button
            className="button eliminar u-full-width"
            onClick= { () => eliminarCita(cita.id)}
        >Eliminar &times;</button>
    </div>
 );

Cita.propTypes = {
    cita: PropTypes.object.isRequired,
    eliminarCita: PropTypes.func.isRequired
}
 
export default Cita;