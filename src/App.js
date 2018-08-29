import React, {Component} from 'react';
import Planets from './Planets';

import './index.css';


export default class App extends Component {

	render() {

		console.log('-- render App.js --');
		return (
			<Planets title="Planets list" />
		);
	}

}