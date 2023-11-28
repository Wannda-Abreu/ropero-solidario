import React from 'react';
import './AccesoDenegado.css'; 

const AccesoDenegado: React.FC = () => {
  return (
    <div className="acceso-denegado-container">
      <h1 className="acceso-denegado-title">Acceso Denegado</h1>
      <p className="acceso-denegado-message">Vuelva a la página principal.</p>
    </div>
  );
};

export default AccesoDenegado;