import React from 'react'
import './ImageLinkForm.css'

const ImageLinkForm = ({onInputChange, onButtonSubmit}) => {
	return (
		<div >
			<p className="f3"> A face detector, to detect those beautiful Faces. Try it!!! </p>
			<div className='center'>
				<div className='form center pa4 br3 shadow-5 form'>
					<input className="f4 w-70 center pa2"type="text" onChange={onInputChange}/>
					<button className="w-30 grow link f4 ph3 pv2 dib white bg-light-purple" onClick={onButtonSubmit}> Detect </button>
				</div>
			</div>	
		</div>
		
		);
}
export default ImageLinkForm;