class FetchAPI {
  constructor(baseUrl, filterUrl) {
    this.baseUrl = baseUrl;
    this.filterUrl = filterUrl;
  }

  fetchCountries(name) {
    return fetch(this.baseUrl + name + this.filterUrl).then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    });
  }
}

export { FetchAPI };
