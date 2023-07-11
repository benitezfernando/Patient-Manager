import React from 'react';
import './Cotizacion.css'; // Importar archivo CSS para los estilos adicionales

const Cotizacion = ({ producto, precio }) => {
  return (
    <div className="cotizacion">
      <h4 className="producto">{producto}</h4>
      <p className="precio">${precio}</p>
    </div>
  );
};

export default Cotizacion;
