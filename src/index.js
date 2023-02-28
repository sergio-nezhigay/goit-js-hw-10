import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const MAX_COUNTRIES = 10;

// import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 1000;
const inputSearchEl = document.querySelector('input#search-box');
const countryInfoEl = document.querySelector('.country-info');

inputSearchEl.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(e) {
  const searchTerm = e.target.value.trim();
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
  if (countries.length > MAX_COUNTRIES)
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  else if (countries.length === 1) showCountry(countries[0]);
  else showCountries(countries);
  return;
}

function showCountries(countries) {
  console.log(countries);
}

function showCountry(country) {
  console.log('🚀 ~ file: index.js:43 ~ showCountry ~ country:', country);
  const markup = createCountryMarkup(country);

  countryInfoEl.insertAdjacentHTML('beforeend', markup);
}

function createCountryMarkup({ capital, flags, name, languages, population }) {
  // console.log('createCountryMarkup', country);
  return `
          <div class="wrapper">
            <img src="https://flagcdn.com/ch.svg" alt="${name}" class="image" />
              <h2>${name}</h2>
          </div>
          <p class="details">Capital: <span class="details-value">${capital}</span></p>
          <p class="details">Population: <span class="details-value">${capital}</span></p>
          <p class="details">Languages: <span class="details-value">
          ${Object.values(languages).join(', ')}</span></p>
          `;
}

const BASE_URL = 'https://restcountries.com/v3.1/name/';
const FILTER_URL = '?fields=name,capital,population,flags,languages';

function fetchCountries(name) {
  return fetch(BASE_URL + name + FILTER_URL)
    .then(response => {
      if (!response.ok) throw new Error(response.status);
      return response.json();
    })
    .catch(error => {
      throw new Error(`Error fetching data: ${error.message}`);
    });
}
