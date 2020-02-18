'use strict';

const userId = 'jjsilas'

/* get url https://api.github.com/users/jjsilas?type=all&type=test*/

const searchURL = 'https://api.github.com/users/';



function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${key}=${params[key]}`)
  return queryItems.join('&');
}

function getUser(query) {
  // const params = {
  //   q: query
  // };
  // const queryString = formatQueryParams(params)
  const url = searchURL + query;

  console.log(url);

  const options = {
    // headers: new Headers({
    //   "X-Api-Key": userId})
  };

  fetch(url, options)

    .then(response => response.json())
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function displayResults(data) {
  const { name, avatar_url, html_url } = data;
  $('#results').html(`
<h3>${name}</h3>
<img src="${avatar_url}"/>
<a href="${html_url}">
${html_url} </a>
`)
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-search-term').val();
    getUser(searchTerm);
  });
}

$(watchForm);