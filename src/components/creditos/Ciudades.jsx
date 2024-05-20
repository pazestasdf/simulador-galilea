import React, { useState, useEffect } from 'react'
import Advertencia from '../../assets/images/advertencia.png';

import Chevron from '../../assets/images/composites/chevron-right.svg';
import Rightc from '../../assets/images/composites/rightc.svg';

const PrecioCiudades = (props) => {

    const [proyectos, setProyectos] = useState([])
    const [noProyects, setNoProyects] = useState(false)
    const [limit, setLimit] = useState(true)

    const more = '>'

    const checkLimitSimulator = () => {
        switch (props.origin) {
            case 'precio':
                console.log('precio', props.precioVivienda)
                if (props.precioVivienda < 1350) {
                    return false;
                    // "Estimado cliente, actualmente no contamos con proyectos de dicho valor. Le recomendamos contactarse con nuestros ejecutivos para que lo apoyen en la elección de su nuevo hogar."
                }
                break 
            case 'dividendo':
                console.log('dividendo', props.precioVivienda)
                if (props.precioVivienda < 200000) {
                    return false;
                    // return "Estimado cliente, actualmente no contamos con proyectos de dicho valor. Le recomendamos contactarse con nuestros ejecutivos para que lo apoyen en la elección de su nuevo hogar."
                }
                break
            case 'ingresos':
                console.log('ingresos', props.precioVivienda)
                if (props.precioVivienda < 740000) {
                    return false;
                    // return "Estimado cliente, actualmente no contamos con proyectos de dicho valor. Le recomendamos contactarse con nuestros ejecutivos para que lo apoyen en la elección de su nuevo hogar."
                }
                break
        }
        
        
    }

    

    useEffect(function proyectosCompatibles () {
        
        var infoProyecto = props.infoSimulador
        console.log(props)
        if (props.dividendoMonto === undefined){
            
            if (parseInt(props.subsidio) === 2){
                // filtrar los proyectos con subsidio valor 0
                infoProyecto = infoProyecto.filter(item => parseInt(item.conSubsidio) !== 0)
                // console.log("holi")
                infoProyecto = infoProyecto.filter(item => parseInt(item.conSubsidio) <= props.precioVivienda)
                // ordenar proyectos de mayor a menor 
                infoProyecto.sort((a, b) =>  b.conSubsidio - a.conSubsidio )
            } else {

                infoProyecto = infoProyecto.filter(item => parseInt(item.sinSubsidio) <= props.precioVivienda)
                infoProyecto.sort((a, b) =>  b.sinSubsidio - a.sinSubsidio )
            }
            // var auxProyect = infoProyecto.slice(0,4);
            var auxProyect = infoProyecto.slice(0,2);
            setProyectos(auxProyect) 

        }
        console.log(infoProyecto)
    },[props.subsidio, props.infoSimulador, props.precioVivienda]);


    return (
        <div className="container">
            <div className="row">
                {   noProyects ? (<h2>No Hay proyectos para mostrar</h2>) : checkLimitSimulator()==false ? (<p className='container pt-3 msg-limit'>Estimado cliente, actualmente no contamos con proyectos de dicho valor. Le recomendamos contactarse con nuestros ejecutivos para que lo apoyen en la elección de su nuevo hogar.</p>) : (
                        proyectos.map(
                            item => (
                                <div key={item.id} className="pt-5 col-sm-12 col-md-6 col-lg-3">
                                    <div className="titulo-ciudad container">
                                        <div className="contimg">
                                            <a href={item.linkProyecto}>
                                                <div className="inset-color">
                                                    <img className="img-galilea img-fluid" alt={item.proyecto} src={item.linkImagen}/>
                                                    <div className="text-img">
                                                        <div className="container pb-2">
                                                                <h3 className="text-img-city more">
                                                                    {item.proyecto}
                                                                </h3>
                                                                <h5 className="text-img-city plus">Ver más<span><img className="icon-chevron" src={Rightc}></img></span></h5>

                                                        </div>
                                                    </div>                                            
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            )
                        )
                    )
                }
            </div>
            <div className="container pt-5 advertencia">
                
                <p className='advertencia'><strong className='asterisk'>*</strong> La presente simulación corresponde a un crédito con tasa fija.  El resultado puede variar de acuerdo con la entidad financiera que otorgue el crédito, la tasa de interés vigente y sus políticas de financiamiento</p>
            </div>
        </div>
    );
};

export default PrecioCiudades;