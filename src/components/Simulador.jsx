import React, { useState, useEffect } from 'react'
import Precio from './creditos/Precio';
import Dividendo from './creditos/Dividendo';
import Ingresos from './creditos/Ingresos';

// IMG IMPORT

import Calan from '../assets/images/ciudades/caluga-calan.jpg'
import Pangue from '../assets/images/ciudades/caluga-pangue.jpg'
import Cormoran from '../assets/images/ciudades/caluga-cormoran.jpg'
import Torcaza from '../assets/images/ciudades/caluga-torcaza.jpg'
import Caiquen from '../assets/images/ciudades/caluga-caiquen.jpg'
import Zorzal from '../assets/images/ciudades/caluga-zorzal.jpg'
import Campanario from '../assets/images/ciudades/caluga-campanario.jpg'


const Galilea = (props) => {
    
    const [ufHoy, setUfHoy] = useState('');

    const infoSimulador = [
        {id: 1,  ciudad: 'Valparaíso',  proyecto: 'Alturas de Curauma',         sinSubsidio: 1685, rentaSinSubsidio: 721796,    conSubsidio: 1685,  rentaConSubsidio: 721796,   linkImagen: Calan,          linkProyecto: props.url+'/proyectos/alturas-de-curauma/'},
        {id: 2,  ciudad: 'Valparaíso',  proyecto: 'Brisas de Curauma',         sinSubsidio: 2510, rentaSinSubsidio: 1075197,   conSubsidio: 0,     rentaConSubsidio: 0,        linkImagen: Pangue,         linkProyecto: props.url+'/proyectos/cumbres-de-curauma/'},
        // {id: 3,  ciudad: 'Valparaíso',  proyecto: 'Terrazas de Curauma',        sinSubsidio: 3850, rentaSinSubsidio: 1649207,   conSubsidio: 0,     rentaConSubsidio: 0,        linkImagen: Cormoran,       linkProyecto: props.url+'/proyectos/brisas-de-curauma/'},
        // Valparaiso: Cumbres de Curauma
        {id: 4,  ciudad: 'Limache',     proyecto: 'Villa Galilea',              sinSubsidio: 2350, rentaSinSubsidio: 1006659,   conSubsidio: 2200,  rentaConSubsidio: 942404,   linkImagen: Caiquen,        linkProyecto: props.url+'/proyectos/villa-galilea/'},
        // {id: 5,  ciudad: 'Quilpué',     proyecto: 'Cumbres de Quilpué',         sinSubsidio: 1785, rentaSinSubsidio: 764632,    conSubsidio: 1785,  rentaConSubsidio: 764632,   linkImagen: Calan,          linkProyecto: props.url+'/proyectos/cumbres-de-quilpue/'},
        {id: 6,  ciudad: 'Los Andes',   proyecto: 'Cumbres de Los Andes',       sinSubsidio: 1390, rentaSinSubsidio: 595428,    conSubsidio: 1390,  rentaConSubsidio: 595428,   linkImagen: Calan,          linkProyecto: props.url+'/proyectos/cumbres-de-los-andes/'},
        {id: 7,  ciudad: 'Los Andes',   proyecto: 'Mirador de Los Andes',       sinSubsidio: 2200, rentaSinSubsidio: 942404,    conSubsidio: 2200,  rentaConSubsidio: 942404,   linkImagen: Caiquen,        linkProyecto: props.url+'/proyectos/mirador-de-los-andes/'},
        {id: 8,  ciudad: 'Los Andes',   proyecto: 'Valle Andino',  sinSubsidio: 1850, rentaSinSubsidio: 792476,    conSubsidio: 1850,  rentaConSubsidio: 792476,   linkImagen: Zorzal,         linkProyecto: props.url+'/proyectos/valle-andino/'},
        {id: 9,  ciudad: 'Chicureo',    proyecto: 'Portones de Chicureo',       sinSubsidio: 4000, rentaSinSubsidio: 1713462,   conSubsidio: 0,     rentaConSubsidio: 0,        linkImagen: Cormoran,       linkProyecto: props.url+'/proyectos/portones-de-chicureo/'},
        // {id: 10, ciudad: 'Buín',        proyecto: 'Alto Buin',                  sinSubsidio: 2500, rentaSinSubsidio: 1070914,   conSubsidio: 0,     rentaConSubsidio: 0,        linkImagen: Caiquen,        linkProyecto: props.url+'/proyectos/alto-buin/'},
        {id: 11, ciudad: 'Buín',        proyecto: 'Hacienda Buín',              sinSubsidio: 2330, rentaSinSubsidio: 1015407,   conSubsidio: 2200,  rentaConSubsidio: 958754,   linkImagen: Caiquen,        linkProyecto: props.url+'/proyectos/hacienda-de-buin/'},
        // Buin: Valle Buin
        {id: 12, ciudad: 'Buín',        proyecto: 'Huertos de Buín',            sinSubsidio: 3700, rentaSinSubsidio: 1612449,   conSubsidio: 0,     rentaConSubsidio: 0,        linkImagen: Cormoran,       linkProyecto: props.url+'/proyectos/huertos-de-buin/'},
        {id: 13, ciudad: 'Rancagua',    proyecto: 'Cumbres de San Damian',      sinSubsidio: 3115, rentaSinSubsidio: 1925559,   conSubsidio: 0,     rentaConSubsidio: 0,        linkImagen: Campanario,     linkProyecto: props.url+'/proyectos/cumbres-de-san-damian/'},
        // {id: 14, ciudad: 'Rancagua',    proyecto: 'Villa Galilea Norte',        sinSubsidio: 1740, rentaSinSubsidio: 1077269,    conSubsidio: 1620,  rentaConSubsidio: 1002975,   linkImagen: Caiquen,        linkProyecto: props.url+'/proyectos/villa-galilea-norte/'},
        // Rancagua: Praderas de Kennedy
        {id: 15, ciudad: 'Machalí',    proyecto: 'Brisas de Machali',          sinSubsidio: 4150, rentaSinSubsidio: 2569348,   conSubsidio: 0,     rentaConSubsidio: 0,        linkImagen: Cormoran,       linkProyecto: props.url+'/proyectos/brisas-de-machali/'},
        // {id: 16, ciudad: 'Machalí',    proyecto: 'El Madero Polo Machali',     sinSubsidio: 3150, rentaSinSubsidio: 1950228,   conSubsidio: 0,     rentaConSubsidio: 0,        linkImagen: Torcaza,        linkProyecto: props.url+'/proyectos/el-madero-polo-machali/'},
        {id: 17, ciudad: 'Rengo',       proyecto: 'Brisas de Rengo',            sinSubsidio: 2100, rentaSinSubsidio: 1300152,    conSubsidio: 1950,  rentaConSubsidio: 1207284,   linkImagen: Torcaza,        linkProyecto: props.url+'/proyectos/brisas-de-rengo/'},
        // {id: 18, ciudad: 'Curicó',      proyecto: 'Doña Elisa',                 sinSubsidio: 1570, rentaSinSubsidio: 972019,    conSubsidio: 1950,  rentaConSubsidio: 1207284,   linkImagen: Calan,          linkProyecto: props.url+'/proyectos/dona-elisa/'},
        {id: 19, ciudad: 'Curicó',      proyecto: 'Parque Zapallar',            sinSubsidio: 2890, rentaSinSubsidio: 1789257,   conSubsidio: 0,     rentaConSubsidio: 0,        linkImagen: Cormoran,       linkProyecto: props.url+'/proyectos/parque-zapallar/'},
        // Curico: Doña Matilde
        {id: 20, ciudad: 'Talca',       proyecto: 'Altos de Tejas Verdes',      sinSubsidio: 3375, rentaSinSubsidio: 2089530,   conSubsidio: 0,     rentaConSubsidio: 0,        linkImagen: Campanario,     linkProyecto: props.url+'/proyectos/altos-de-tejas-verdes/'},
        // {id: 21, ciudad: 'Talca',       proyecto: 'Parque El Avellano II',             sinSubsidio: 2890, rentaSinSubsidio: 1789257,   conSubsidio: 0,     rentaConSubsidio: 0,        linkImagen: Cormoran,       linkProyecto: props.url+'/proyectos/el-avellano-ii/'},
        // {id: 22, ciudad: 'Talca',       proyecto: 'Cumbres de las Rastras III', sinSubsidio: 2040, rentaSinSubsidio: 1263005,    conSubsidio: 1860,  rentaConSubsidio: 1151563,   linkImagen: Pangue,         linkProyecto: props.url+'/proyectos/cumbres-de-las-rastras-iii/'},
        // {id: 23, ciudad: 'Talca',       proyecto: 'Praderas de San Miguel',     sinSubsidio: 2230, rentaSinSubsidio: 1380638,    conSubsidio: 2050,  rentaConSubsidio: 1269196,   linkImagen: Caiquen,        linkProyecto: props.url+'/proyectos/praderas-de-san-miguel/'},
        // {id: 24, ciudad: 'Talca',       proyecto: 'Don Alfonso',               sinSubsidio: 1790, rentaSinSubsidio: 1108225,    conSubsidio: 1620,  rentaConSubsidio: 1002975,   linkImagen: Calan,          linkProyecto: props.url+'/proyectos/don-alfonso/'},
        // {id: 25, ciudad: 'Talca',       proyecto: 'Doña Antonia III',           sinSubsidio: 1680, rentaSinSubsidio: 1040122,    conSubsidio: 1550,  rentaConSubsidio: 959636,   linkImagen: Caiquen,        linkProyecto: props.url+'/proyectos/dona-antonia-iii/'},
        // Talca: Vista La Viña
        // Talca: Doña Antonia v
        // Brisas de San Miguel
        {id: 26, ciudad: 'Linares',     proyecto: 'Villa Galilea Linares',      sinSubsidio: 1670, rentaSinSubsidio: 1033931,    conSubsidio: 1540,  rentaConSubsidio: 953445,   linkImagen: Caiquen,        linkProyecto: props.url+'/proyectos/villa-galilea-linares/'},
        // Linares: Cumbre de Linares ii
        {id: 27, ciudad: 'Linares',     proyecto: 'Huerto de Linares',          sinSubsidio: 2280, rentaSinSubsidio: 1411594,    conSubsidio: 2090,  rentaConSubsidio: 1293961,   linkImagen: Caiquen,        linkProyecto: props.url+'/proyectos/huertos-de-linares/'},
        {id: 28, ciudad: 'San Carlos',  proyecto: 'Doña Javiera III',           sinSubsidio: 1670, rentaSinSubsidio: 1033931,    conSubsidio: 1540,  rentaConSubsidio: 953445,   linkImagen: Caiquen,        linkProyecto: props.url+'/proyectos/dona-javiera-iii/'},
        // {id: 29, ciudad: 'Chillán',     proyecto: 'Huerto de Chillan',          sinSubsidio: 1720, rentaSinSubsidio: 1064887,    conSubsidio: 1600,  rentaConSubsidio: 990592,   linkImagen: Caiquen,        linkProyecto: props.url+'/proyectos/huertos-de-chillan/'},
        {id: 30, ciudad: 'Chillán',     proyecto: 'Parque Universitario',       sinSubsidio: 2890, rentaSinSubsidio: 1789257,   conSubsidio: 0,     rentaConSubsidio: 0,        linkImagen: Cormoran,       linkProyecto: props.url+'/proyectos/parque-universitario/'},
        {id: 31, ciudad: 'Chillán',     proyecto: 'Don Clemente',               sinSubsidio: 1540, rentaSinSubsidio: 953445,    conSubsidio: 1410,  rentaConSubsidio: 872959,   linkImagen: Calan,          linkProyecto: props.url+'/proyectos/don-clemente/'},
        // Chillan: Huertos de Chillan iii
        // Chillan: Huertos de Chillan ii
        // {id: 32, ciudad: 'Concepción',  proyecto: 'Praderas de Coronel',        sinSubsidio: 1720, rentaSinSubsidio: 1064887,    conSubsidio: 1600,  rentaConSubsidio: 990592,   linkImagen: Caiquen,        linkProyecto: props.url+'/proyectos/praderas-de-coronel/'},
        // {id: 33, ciudad: 'Concepción',  proyecto: 'Cumbres de Lomas Verdes',    sinSubsidio: 2160, rentaSinSubsidio: 1337299,    conSubsidio: 1970,  rentaConSubsidio: 1219667,   linkImagen: Pangue,         linkProyecto: props.url+'/proyectos/cumbres-de-lomas-verdes/'},
        // {id: 34, ciudad: 'Concepción',  proyecto: 'Praderas de Junquillar',     sinSubsidio: 1720, rentaSinSubsidio: 1064887,    conSubsidio: 1600,  rentaConSubsidio: 990592,   linkImagen: Caiquen,        linkProyecto: props.url+'/proyectos/praderas-de-junquillar/'},
        // {id: 35, ciudad: 'Los Ángeles', proyecto: 'Retiro Sur C',               sinSubsidio: 0,    rentaSinSubsidio: 0,         conSubsidio: 0,     rentaConSubsidio: 0,        linkImagen: Caiquen,        linkProyecto: props.url+'/proyectos/retiro-del-sur-c/'},
        {id: 36, ciudad: 'Los Ángeles', proyecto: 'Cumbres del Retiro Sur II',  sinSubsidio: 1470, rentaSinSubsidio: 910107,    conSubsidio: 1350,  rentaConSubsidio: 835812,   linkImagen: Calan,          linkProyecto: props.url+'/proyectos/cumbres-del-retiro-sur-ii/'},
        {id: 37, ciudad: 'Los Ángeles', proyecto: 'Altos de Parque Norte',      sinSubsidio: 1820, rentaSinSubsidio: 1126799,    conSubsidio: 1660,  rentaConSubsidio: 1027739,   linkImagen: Pangue,         linkProyecto: props.url+'/proyectos/altos-de-parque-norte/'},
        // {id: 38, ciudad: 'Valdivia',    proyecto: 'Villa Galilea Valdivia',     sinSubsidio: 2080, rentaSinSubsidio: 1287770,    conSubsidio: 1900,  rentaConSubsidio: 1176328,   linkImagen: Caiquen,        linkProyecto: props.url+'/proyectos/villa-galilea-valdivia/'},
        // {id: 39, ciudad: 'Valdivia',    proyecto: 'Brisas de Torobayo',         sinSubsidio: 0,    rentaSinSubsidio: 0,         conSubsidio: 0,     rentaConSubsidio: 0,        linkImagen: Torcaza,        linkProyecto: props.url+'/proyectos/brisas-de-toro-bayo/'},
        {id: 40, ciudad: 'Osorno',     proyecto: 'Praderas de Pilauco ',       sinSubsidio: 2290, rentaSinSubsidio: 1417785,    conSubsidio: 2120,  rentaConSubsidio: 1312535,   linkImagen: Caiquen,        linkProyecto: props.url+'/proyectos/praderas-de-pilauco/'},
        {id: 41, ciudad: 'Pto Montt',   proyecto: 'Parque Fundadores',          sinSubsidio: 1670, rentaSinSubsidio: 1033931,    conSubsidio: 1550,  rentaConSubsidio: 959636,   linkImagen: Caiquen,        linkProyecto: props.url+'/proyectos/parque-fundadores/'},

    ]

    const tasas = [
        {id: 1, anos: 15, tasa: 5.5},
        {id: 2, anos: 20, tasa: 5.5},
        {id: 3, anos: 25, tasa: 5.5},
        {id: 4, anos: 30, tasa: 5.5},
    ]

    const ciudades = [
		{id : 1, ciudad : 'Valparaíso'},
		{id : 2, ciudad : 'Limache'},
		{id : 3, ciudad : 'Quilpué'},
		{id : 4, ciudad : 'Los Andes'},
		{id : 5, ciudad : 'Chicureo'},
		{id : 6, ciudad : 'Buín'},
		{id : 7, ciudad : 'Rancagua'},
        {id : 19, ciudad : 'Machalí'},
		{id : 8, ciudad : 'Rengo'},
		{id : 9, ciudad : 'Curicó'},
		{id : 10, ciudad : 'Talca'},
		{id : 11, ciudad : 'Linares'},
		{id : 12, ciudad : 'San Carlos'},
		{id : 13, ciudad : 'Chillán'},
		{id : 14, ciudad : 'Concepción'},
		{id : 15, ciudad : 'Los Ángeles'},
		{id : 16, ciudad : 'Valdivia'},
		{id : 17, ciudad : 'Osorno'},
		{id : 18, ciudad : 'Puerto Montt'}
	]

    const monedas = [
        {id : 1, moneda: 'uf', simbolo: 'UF'},
        {id : 2, moneda: 'peso', simbolo: '$'}
    ]

    const subsidio = [
        {id : 1, subsidio: 'Sin Subsidio'},
        {id : 2, subsidio: 'Con Subsidio'},
    ]

    const [mostrarPrecio, setMostrarPrecio] = useState(false);
    const [mostrarDividendo, setMostrarDividendo] = useState(false);
    const [mostrarIngresos, setMostrarIngresos] = useState(false);

    const handleShow = (e) => {
        if (e == 'precio'){
            setMostrarPrecio(true)
        }else{
            setMostrarPrecio(false)
        }
    }

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        var https = require('https');
        https.get('https://mindicador.cl/api', function(res) {
            res.setEncoding('utf-8');
            var data = '';
        
            res.on('data', function(chunk) {
                data += chunk;
            });
            res.on('end', function() {
                var dailyIndicators = JSON.parse(data);
                setUfHoy(Math.round(dailyIndicators.uf.valor))
                // console.log('la uf de hoy es', dailyIndicators.uf.valor)
                // console.log('la uf de hoy es', ufHoy)
            });
        
        }).on('error', function(err) {
            console.log('¡Error al consumir la API!');
            console.log('El valor de UF por defecto será $32.216');
        });
    };

    

    return (
        <div>
            <Precio handleShow={handleShow} show={mostrarPrecio} uf={ufHoy} ciudades={ciudades} monedas={monedas} subsidio={subsidio} infoSimulador={infoSimulador} tasas={tasas}/>
            <Dividendo handleShow={handleShow} show={mostrarDividendo} uf={ufHoy} ciudades={ciudades} monedas={monedas} subsidio={subsidio} infoSimulador={infoSimulador} tasas={tasas}/>
            <Ingresos uf={ufHoy} show={mostrarIngresos} ciudades={ciudades} monedas={monedas} subsidio={subsidio} infoSimulador={infoSimulador} tasas={tasas}/>
        </div>
    )
}

export default Galilea
