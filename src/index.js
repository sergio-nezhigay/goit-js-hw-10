import countryTml from './templates/country.hbs';
import countriesTml from './templates/countries.hbs';

import { fetchCountries } from './fetchCountries';

import './css/styles.css';

import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const MAX_COUNTRIES = 10;

const DEBOUNCE_DELAY = 300;
const inputSearchEl = document.querySelector('input#search-box');
const countryInfoEl = document.querySelector('.country-info');
const countryListEl = document.querySelector('.country-list');

inputSearchEl.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(e) {
  const searchTerm = e.target.value.trim();
  countryInfoEl.innerHTML = '';
  countryListEl.innerHTML = '';
  if (searchTerm.length > 0)
    fetchCountries(searchTerm)
      .then(countries => processCountries(countries))
      .catch(err => {
        if (err.message.includes('404'))
          Notiflix.Notify.failure('Oops, there is no country with that name');
        else Notiflix.Notify.failure(`Oops, an error occurred: ${err.message}`);
      });
}

function processCountries(countries) {
  if (countries.length === 1) showCountry(countries[0]);
  else if (countries.length <= MAX_COUNTRIES) showCountries(countries);
  else
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  return;
}

function showCountries(countries) {
  countryListEl.innerHTML = countriesTml(countries);
}

function showCountry(country) {
  country.languagesString = Object.values(country.languages).join(', '); // Sorry couldn't do better :(
  countryInfoEl.innerHTML = countryTml(country);
}
