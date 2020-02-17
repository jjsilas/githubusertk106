'use strict';

const userId = 'jjsilas'

/* get url https://api.github.com/users/jjsilas?type=all&type=test*/

const searchURL = 'https://api.github.com/';



function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${key}=${params[key]}`)
  return queryItems.join('&');
}

function getUser(query) {
  const params = {
    q: query
  };
  const queryString = formatQueryParams(params)
  const url = searchURL + queryString;

  console.log(url);
  
  const options = {
    headers: new Headers({
      "X-Api-Key": userId})
  };

  fetch(url, options)
  /* I tried adding jsonp here - response.jsonp to work around a cors issues */
    .then(response => response.jsonp())
    .then(responseJson => console.log(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-search-term').val();
    getUser(searchTerm);
  });
}

$(watchForm);