import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const MAX_COUNTRIES = 10;

import { fetchCountries } from './fetchCountries';

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
  const markup = createCountryMarkup(country);
  countryInfoEl.innerHTML = markup;
}

function createCountryMarkup({ capital, flags, name, languages, population }) {
  return `
          <div class="wrapper">
            <img src="${flags?.svg}" alt="${name?.common}" class="image" />
              <h2>${name?.common}</h2>
          </div>
          <p class="details">Capital: <span class="details-value">${capital}</span></p>
          <p class="details">Population: <span class="details-value">${population}</span></p>
          <p class="details">Languages: <span class="details-value">
          ${Object.values(languages).join(', ')}</span></p>
          `;
}
