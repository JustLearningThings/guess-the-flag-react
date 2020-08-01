import React, { Component } from 'react';

import './App.css';

import Header from './Header';
import Flag from './Flag';
import Options from './Options';
import Result from './Result';

const OPTIONS_NUM = 3;

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      showResults: false,
      scored: false,
      countries: [],
      guessed: [],
      countryName: '',
      flag: '',
      correct: false,
      options: [''],
      info: {
        area: -1,
        capital: '',
        demonym: '',
        languages: [''],
        currency: {
          name: '',
          symbol: ''
        }
      },
    };

    this.checkAnswer = this.checkAnswer.bind(this);
    this.continueGame = this.continueGame.bind(this);
  }

  shuffle(arr) {
    var k, t;

    for(let i = arr.length - 1; i > 0; i--) {
      k = Math.floor(Math.random() * (i + 1));

      t = arr[i];
      arr[i] = arr[k];
      arr[k] = t;
    }

    return arr;
  }

  componentDidMount() {
    fetch('https://restcountries.eu/rest/v2/all')
      .then(data => data.json())
      .then(data => {
        let shuffledData = this.shuffle(data);
        let rand = Math.floor(Math.random() * shuffledData.length);

        let currentCountryLanguages = [];

        shuffledData[rand].languages.forEach(language => {
          currentCountryLanguages.push(language.name);
        });

        let options = [shuffledData[rand].name];

        for(let i = 0; i < OPTIONS_NUM; i++) {
          let option = shuffledData[rand].name;

          while(options.includes(option))
            option = shuffledData[Math.floor(Math.random() * shuffledData.length)].name;

          options.push(option);
        }

        options = this.shuffle(options);

        this.setState({
          countries: shuffledData,
          score: 0,
          flag: shuffledData[rand].flag,
          countryName: shuffledData[rand].name,
          options,
          info: {
            area: shuffledData[rand].area,
            capital: shuffledData[rand].capital,
            demonym: shuffledData[rand].demonym,
            languages: currentCountryLanguages,
            currency: {
              name: shuffledData[rand].currencies[0].name,
              symbol: shuffledData[rand].currencies[0].symbol
            }
          }
        });
      });
  }

  checkAnswer(answer) {
    const { countryName, scored } = this.state;

    if(scored) return;

    if(answer === countryName && !scored) {
      this.setState(state => ({
        showResults: true,
        correct: true,
        guessed: [...state.guessed, countryName],
        score: state.score + 1,
        scored: true
      }), () => {
        document.getElementById('result-container').scrollIntoView({ behavior: 'smooth' });
      });
    }
    else {
      this.setState({
        showResults: true,
        correct: false
      }, () => {
        document.getElementById('result-container').scrollIntoView({ behavior: 'smooth' });
      });
    }
  }

  continueGame() {
    const { countries, guessed } = this.state;

    let filteredArr = countries.filter(country => !guessed.includes(country.name));
    let rand = Math.floor(Math.random() * filteredArr.length);
    let newCountry = filteredArr[rand];

    let currentCountryLanguages = [];

    newCountry.languages.forEach(language => {
      currentCountryLanguages.push(language.name);
    });

    let options = [newCountry.name];

    for(let i = 0; i < OPTIONS_NUM; i++) {
      let option = newCountry.name;

      while(options.includes(option)) 
        option = countries[Math.floor(Math.random() * countries.length)].name;

      options.push(option);
    }

    options = this.shuffle(options);

    this.setState({
      showResults: false,
      correct: false,
      scored: false,
      options,
      countryName: newCountry.name,
      flag: newCountry.flag,
      info: {
        area: newCountry.area,
        capital: newCountry.capital,
        demonym: newCountry.demonym,
        languages: currentCountryLanguages,
        currency: {
          name: newCountry.currencies[0].name,
          symbol: newCountry.currencies[0].symbol
        }
      }
    }, () => {
      document.getElementById('game-controlls').scrollIntoView({ behavior: 'smooth' });
    });
  }

  render() {
    const { flag, options, correct, showResults, info, countryName, score } = this.state;

    return (
      <div>
        <Header score={ score } />
        <div id="game-controlls">
          <Flag image={ flag } imageAlt={ 'flag' } />
          <Options optionsArray={ options } checkAnswer={ this.checkAnswer } />
        </div>
        <Result correct={ correct } info={ info } countryName={ countryName } showResults={ showResults } continueGame={ this.continueGame } />
      </div>
    );
  }
}

export default App;