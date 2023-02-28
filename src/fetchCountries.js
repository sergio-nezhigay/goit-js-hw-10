const BASE_URL = 'https://restcountries.com/v3.1/name/';
const FILTER_URL = '?fields=name,capital,population,flags,languages';

function fetchCountries(name) {
  return fetch(BASE_URL + name + FILTER_URL)
    .then(response => {
      if (!response.ok) throw new Error(response.status);
      return response.json();
    })
    .catch(error => {
      console.log(error);
      throw new Error(`Error fetching data: ${error.message}`);
    });
}

export { fetchCountries };
