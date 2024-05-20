import React, { useState, useEffect } from 'react'
import CurrencyFormat from 'react-currency-format'

const PrecioTabla = (props) => {

    const [anos, setAnos] = useState(20)
    const [cae, setCae] = useState(5.5)
    // const [costoFinal, setCostoFinal] = useState('')
    const [cuotaDividendoUf, setCuotaDividendoUf] = useState('')
    const [cuotaDividendo, setCuotaDividendo] = useState('')
    const [rentaMinima, setRentaMinima] = useState('')

    useEffect(() => {
        calc()
    }); 

    const calc = () => {
        setCae(props.cae)
        setAnos(props.anos)

        var financiaBanco = props.precioVivienda * props.porcentaje / 100
        // setCostoFinal(Math.round(pay((cae*0.01), -anos, financiaBanco) * anos * props.uf))
        setCuotaDividendoUf(parseFloat(pay((cae*0.01), -anos, financiaBanco)/12).toFixed(1))
        /* console.log("valor dividendo uf", parseFloat(pay((cae*0.01), -anos, financiaBanco)/12).toFixed(2)) */
        setCuotaDividendo(Math.round((pay((cae*0.01), -anos, financiaBanco)/12) * props.uf))
        setRentaMinima(parseFloat(cuotaDividendo/0.3).toFixed(0))


    }

    const pay = (i, n, va) => {
        return (va * i) / (1 - Math.pow((1+ i), (n)))
    }

    return (
        <tr>
            <td data-label="Años">{ anos }</td>
            <td data-label="CAE (%)">{ parseFloat(cae).toLocaleString('es-CL') }%</td>
            {/* <td data-label="Costo Final Crédito"><CurrencyFormat value={costoFinal} displayType={'text'} thousandSeparator="." decimalSeparator="," prefix={'$'} renderText={value => <div>{value}</div>} /></td> */}
            <td data-label="Cuota Dividendo UF">{parseFloat(cuotaDividendoUf).toLocaleString('es-CL') + ' UF'}</td> 
            <td data-label="Cuota Dividendo ($)"><CurrencyFormat value={cuotaDividendo} displayType={'text'} thousandSeparator="." decimalSeparator="," prefix={'$'} renderText={value => <div>{value}</div>} /></td>
            <td data-label="Renta Minima"><CurrencyFormat value={rentaMinima} displayType={'text'} thousandSeparator="." decimalSeparator="," prefix={'$'} renderText={value => <div>{value}</div>} /></td>
        </tr>
    )
}

export default PrecioTabla
