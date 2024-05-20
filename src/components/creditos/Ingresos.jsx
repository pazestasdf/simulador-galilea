import React, { useState, useEffect, useRef } from "react";
import IngresosTabla from "./IngresosTabla";
import CurrencyFormat from "react-currency-format";
import Ciudades from "./Ciudades";
import axios from 'axios';

const Ingresos = (props) => {
  const [show, setShow] = useState(false);
  const [ciudad, setCiudad] = useState("Valparaíso");
  const [infoSimulador, setInfoSimulador] = useState("");
  const [moneda, setMoneda] = useState("1");
  const [subsidio, setSubsidio] = useState("1");
  const [porcentaje, setPorcentaje] = useState("80");
  const [montoRenta, setMontoRenta] = useState("");
  const HUNDRED_PERCENT = 100;

  const [showPrecioVivienda, setShowPrecioVivienda] = useState(false);
  const [auxShowPrecioVivienda, setAuxShowPrecioVivienda] = useState(0);

  const [cuotaDividendosClp, setCuotaDividendosClp] = useState("");
  const [cuotaDividendosUf, setCuotaDividendosUf] = useState("");
  const [valorPropiedad, setValorPropiedad] = useState("");
  const [montoMaximo, setMontoMaximo] = useState("");

  const monedaRef = useRef(null);

  const SIMULATOR_NAME =
    "Simula tu crédito hipotecario según tus ingresos mensuales";

  useEffect(() => {
    ciudadControl("Valparaíso");
    if (moneda == 1) {
      setShowPrecioVivienda(false);
    } else {
      setShowPrecioVivienda(true);
    }
  }, []);

  const valorPropiedadMonedad = (moneda) => {
    setMoneda(moneda);
    if (moneda == 1) {
      setShowPrecioVivienda(false);
    } else {
      setShowPrecioVivienda(true);
    }
  };

  const dividendo = async (e) => {
    e.preventDefault(montoRenta);
    checkMonedaBeforeSend(monedaRef.current.value);
    if (!porcentaje.trim()) {
      alert("Debes añadir un porcentaje valido");
      return;
    } else if (!(porcentaje > 0 && porcentaje < 101)) {
      alert("Debes añadir un porcentaje valido entre 0 y 100");
      return;
    } else if (!montoRenta.trim()) {
      alert("Debes añadir tu renta");
      return;
    } else if (montoRenta < 0) {
      alert("Tu renta debe ser mayor a 0");
      return;
    }

    // guardar datos en api antes de mostrar la simulacion
    // date
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();

    today = dd + "/" + mm + "/" + yyyy;
    console.log(today);

    // Obtengo el ultimo valor del contador para el simnulador de dividendo
    const getContadorResponse = await axios.post("https://bloop.cl/simuladortr/getnextid", { simulador: 'ingreso' });
    const contador = getContadorResponse.data;

    // firebase collection

    var data = {
      simulador: "ingreso",
      fecha: today,
      contador: contador,
      ciudad: ciudad,
      subsidio: subsidio == 1 ? "Sin Subsidio" : "Con Subsidio",
      valorEn: moneda == 1 ? "UF" : "$",
      porcentajeFinanciarBanco: porcentaje,
      renta: montoRenta,
    };

    // Obtengo el ultimo valor del contador para el simnulador de dividendo
    const saveIngresoResponse = await axios.post("https://bloop.cl/simuladortr/save", data);

    if (saveIngresoResponse.data == true) {
      console.log(`Ingreso entry saved.`)
    }
    else {
      console.log(`Ingreso entry save failed.`)
    }

    setShow(true);
  };

  const va = (i, n, c) => {
    return parseFloat(
      c * ((Math.pow(1 + i, n) - 1) / (i * Math.pow(1 + i, n)))
    ).toFixed(2);
  };

  const ciudadControl = (ciudad) => {
    var infoSimuladorActual = props.infoSimulador.filter(
      (item) => item.ciudad === ciudad
    );
    setInfoSimulador(infoSimuladorActual);
    setCiudad(ciudad);
  };

  const checkMonedaBeforeSend = (moneda) => {
    console.log("El monto es", montoRenta);
    var value = montoRenta;

    if (moneda == 1) {
      setMontoRenta(value);
      setAuxShowPrecioVivienda(value * props.uf);
    } else {
      if (moneda == 2) {
        setMontoRenta(value);
        setAuxShowPrecioVivienda(value);
        setCuotaDividendosClp(parseFloat(value * 0.3).toFixed(0)); //
        setCuotaDividendosUf(
          parseFloat(cuotaDividendosClp / props.uf).toFixed(2)
        ); //
        setMontoMaximo(va(5.5 * 0.01, 20, cuotaDividendosUf * 12)); //
        setValorPropiedad(
          parseFloat((montoMaximo * 1) / (1 - porcentaje * 0.01)).toFixed(2)
        ); //
      }
    }
  };

  return (
    <div>
      <div className="mt-5 p-5 simular ingresos">
        <form onSubmit={dividendo}>
          <div className="row">
            <div className="col-sm-12 col-lg">
              <h2>
                Simula tu crédito hipotecario según tus ingresos mensuales
              </h2>
            </div>
            <div className="col-sm">
              <label>Ciudad</label>
              <select
                className="form-select py-3 mb-4"
                onChange={(e) => ciudadControl(e.target.value)}
              >
                <optgroup label="Ciudades">
                  {props.ciudades.map((item) => (
                    <option key={item.id} value={item.ciudad}>
                      {item.ciudad}
                    </option>
                  ))}
                </optgroup>
              </select>
              <label>Renta en</label>
              <select
                className="form-select py-3 mb-4"
                ref={monedaRef}
                onChange={(e) => valorPropiedadMonedad(e.target.value)}
              >
                {props.monedas.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.simbolo}
                  </option>
                ))}
              </select>
              <label>Renta</label>
              {showPrecioVivienda ? (
                <CurrencyFormat
                  className="form-control py-3 mb-4"
                  placeholder="Ingrese Renta"
                  thousandSeparator={true}
                  thousandSeparator="."
                  decimalSeparator=","
                  prefix={"$"}
                  value={montoRenta}
                  onValueChange={(values) => {
                    const { formattedValue, value } = values;
                    console.log("imprimiendo valor renta en moneda", value);
                    setMontoRenta(value);
                    setAuxShowPrecioVivienda(value);
                    setCuotaDividendosClp(parseFloat(value * 0.3).toFixed(1)); //
                    setCuotaDividendosUf(
                      parseFloat(cuotaDividendosClp / props.uf).toFixed(2)
                    ); //
                    setMontoMaximo(va(3.34 * 0.01, 20, cuotaDividendosUf * 12)); //
                    setValorPropiedad(
                      parseFloat(
                        (montoMaximo * 1) / (1 - porcentaje * 0.01)
                      ).toFixed(2)
                    ); //
                  }}
                />
              ) : (
                <CurrencyFormat
                  className="form-control py-3 mb-4"
                  placeholder="Ingrese Renta"
                  thousandSeparator={false}
                  thousandSeparator="."
                  decimalSeparator=","
                  suffix={" UF"}
                  value={montoRenta}
                  onValueChange={(values) => {
                    const { formattedValue, value } = values;
                    setMontoRenta(value);
                    setAuxShowPrecioVivienda(value * props.uf);
                  }}
                />
              )}
            </div>
            <div className="col-sm">
              <label>Subsidio</label>
              <select
                className="form-select py-3 mb-4"
                onChange={(e) => setSubsidio(e.target.value)}
              >
                {props.subsidio.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.subsidio}
                  </option>
                ))}
              </select>
              <label>Porcentaje a financiar banco</label>
              <input
                type="number"
                className="form-control py-3 mb-4"
                placeholder="Ingrese porcentaje a financiar"
                min="0"
                max="100"
                value={porcentaje}
                onChange={(e) => setPorcentaje(e.target.value)}
              />
              <div className="d-grid py-3 mb-4">
                <button className="btn btn-galilea py-3 " type="submit">
                  Simular
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div className="">
        {show ? (
          <div>
            <div className="aprobacion">
              <h4>
                Galilea S.A. de Ingeniería y Construcción no es una entidad
                financiera por lo que esta simulación no es vinculante y en
                ningún caso constituye una aprobación formal, siendo meramente
                ilustrativa
              </h4>
            </div>
            <div className="pt-5">
              <table>
                <thead>
                  <tr>
                    <th scope="col">Años</th>
                    <th scope="col">CAE (%)</th>
                    {/* <th scope="col">Valor Maximo Financiado por Banco (UF)</th> */}
                    <th scope="col">Valor Propiedad (UF)</th>
                    <th scope="col">Valor Propiedad ($)</th>
                    <th scope="col">Cuota Dividendo UF</th>
                    <th scope="col">Cuota Dividendo ($)</th>
                  </tr>
                </thead>
                <tbody>
                  <IngresosTabla
                    anos={props.tasas[0].anos}
                    cae={props.tasas[0].tasa}
                    uf={props.uf}
                    porcentaje={HUNDRED_PERCENT - porcentaje}
                    montoRenta={auxShowPrecioVivienda}
                  />
                  <IngresosTabla
                    anos={props.tasas[1].anos}
                    cae={props.tasas[1].tasa}
                    uf={props.uf}
                    porcentaje={HUNDRED_PERCENT - porcentaje}
                    montoRenta={auxShowPrecioVivienda}
                  />
                  <IngresosTabla
                    anos={props.tasas[2].anos}
                    cae={props.tasas[2].tasa}
                    uf={props.uf}
                    porcentaje={HUNDRED_PERCENT - porcentaje}
                    montoRenta={auxShowPrecioVivienda}
                  />
                   <IngresosTabla
                    anos={props.tasas[3].anos}
                    cae={props.tasas[3].tasa}
                    uf={props.uf}
                    porcentaje={HUNDRED_PERCENT - porcentaje}
                    montoRenta={auxShowPrecioVivienda}
                  />
                </tbody>
              </table>
            </div>
            <Ciudades
              precioVivienda={montoRenta}
              infoSimulador={infoSimulador}
              ciudades={props.ciudades}
              subsidio={subsidio}
              origin="ingresos"
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Ingresos;
