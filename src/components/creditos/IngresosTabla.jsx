import React, { useState, useEffect } from 'react'
import CurrencyFormat from 'react-currency-format'

const IngresosTabla = (props) => {

    const [anos, setAnos] = useState(20)
    const [cae, setCae] = useState(5.5)
    const [montoMaximo, setMontoMaximo] = useState('')
    const [cuotaDividendosClp, setCuotaDividendosClp] = useState('')
    const [cuotaDividendosUf, setCuotaDividendosUf] = useState('')
    const [valorPropiedad, setValorPropiedad] = useState('')
    const [valorPropiedadClp, setValorPropiedadClp] = useState('')
    const [porcentajeRecursos, setPorcentajeRecursos] = useState('')


    useEffect(() => {
        calc()
    }); 
    
    const calc = () => {
        setCae(props.cae)
        setAnos(props.anos)
        setPorcentajeRecursos(props.porcentaje)


        setCuotaDividendosClp(parseFloat(props.montoRenta*0.3).toFixed(0)) //
        setCuotaDividendosUf(parseFloat(cuotaDividendosClp /props.uf).toFixed(1)) //
        setMontoMaximo(va((cae*0.01), anos, (cuotaDividendosUf*12))) // 
        setValorPropiedad(parseFloat((montoMaximo*1) / (1-(porcentajeRecursos*0.01))).toFixed(0)) // 
        setValorPropiedadClp(parseFloat(valorPropiedad * props.uf).toFixed(0))

        console.log(cuotaDividendosUf)
    }

    const va = (i, n, c) => {
        return parseFloat(c * (((Math.pow((1+i), n))-1)/  (i*(Math.pow((1+i),n))))).toFixed(2)
    }

    return (
        <tr>
            <td data-label="Años">{ anos }</td>
            <td data-label="CAE (%)">{ parseFloat(cae).toLocaleString('es-CL') }%</td>
            {/* <td data-label="Valor Maximo Financiado por Banco (UF)"><CurrencyFormat value={montoMaximo} displayType={'text'} thousandSeparator={true} suffix={' UF'} renderText={value => <div>{value}</div>} /></td> */}
            <td data-label="Valor Propiedad (UF)"><CurrencyFormat value={valorPropiedad} displayType={'text'} thousandSeparator="." decimalSeparator="," suffix={' UF'} renderText={value => <div>{value}</div>} /></td>
            <td data-label="Valor Propiedad ($)"><CurrencyFormat value={valorPropiedadClp} displayType={'text'} thousandSeparator="." decimalSeparator="," prefix={'$'} renderText={value => <div>{value}</div>} /></td>
            <td data-label="Cuota Dividendo UF">{parseFloat(cuotaDividendosUf).toLocaleString('es-CL') + ' UF'}</td> 
            <td data-label="Cuota Dividendos $"><CurrencyFormat value={cuotaDividendosClp} displayType={'text'} thousandSeparator="." decimalSeparator="," prefix={'$'} renderText={value => <div>{value}</div>} /></td>
        </tr>
    );
};

export default IngresosTabla;