import axios from "axios";
const getImages = axios.create({
  baseURL: "https://pixabay.com/api/",
  params: {
    key: "21917533-94fc46511cdba7fd05c8e408d",
    image_type: "photo",
    orientation: "horizontal",
  },
});

async function imagesApi(q = "", page = 1, per_page = 12) {
  const params = { q, page, per_page };
  try {
    const { data } = await getImages("", { params });
    return data;
  } catch (error) {
    console.error(`No results found for ${q}'`)
  } 
 };



export default imagesApi;


