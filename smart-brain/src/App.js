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
			isSignedin :false,
			user:{
				id:'',
				name:'',
				email: '',
				password:'',
				entries: '',
				joined:''
			}
		}
	}

	loadUser = (data)=>{
		this.setState({user:{
			id:data.id,
			name:data.name,
			email: data.email,
			password:data.password,
			entries: data.entries,
			joined: data.joined
		}})
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
		.then(response=> {
			if(response){
				fetch('http://localhost:3000/image',{
					method: 'put',
		            headers: {'Content-Type': 'application/json'},
		            body: JSON.stringify({
		              id: this.state.user.id
		            })
				})
			.then(response =>response.json())
			.then(count => {
			this.setState(Object.assign(this.state.user,{entries:count}))
			})
		}
	this.displayFaceBox(this.calcFaceLoc(response))
	}).catch(err => console.log(err));
	}

	render(){
		return(
			<div className= "App">
				<Particles className="particles" params= {particleStyle}/>
				<Navigation isSignedin = {this.state.isSignedin} onRouteChange={this.onRouteChange} />
				{this.state.route === 'home' 
				?<div>
					<Logo />
					<Rank 
					name={this.state.user.name}
                	entries={this.state.user.entries}
                	/>
					<ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
					<Facerecog box ={this.state.box} imageUrl={this.state.imageUrl}/>
				</div>
				: (this.state.route === 'signin' ? 
					<Signin loadUser ={this.loadUser} onRouteChange={this.onRouteChange}/>
					:<Register loadUser ={this.loadUser} onRouteChange={this.onRouteChange} />
					)
			}
			</div>
			);
	}
}

export default App;

