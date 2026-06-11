import axios from "axios";

const api = axios.create({
  baseURL:
    "https://travel-backend-c4y9.onrender.com"
});

export default api;
