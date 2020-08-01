import React from 'react';
import './Options.css';

export default function Options({ optionsArray, checkAnswer }) {
	let options = [];

	optionsArray.forEach(option => {
		options.push(
			<div className="options-input" key={ option }>
				<input type="radio" name="flag-guess" value={ option } onClick={ e => checkAnswer(e.target.value) } />
				<label onClick={ e => checkAnswer(e.target.innerText) } >{ option }</label>
			</div>
		);
	});

	return (
		<div id="options">
			{ options }
		</div>
	);
}