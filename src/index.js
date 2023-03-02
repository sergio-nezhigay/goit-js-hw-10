import './css/styles.css';

import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

import { FetchAPI } from './fetchCountries';
import { countryMarkup, countriesMarkup } from './templates';

const MAX_COUNTRIES = 10;
const DEBOUNCE_DELAY = 300;
const BASE_URL = 'https://restcountries.com/v3.1/name/';
const FILTER_URL = '?fields=name,capital,population,flags,languages';

const inputSearchEl = document.querySelector('input#search-box');
const countryInfoEl = document.querySelector('.country-info');
const countryListEl = document.querySelector('.country-list');

const countryAPI = new FetchAPI(BASE_URL, FILTER_URL);

inputSearchEl.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(e) {
  const searchTerm = e.target.value.trim();
  countryInfoEl.innerHTML = '';
  countryListEl.innerHTML = '';
  if (searchTerm.length > 0)
    countryAPI
      .fetchCountries(searchTerm)
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

function showCountry(country) {
  countryInfoEl.innerHTML = countryMarkup(country);
}

function showCountries(countries) {
  countryListEl.innerHTML = countriesMarkup(countries);
}
