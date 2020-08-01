import React from 'react';
import './Flag.css';

export default function Flag({ image, imageAlt }) {
	return <img id="flag" src={ image } alt={ imageAlt } />
}