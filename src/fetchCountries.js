export function fetchCountries(countryName){
  return fetch(`https://restcountries.eu/rest/v2/name/${countryName}`)
    .then(response => {
      return response.json()
    })
    .catch(e => {
      error({text: e.message || 'Error'})
    });
};
