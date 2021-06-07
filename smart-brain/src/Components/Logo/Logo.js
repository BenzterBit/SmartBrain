import React from 'react'
import Tilt from 'react-tilt'
import './Logo.css'
import brain from './brainlogo.png'

const Logo = () => {
	return (
		<div className="ma4 mt0">
		<Tilt className="Tilt br2 shadow-2" options={{ max : 45 }} style={{ height: 150, width: 150 }} >
		 	<div className="Tilt-inner pa3"> <img style={{display: 'flex', justifyContent:'center', paddingTop:'5px', paddingLeft:'12px'}} alt='brainlogo' src={brain}/> </div>
		</Tilt>

		</div>
		);
}
export default Logo;