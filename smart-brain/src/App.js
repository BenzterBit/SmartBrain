import React, {Component} from 'react'
import Particles from 'react-particles-js';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Rank from './Components/Rank/Rank';
import './App.css'


const particleStyle = {
	particles: {
                number:{
                	value:30,	
                	density:{
                		enable:true,
                		value_area:800

                	}
                }   
		}
	}
class App extends Component{
	render(){
		return(
			<div className= "App">
				<Particles className="particles" params= {particleStyle}/>
				<Navigation />
				<Logo />
				<Rank />
				<ImageLinkForm />
				{/*<Facerecog />*/}
			</div>
			);
	}
}

export default App;

