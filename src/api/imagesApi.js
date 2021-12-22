const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '21917533-94fc46511cdba7fd05c8e408d';

async function imagesApi(searchQuery, page) {
  const res = await fetch(
    `${BASE_URL}/?key=${API_KEY}&q=${searchQuery}
      &image_type=photo&orientation=horizontal&page=
      ${page}&per_page=12`);
  return await res.json();
}

export default imagesApi;

// const axios = require("axios");
// const getImages = axios.create({
//   baseURL: "https://pixabay.com/api/",
//   params: {
//     key: "21917533-94fc46511cdba7fd05c8e408d",
//     image_type: "photo",
//     orientation: "horizontal",
//   },
// });

// async function imagesApi(q = "", page = 1, per_page = 12) {
//   const params = { q, page, per_page };
//   try {
//     const { data } = await getImages("", { params });
//     return data;
//   } catch (error) {
//     console.error(`No results found for ${q}'`)
//   } 
//  };



// export default imagesApi;


