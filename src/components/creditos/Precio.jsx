import React, { useState, useEffect, useRef } from "react";
import Ciudades from "./Ciudades";
import PrecioTabla from "./PrecioTabla";
import CurrencyFormat from "react-currency-format";
import axios from 'axios';

const Precio = (props) => {
  console.log("los props uf son", props.uf);

  const { handleShow } = props;

  const [porcentaje, setPorcentaje] = useState("80");
  const [precioVivienda, setPrecioVivienda] = useState("");
  const [subsidio, setSubsidio] = useState("1");
  const [ciudad, setCiudad] = useState("Valparaíso");
  const [moneda, setMoneda] = useState("1");
  const [show, setShow] = useState(false);
  const [infoSimulador, setInfoSimulador] = useState("");
  const [showPrecioVivienda, setShowPrecioVivienda] = useState(false);
  const [auxShowPrecioVivienda, setAuxShowPrecioVivienda] = useState(0);

  const monedaRef = useRef(null);

  const SIMULATOR_NAME =
    "Simula tu crédito hipotecario según el precio de la casa";

  useEffect(() => {
    setShow(props.show);
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

  const percent = async (e) => {
    e.preventDefault(precioVivienda);
    checkMonedaBeforeSend(monedaRef.current.value);
    if (!porcentaje.trim()) {
      alert("Debes añadir un porcentaje valido");
      return;
    } else if (!(porcentaje > 0 && porcentaje < 101)) {
      alert("Debes añadir un porcentaje valido entre 0 y 100");
      return;
    } else if (!precioVivienda.trim()) {
      alert("Debes añadir un precio de vivienda");
      return;
    } else if (precioVivienda < 0) {
      alert("Debes añadir un precio de vivienda mayor a 0");
      return;
    }
    // guardar datos en api antes de mostrar la simulacion
    // date
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();

    today = dd + "/" + mm + "/" + yyyy;

    // Obtengo el ultimo valor del contador para el simnulador de dividendo
    const getContadorResponse = await axios.post("https://bloop.cl/simuladortr/getnextid", { simulador: 'precio' });
    const contador = getContadorResponse.data;

    var data = {
      simulador: "precio",
      fecha: today,
      contador: contador,
      ciudad: ciudad,
      subsidio: subsidio == 1 ? "Sin Subsidio" : "Con Subsidio",
      valorEn: moneda == 1 ? "UF" : "$",
      porcentajeFinanciarBanco: porcentaje,
      precioCasa: precioVivienda,
    };

    // Obtengo el ultimo valor del contador para el simnulador de dividendo
    const savePrecioResponse = await axios.post("https://bloop.cl/simuladortr/save", data);

    if (savePrecioResponse.data == true) {
      console.log(`Precio entry saved.`)
    }
    else {
      console.log(`Precio entry save failed.`)
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
    var value = precioVivienda;
    if (moneda == 1) {
      setPrecioVivienda(value);
      setAuxShowPrecioVivienda(value);
    } else {
      if (moneda == 2) {
        setPrecioVivienda(value);
        setAuxShowPrecioVivienda(value / props.uf);
      }
    }
  };

  return (
    <div>
      <div className=" p-5 simular precio">
        <form onSubmit={percent}>
          <div className="row">
            <div className="col-sm-12 col-lg">
              <h2>
                Simula tu crédito hipotecario según el precio de la casa que
                deseas
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
              <label>Valor en</label>
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
              <label>Precio de tu casa</label>
              {showPrecioVivienda ? (
                <CurrencyFormat
                  className="form-control py-3 mb-4"
                  placeholder="Ingrese Valor propiedad"
                  thousandSeparator={true}
                  thousandSeparator="."
                  decimalSeparator=","
                  prefix={"$"}
                  value={precioVivienda}
                  onValueChange={(values) => {
                    const { formattedValue, value } = values;
                    setPrecioVivienda(value);
                    setAuxShowPrecioVivienda(value / props.uf);
                  }}
                />
              ) : (
                <CurrencyFormat
                  className="form-control py-3 mb-4"
                  placeholder="Ingrese Valor propiedad"
                  thousandSeparator={false}
                  thousandSeparator="."
                  decimalSeparator=","
                  suffix={" UF"}
                  value={precioVivienda}
                  onValueChange={(values) => {
                    const { formattedValue, value } = values;
                    setPrecioVivienda(value);
                    setAuxShowPrecioVivienda(value);
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
                <button className="btn btn-galilea py-3" type="submit">
                  Simular
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div>
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
                    {/* <th scope="col">Costo Final Crédito</th> */}
                    <th scope="col">Cuota Dividendo UF</th>
                    <th scope="col">Cuota Dividendo ($)</th>
                    <th scope="col">Renta Minima</th>
                  </tr>
                </thead>
                <tbody>
                  <PrecioTabla
                    anos={props.tasas[0].anos}
                    cae={props.tasas[0].tasa}
                    uf={props.uf}
                    porcentaje={porcentaje}
                    precioVivienda={auxShowPrecioVivienda}
                  />
                  <PrecioTabla
                    anos={props.tasas[1].anos}
                    cae={props.tasas[1].tasa}
                    uf={props.uf}
                    porcentaje={porcentaje}
                    precioVivienda={auxShowPrecioVivienda}
                  />
                  <PrecioTabla
                    anos={props.tasas[2].anos}
                    cae={props.tasas[2].tasa}
                    uf={props.uf}
                    porcentaje={porcentaje}
                    precioVivienda={auxShowPrecioVivienda}
                  />
                   <PrecioTabla
                    anos={props.tasas[3].anos}
                    cae={props.tasas[3].tasa}
                    uf={props.uf}
                    porcentaje={porcentaje}
                    precioVivienda={auxShowPrecioVivienda}
                  />
                </tbody>
              </table>
            </div>
            <Ciudades
              precioVivienda={auxShowPrecioVivienda}
              infoSimulador={infoSimulador}
              ciudades={props.ciudades}
              subsidio={subsidio}
              origin="precio"
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Precio;
