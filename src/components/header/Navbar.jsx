import React, { useState, useEffect} from 'react';
import $ from 'jquery';

import LogoGalilea from '../../assets/images/header/logo-cabecera.svg';
import SloganM2 from '../../assets/images/header/slogan.svg';
import Menu from '../../assets/images/header/menu.svg';
import Close from '../../assets/images/header/close.svg';



import '../../assets/css/nav.css'

const Navbar = (props) => {

    const [classStyle, setClassStyle] = useState('overlay-menu')

    useEffect(() => {
        $('.menu').on('click', (e) => {
            setClassStyle("in overlay-menu ")
        })
        $('.overlay-menu-right-close').on('click', (e) => {
            setClassStyle("overlay-menu ")
        })
        mobile()
    }, [])

    const mobile = () => {
        $(window).on('resize', function() {
            if ($(this).width() < 992) {
                setClassStyle("overlay-menu")
            }else{
                setClassStyle("overlay-menu")
            }
        });
    }


    return (
        <div>
            <div className="header-logo">
                <a href={props.url} ><img className="my-2 mx-4 logo" alt="" src={LogoGalilea} ></img></a>
                <img className="my-2 mx-3 menu" alt="" src={Menu} />
                <img className="my-2 mx-3 pt-3 slogan " alt="" src={SloganM2} />
            </div>
                <div className={classStyle}>
                    <img className="overlay-menu-right-close" alt="" src={Close} />
                    <div className="">
                        <ul className="main-menu pt-5">
                            <a href="https://galilea.cl/"><li className="hover-li">Inicio</li></a><br></br>
                            <a href="https://galilea.cl/nosotros/"><li className="hover-li">Nosotros</li></a><br></br>
                            <a href="https://galilea.cl/nuestros-proyectos/"><li className="hover-li">Proyectos</li></a><br></br>
                            <a href="https://galilea.cl/como-comprar/"><li className="hover-li">¿Cómo Comprar?</li></a><br></br>
                            <a href="https://galilea.cl/servicio-al-cliente/"><li className="hover-li">Servicio al Cliente</li></a><br></br>
                            <a href="https://galilea.cl/salas-de-ventas-y-pilotos/"><li className="hover-li">Salas de Ventas y Pilotos</li></a><br></br>
                            <a href="https://galilea.cl/postventa/"><li className="hover-li">PostVenta</li></a><br></br>
                            <a href="https://galilea.cl/postula-con-nosotros/"><li className="hover-li">Postula al Subsidio</li></a><br></br>
                            <a href="#"><li className="hover-li active-menu">Simula tu Crédito</li></a><br></br>
                            <a href="https://galilea.cl/trabaja-con-nosotros/"><li className="hover-li">Trabaja con Nosotros</li></a><br></br>

                        </ul>
                    </div>
                </div>
        </div>
    );
};

export default Navbar;