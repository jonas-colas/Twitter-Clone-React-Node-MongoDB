import React from 'react'
import loader from './loader.gif'

const Loader = () => {
	return (
		<div className="fp-container">
			<img src={loader} className="fp-loader" width="5%" alt="loading" />
		</div>
	)
}

export default Loader