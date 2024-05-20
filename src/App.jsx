import React from 'react'
import Simulador from './components/Simulador'
import Footer from './components/Footer'
import Header from './components/Header';


function App() {

	const url = 'https://'+window.location.hostname

	return (
		<div>
			<Header url={url}/>
			<div className="container financiamiento">
				<p className="py-5 text-center">A continuación podrás realizar una simulación de tu crédito hipotecario según: el precio de la vivienda de tu interés, la cuota mensual del crédito que deseas pagar o tu ingreso mensual.</p>
				<Simulador url={url}/>
			</div>
			<Footer url={url}/>
		</div>
	);
}

export default App;
