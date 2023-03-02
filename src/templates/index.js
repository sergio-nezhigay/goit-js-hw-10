export function countriesMarkup(countries) {
  return countries
    .map(
      ({ flags, name }) => `
        <li>
            <div class="wrapper">
                <img
                    src="${flags.svg}"
                    alt="${name.common}"
                    class="image"
                />
                <span class="details-value">${name.common}</span>
            </div>
        </li>
    `
    )
    .join('');
}

export function countryMarkup({ flags, name, capital, population, languages }) {
  return `
        <div class="wrapper">
            <img src="${flags.svg}" alt="${name.common}" class="image" />
            <h2>${name.common}</h2>
        </div>
        <ul>
            <li>
                <p class="details">
                Capital: <span class="details-value">${capital}</span>
                </p>
            </li>
            <li>
                <p class="details">
                Population: <span class="details-value">${population}</span>
                </p>
            </li>
            <li>
                <p class="details">
                Languages:
                <span class="details-value">${Object.values(languages).join(
                  ', '
                )}</span>
                </p>
            </li>
         </ul>
      `;
}
