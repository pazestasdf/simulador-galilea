import React from 'react';
import { ReactComponent as Chevron } from '../../assets/images/composites/chevron-right.svg';


const Prefooter = (props) => {
    return (

        <div className="container pre-footer">
            <h2 className="proyects">PROYECTOS EN VENTA</h2>
            <div className="container proyectos">
                <div className="row row-cols-2">
                    <div className="col-md-3 col-sm-6">
                        <ul className="proyects-list">
                            <li><Chevron className="composite-red"/><a className="proyects-list" href={`${props.url}/localidad/valparaiso/`}>Valparaiso</a></li>
                            <li><Chevron className="composite-red"/><a className="proyects-list" href={`${props.url}/localidad/limache/`}>Limache</a></li>
                            <li><Chevron className="composite-red"/><a className="proyects-list" href={`${props.url}/localidad/quilpue/`}>Quilpué</a></li>
                            <li><Chevron className="composite-red"/><a className="proyects-list" href={`${props.url}/localidad/los-andes/`}>Los Andes</a></li>
                            <li><Chevron className="composite-red"/><a className="proyects-list" href={`${props.url}/localidad/chicureo/`}>Chicureo</a></li>
                        </ul>
                    </div>
                    <div className="col-md-3 col-sm-6">
                        <ul className="proyects-list">
                            <li><Chevron className="composite-red"/><a className="proyects-list" href={`${props.url}/localidad/buin/`}>Buin</a></li>
                            <li><Chevron className="composite-red"/><a className="proyects-list" href={`${props.url}/localidad/rancagua/`}>Rancagua</a></li>
                            <li><Chevron className="composite-red"/><a className="proyects-list" href={`${props.url}/localidad/machali/`}>Machalí</a></li>
                            <li><Chevron className="composite-red"/><a className="proyects-list" href={`${props.url}/localidad/rengo/`}>Rengo</a></li>
                            <li><Chevron className="composite-red"/><a className="proyects-list" href={`${props.url}/localidad/curico/`}>Curicó</a></li>
                        </ul>
                    </div>
                    <div className="col-md-3 col-sm-6">
                        <ul className="proyects-list">
                            <li><Chevron className="composite-red"/><a className="proyects-list" href={`${props.url}/localidad/talca/`}>Talca</a></li>
                            <li><Chevron className="composite-red"/><a className="proyects-list" href={`${props.url}/localidad/linares/`}>Linares</a></li>
                            <li><Chevron className="composite-red"/><a className="proyects-list" href={`${props.url}/localidad/san-carlos/`}>San Carlos</a></li>
                            <li><Chevron className="composite-red"/><a className="proyects-list" href={`${props.url}/localidad/chillan/`}>Chillán</a></li>
                            <li><Chevron className="composite-red"/><a className="proyects-list" href={`${props.url}/localidad/concepcion/`}>Concepción</a></li>
                        </ul>
                    </div>
                    <div className="col-md-3 col-sm-6">
                        <ul className="proyects-list">
                            <li><Chevron className="composite-red"/><a className="proyects-list" href={`${props.url}/localidad/los-angeles/`}>Los Ángeles</a></li>
                            <li><Chevron className="composite-red"/><a className="proyects-list" href={`${props.url}/localidad/valdivia/`}>Valdivia</a></li>
                            <li><Chevron className="composite-red"/><a className="proyects-list" href={`${props.url}/localidad/osorno/`}>Osorno</a></li>
                            <li><Chevron className="composite-red"/><a className="proyects-list" href={`${props.url}/localidad/puerto-montt/`}>Puerto Montt</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            
        </div>
    );
};

export default Prefooter;