import axios from "axios";

const BaseURL = "http://localhost:3000";

export default axios.create({
  baseURL: BaseURL,
  headers: {"Content-Type": "application/json"},
  withCredentials: true
});