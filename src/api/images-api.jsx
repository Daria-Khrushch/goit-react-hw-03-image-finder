const API_KEY = '21917533-94fc46511cdba7fd05c8e408d';
const BASE_URL = 'https://pixabay.com/api/';

function fetchCard(name, page) {
  console.log(name);
  return fetch(
    `${BASE_URL}?q=${name}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`,
  ).then(response => {
    if (response.ok) {
      return response.json();
    }

    return Promise.reject(new Error(`Not found ${name}`));
  });
}

const api = { fetchCard };

export default api;
