class FetchAPI {
  constructor(baseUrl, filterUrl) {
    this.baseUrl = baseUrl;
    this.filterUrl = filterUrl;
  }

  fetchCountries(name) {
    return fetch(this.baseUrl + name + this.filterUrl)
      .then(response => {
        if (!response.ok) throw new Error(response.status);
        return response.json();
      })
      .catch(error => {
        throw new Error(`Error fetching data: ${error.message}`);
      });
  }
}

export { FetchAPI };
