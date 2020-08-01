import React from 'react';
import './Header.css';

export default function Header({ score }) {
	return (
		<header>
			<h1>Guess The Flag</h1>
			{ score >= 0 ? <p id="score">Score: { score }</p> : ''} 
		</header>
	);
}