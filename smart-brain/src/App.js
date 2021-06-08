import React, {Component} from 'react'
import Particles from 'react-particles-js';
import Navigation from './Components/Navigation/Navigation';
import Signin from './Components/Signin/Signin';
import Register from './Components/Register/Register';
import Logo from './Components/Logo/Logo';
import Facerecog from './Components/FaceRecog/FaceRecog';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Rank from './Components/Rank/Rank';
import deepai from 'deepai'
import './App.css'

deepai.setApiKey('aaa1c5b9-696a-4dc7-bb63-43134e4d86f7');

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
	constructor(){
		super();
		this.state = {
			input : '',
			imageUrl: '',
			box : {},
			route : 'signin',
			isSignedin :false
		}
	}
	calcFaceLoc = (data) =>{
		return{
			left:data.output.faces[0].bounding_box[0],
			top:data.output.faces[0].bounding_box[1],
			width:data.output.faces[0].bounding_box[2],
			height:data.output.faces[0].bounding_box[3]
		}
	}

	displayFaceBox = (box) =>{
		this.setState({box : box});
	}

	onInputChange = (event) => {
		this.setState({input: event.target.value});

	}

	onRouteChange = (route) => {
		if(route==='signout'){
		this.setState({isSignedin : false})
	}else if(route==='home'){
		this.setState({isSignedin : true})
	}
	this.setState({route : route});
	}

	onButtonSubmit = () => {
		this.setState({imageUrl : this.state.input});
		deepai.callStandardApi("facial-recognition", {image: this.state.input,})
		.then(response=> this.displayFaceBox(this.calcFaceLoc(response)))
		.catch(err => console.log(err));
	}
	render(){
		return(
			<div className= "App">
				<Particles className="particles" params= {particleStyle}/>
				<Navigation isSignedin = {this.state.isSignedin} onRouteChange={this.onRouteChange} />
				{this.state.route === 'home' 
				?<div>
					<Logo />
					<Rank />
					<ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
					<Facerecog box ={this.state.box} imageUrl={this.state.imageUrl}/>
				</div>
				: (this.state.route === 'signin' ? 
					<Signin onRouteChange={this.onRouteChange}/>
					:<Register onRouteChange={this.onRouteChange} />
					)
			}
			</div>
			);
	}
}

export default App;

