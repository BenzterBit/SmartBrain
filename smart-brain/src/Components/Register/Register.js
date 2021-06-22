import React from 'react'
import validator from 'validator'
import passValidator from 'password-validator'

class Register extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			email:'',
			password:'',
			name:'',
			emailError:'',
			passwordError:''
		}
	}


	onEmailChange = (event)=>{
		var email = event.target.value

		if (validator.isEmail(email)) {
			this.setState({email:event.target.value})
			this.setState( {emailError:''})
		} else {
			this.setState( {emailError:'Enter valid Email!'})
		}
	}

	onPasswordChange = (event)=>{

		var schema = new passValidator();
		schema
		.is().min(6)                                    
		.is().max(16)                                 
		.has().uppercase()                              
		.has().lowercase()                              
		.has().digits(2)                                
		.has().not().spaces()
		.has().symbols();

		var pass = event.target.value
		if(schema.validate(pass)){
			this.setState({password:event.target.value})
			this.setState({passwordError:''})
		}
		else
			this.setState({passwordError:'Password must be min 6 max 16, one upper , one lower, 2 num and symbol  and no space'})
	}

	onNameChange = (event)=>{
		this.setState({name:event.target.value})
	}
	onSubmitRegister = () =>{
		if(this.state.emailError==='' && this.state.email!=='' && this.state.passwordError===''){
		fetch('http://localhost:3000/register', {
			method: 'post',
			headers: {'Content-Type':'application/json'},
			body : JSON.stringify({
				email:this.state.email,
				password:this.state.password,
				name:this.state.name
			})
		}).then(response => response.json())
			.then(user => {
				if (user){
					this.props.loadUser(user)
					this.props.onRouteChange('home');
				}
			})
		}else{
			//dont do anything
		}	
	}
	render() {
	
	return (
		<article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
		<main className="pa4 black-80">
			<div className="measure center">
			<div>
			    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
			      <legend className="f1 fw6 ph0 mh0">Register</legend>
			      <div className="mt3">
			        <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
			        <input onChange={this.onNameChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name"  id="name"/>
			      </div>
			      <div className="mt3">
			        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
			        <input onChange={this.onEmailChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address"/><br/>
			        <span style={{fontWeight: 'bold',color: 'red',}}>{this.state.emailError}</span>
			      </div>
			      <div className="mv3">
			        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
			        <input onChange={this.onPasswordChange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password"/>
			        <span style={{fontWeight: 'bold',color: 'red',}}>{this.state.passwordError}</span>
			      </div>
			    </fieldset>
			    <div className="">
			      <input onClick={this.onSubmitRegister} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib pointer" type="submit" value="Register"/>
			    </div>
			</div>
  			</div>
  			</main>
  		</article>
		);
	}
}


export default Register;