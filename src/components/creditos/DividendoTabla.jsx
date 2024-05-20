import React, { useState, useEffect } from 'react'
import CurrencyFormat from 'react-currency-format'


const DividendoTabla = (props) => {

    const [anos, setAnos] = useState(20)
    const [cae, setCae] = useState(5.5)
    const [cuotaDividendo, setCuotaDividendo] = useState('')
    const [valorMaximo, setValorMaximo] = useState('')
    const [valorPropiedad, setValorPropiedad] = useState('')
    const [valorPropiedadClp, setValorPropiedadClp] = useState('')

    useEffect(() => {
        calc()
    }); 

    const calc = () => {
        setCae(props.cae)
        setAnos(props.anos)
        setCuotaDividendo(parseFloat(props.dividendoMonto / props.uf).toFixed(1))
        setValorMaximo(va(cae*0.01, anos, cuotaDividendo*12))
        setValorPropiedad(parseFloat((valorMaximo*1) / (1-(props.porcentajeRecursos*0.01))).toFixed(0))
        setValorPropiedadClp(parseFloat(props.uf * valorPropiedad).toFixed(0))

    }

    const va = (i, n, c) => {
        console.log(parseFloat(c * (((Math.pow((1+i), n))-1)/  (i*(Math.pow((1+i),n))))).toFixed(2))
        return parseFloat(c * (((Math.pow((1+i), n))-1)/  (i*(Math.pow((1+i),n))))).toFixed(2)
        /* return */
    }

    return (
        <tr>
            <td data-label="Años">{ anos }</td>
            <td data-label="CAE (%)">{ parseFloat(cae).toLocaleString('es-CL') }%</td>
            {/* <td data-label="Valor Máximo Finanaciado por Banco (UF)"><CurrencyFormat value={valorMaximo} displayType={'text'} thousandSeparator={true} suffix={' UF'} renderText={value => <div>{value}</div>} /></td> */}
            <td data-label="Valor Propiedad UF"><CurrencyFormat value={valorPropiedad} displayType={'text'} thousandSeparator="." decimalSeparator="," suffix={' UF'} renderText={value => <div>{value}</div>} /></td>
            <td data-label="Valor Propiedad ($)"><CurrencyFormat value={valorPropiedadClp} displayType={'text'} thousandSeparator="." decimalSeparator="," prefix={'$'} renderText={value => <div>{value}</div>} /></td>
            {/* <td data-label="Cuota Dividendo UF"><CurrencyFormat value={cuotaDividendo} displayType={'text'} thousandSeparator="." decimalSeparator="," suffix={' UF'} renderText={value => <div>{value}</div>} /></td>  */}
            <td data-label="Cuota Dividendo UF">{parseFloat(cuotaDividendo).toLocaleString('es-CL') + ' UF'}</td> 

        </tr>
    );
};

export default DividendoTabla;