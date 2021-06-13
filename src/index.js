import './sass/main.scss';
import {fetchCountries} from './fetchCountries';
import { alert } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';
import countrycard from './tamplates/countrycard.hbs'
import countriesList from './tamplates/countriesList.hbs'

const debounce = require('lodash.debounce');
const inputEl = document.querySelector('.country-input');
const cardContainerEl = document.querySelector('.card-container');


inputEl.addEventListener('input', debounce(onInputChange, 500));

function onInputChange(event) {
  cardContainerEl.innerHTML = '';
  const countryInputName = event.target.value.trim();

  if (!countryInputName) {
    return;
  }

  fetchCountries(countryInputName)
  .then(renderCountriesCard)
  .catch(error => {
      return alert({
        text: error,
        type: 'error',
      });
    
  });
}

function renderCountriesCard(countriesData) {

  const countriesCount = countriesData.length;

  if (countriesCount === 1) {
    cardContainerEl.insertAdjacentHTML('afterbegin', countrycard(countriesData[0]));
    return;
  }

  if (countriesCount > 1 && countriesCount < 10) {
    cardContainerEl.insertAdjacentHTML('afterbegin',
      countriesList({countriesData})
    );
    return ;
  };

  return alert({
    text: "Too many matches found. Please enter a more specific query!",
    type: 'info',
  });
}