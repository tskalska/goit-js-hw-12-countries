import './sass/main.scss';
import {fetchCountries} from './fetchCountries';
import { alert, notice, info, success, error } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';

const inputEl = document.querySelector('.country-input');
const cardContainerEl = document.querySelector('.card-container');
const debounce = require('lodash.debounce');

inputEl.addEventListener('input', debounce(onInputChange, 500));

function onInputChange(ev) {
  cardContainerEl.innerHTML = '';
  fetchCountries(ev.target.value).then(data => { renderCountries(data); });
};

function renderCountries(countriesData) {
  const countriesCount = countriesData.length;

  if (countriesCount === 1) {
    let name, capital, languages, population, flag;
    ({name, capital, languages, population, flag} = countriesData[0]);
  
    cardContainerEl.insertAdjacentHTML('afterbegin',`
    <div>Country name: ${name}</div>
    <div>Capital: ${capital}</div>
    <div>Languages: ${languages.map(lang => lang.name).join(', ')}</div>
    <div>Population: ${population}</div>
    <div><img src="${flag}" alt="flag" width="300" height="200"></div>`)
    return;
  }

  if (countriesCount > 10) {
    return alert({
      text: "To many matches found. Please enter a more specific query!",
      type: 'info'
    });
  }

  countriesData.forEach (el=>{
    const cardListEL = document.createElement('ul');
    cardListEL.insertAdjacentHTML('afterbegin',
    `<li>${el.name}</li>`)
    cardContainerEl.appendChild(cardListEL);
    return;
  })
}


