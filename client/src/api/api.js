import axios from "axios";

const API = axios.create({
  baseURL: "https://cc96-booking-app.onrender.com",
});

export default API;