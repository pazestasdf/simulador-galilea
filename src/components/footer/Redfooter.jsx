import React from 'react';
import { ReactComponent as LogoGalilea } from '../../assets/images/footer/logo-blanco.svg';

const Redfooter = (props) => {
    return (
        <div className="footer">
            <div className="container">
                <div className="row">
                    <div className="col-md-6 my-auto sidebar text-left">
                        <div className="container">
                            <LogoGalilea className="img-footer"/>
                        </div>
                    </div>
                    <div className="col-md-6 py-4 sidebar text-right">
                        <div className="container">
                            <aside className="footer-menu-list">
                                <ul className="item-list">
                                    <li><a href={`${props.url}/nosotros`} className="item-list">Nosotros</a></li>
                                    <li><a href={`${props.url}/nuestros-proyectos`} className="item-list">Proyectos</a></li>
                                    <li><a href={`${props.url}/como-comprar`} className="item-list">¿Cómo Comprar?</a></li>
                                    <li><a href={`${props.url}/servicio-al-cliente`} className="item-list">Servicio al Cliente</a></li>
                                    <li><a href={`${props.url}/salas-de-ventas-y-pilotos`} className="item-list">Salas de Ventas y Pilotos</a></li>
                                    <li><a href={`${props.url}/postventa`} className="item-list">PostVenta</a></li>
                                    <li><a href={`${props.url}/postula-con-nosotros`} className="item-list">Postula al Subsidio</a></li>
                                    <li><a href={`${props.url}/simula-tu-credito`} className="item-list">Simula tu Crédito</a></li>
                                    <li><a href={`${props.url}/trabaja-con-nosotros`} className="item-list">Trabaja con Nosotros</a></li>
                                </ul>
                            </aside>
                            <aside className="copyright">
                                <p>GALILEA S.A. Todos los derechos reservados</p>
                            </aside>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Redfooter;