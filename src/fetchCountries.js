export function fetchCountries(countryName) {
  return fetch(`https://restcountries.eu/rest/v2/name/${countryName}`)
  .then(response => {
    if (true === response.ok) {
      return response.json();
    } else {
      return response.json().then(
        parsedBody => Promise.reject(parsedBody.message)
      );
    }
  });
}