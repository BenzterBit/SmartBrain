import React from 'react'
import './FaceRecog.css'

const FaceRecog = ({box,imageUrl}) => {
	return (
		<div className='center ma'>
		<div className='absolute mt2'>
			<img alt='' src={imageUrl} />
			<div className='bounding-box' style={{left: box.left , top: box.top, width:box.width ,height:box.height}}></div>
		</div>
		</div>
		);
}



export default FaceRecog;