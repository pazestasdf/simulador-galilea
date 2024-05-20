import React, { useState, useEffect, useRef } from "react";
import DividendoTabla from "./DividendoTabla";
import Ciudades from "./Ciudades";
import CurrencyFormat from "react-currency-format";
import axios from 'axios';

const Dividendo = (props) => {
  const { handleShow } = props;

  const [show, setShow] = useState(false);
  const [ciudad, setCiudad] = useState("Valparaíso");
  const [infoSimulador, setInfoSimulador] = useState("");
  const [moneda, setMoneda] = useState("1");
  const [subsidio, setSubsidio] = useState("1");
  const [porcentaje, setPorcentaje] = useState("80");
  const [dividendoMonto, setDividendoMonto] = useState("");
  const [showPrecioVivienda, setShowPrecioVivienda] = useState(false);
  const [auxShowPrecioVivienda, setAuxShowPrecioVivienda] = useState(0);
  const HUNDRED_PERCENT = 100;

  const monedaRef = useRef(null);

  const SIMULATOR_NAME =
    "Simula tu crédito hipotecario según la cuota mensual que deseas pagar";

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
    e.preventDefault(dividendoMonto);
    checkMonedaBeforeSend(monedaRef.current.value);
    if (!porcentaje.trim()) {
      alert("Debes añadir un porcentaje valido");
      return;
    } else if (!(porcentaje > 0 && porcentaje < 101)) {
      alert("Debes añadir un porcentaje valido entre 0 y 100");
      return;
    } else if (!dividendoMonto.trim()) {
      alert("Debes añadir un dividendo máximo");
      return;
    } else if (dividendoMonto < 0) {
      alert("Debes añadir un dividendo máximo a 0");
      return;
    }

    // Genera la fecha de hoy
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();

    today = dd + "/" + mm + "/" + yyyy;

    // Obtengo el ultimo valor del contador para el simnulador de dividendo
    const getContadorResponse = await axios.post("https://bloop.cl/simuladortr/getnextid", { simulador: 'dividendo' });
    const contador = getContadorResponse.data;

    var data = {
      simulador: "dividendo",
      fecha: today,
      contador: contador,
      ciudad: ciudad,
      subsidio: subsidio == 1 ? "Sin Subsidio" : "Con Subsidio",
      valorEn: moneda == 1 ? "UF" : "$",
      porcentajeFinanciarBanco: porcentaje,
      montoDividendo: dividendoMonto,
    };

    // Obtengo el ultimo valor del contador para el simnulador de dividendo
    const saveDividendoResponse = await axios.post("https://bloop.cl/simuladortr/save", data);

    if (saveDividendoResponse.data == true) {
      console.log(`Dividendo entry saved.`)
    }
    else {
      console.log(`Dividendo entry save failed.`)
    }

    setShow(true);
  };

  const ciudadControl = (ciudad) => {
    var infoSimuladorActual = props.infoSimulador.filter(
      (item) => item.ciudad === ciudad
    );
    setInfoSimulador(infoSimuladorActual);
    setCiudad(ciudad);
  };

  const checkMonedaBeforeSend = (moneda) => {
    var value = dividendoMonto;

    if (moneda == 1) {
      setDividendoMonto(value);
      setAuxShowPrecioVivienda(value * props.uf);
    } else {
      if (moneda == 2) {
        setDividendoMonto(value);
        setAuxShowPrecioVivienda(value);
      }
    }
  };

  return (
    <div>
      <div className="mt-5 p-5 simular dividendo">
        <form onSubmit={dividendo}>
          <div className="row">
            <div className="col-sm-12 col-lg">
              <h2>
                Simula tu crédito hipotecario según la cuota mensual que deseas
                pagar
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
              <label>Dividendo en</label>
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
              <label>Monto de tu Dividendo</label>
              {showPrecioVivienda ? (
                <CurrencyFormat
                  className="form-control py-3 mb-4"
                  placeholder="Ingresa dividendo Máximo"
                  thousandSeparator={true}
                  thousandSeparator="."
                  decimalSeparator=","
                  prefix={"$"}
                  value={dividendoMonto}
                  onValueChange={(values) => {
                    const { formattedValue, value } = values;
                    setDividendoMonto(value);
                    setAuxShowPrecioVivienda(value);
                  }}
                />
              ) : (
                <CurrencyFormat
                  className="form-control py-3 mb-4"
                  placeholder="Ingresa dividendo Máximo"
                  thousandSeparator={false}
                  thousandSeparator="."
                  decimalSeparator=","
                  suffix={" UF"}
                  value={dividendoMonto}
                  onValueChange={(values) => {
                    const { formattedValue, value } = values;
                    setDividendoMonto(value);
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
              <table cellspacing="0" cellpadding="0">
                <thead>
                  <tr>
                    <th scope="col">Años</th>
                    <th scope="col">CAE (%)</th>
                    {/* <th scope="col">Valor Máximo Finanaciado por Banco (UF)</th> */}
                    <th scope="col">Valor Propiedad UF</th>
                    <th scope="col">Valor Propiedad ($)</th>
                    <th scope="col">Cuota Dividendo UF</th>
                  </tr>
                </thead>
                <tbody>
                  <DividendoTabla
                    anos={props.tasas[0].anos}
                    cae={props.tasas[0].tasa}
                    uf={props.uf}
                    porcentajeRecursos={HUNDRED_PERCENT - porcentaje}
                    dividendoMonto={auxShowPrecioVivienda}
                  />
                  <DividendoTabla
                    anos={props.tasas[1].anos}
                    cae={props.tasas[1].tasa}
                    uf={props.uf}
                    porcentajeRecursos={HUNDRED_PERCENT - porcentaje}
                    dividendoMonto={auxShowPrecioVivienda}
                  />
                  <DividendoTabla
                    anos={props.tasas[2].anos}
                    cae={props.tasas[2].tasa}
                    uf={props.uf}
                    porcentajeRecursos={HUNDRED_PERCENT - porcentaje}
                    dividendoMonto={auxShowPrecioVivienda}
                  />
                   <DividendoTabla
                    anos={props.tasas[3].anos}
                    cae={props.tasas[3].tasa}
                    uf={props.uf}
                    porcentajeRecursos={HUNDRED_PERCENT - porcentaje}
                    dividendoMonto={auxShowPrecioVivienda}
                  />
                </tbody>
              </table>
            </div>
            <Ciudades
              precioVivienda={auxShowPrecioVivienda}
              infoSimulador={infoSimulador}
              ciudades={props.ciudades}
              subsidio={subsidio}
              origin="dividendo"
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Dividendo;
