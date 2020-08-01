import React from 'react';
import './Result.css';

const resultColor = result => result ? '#19e02d' : '#ff2e4d';

export default function Result({ correct, showResults, info, countryName, continueGame }) {
	if(!showResults) return ( <div id="result-container" /> );
	else return (
		<div id="result-container">
			<h3 id="result" style={{ color: resultColor(correct) }} >{ correct ? 'Correct' : 'Wrong' } !</h3>
			{ correct ?
				<div id="country-info-container">
					<p id="country-info-hook">Did you know that... <br /></p>
					<p id="country-info">
					{ countryName }{ info.area ?  ` has an area of ${ info.area.toLocaleString()}` : '.' } square kilometers. { info.capital ? `The capital is ${ info.capital }` : ''}.
					{ info.demonym ? `People from ${ countryName } are called ${ info.demonym }` : ''}. They speak <i>{ info.languages[0] }</i> and use <i>{ info.currency.name }</i>{ info.currency.symbol ? `(${info.currency.symbol})`: '' }.
					</p>
					<p id="continue" onClick={ continueGame }>Continue</p>
				</div>
			  : ''
			}
		</div>
	);
}