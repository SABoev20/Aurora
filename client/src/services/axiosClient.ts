import axios from "axios";
import Cookies from "js-cookie";
const axiosClient = axios.create({
  baseURL: "http://localhost:9090/",
  headers: {
    "Content-Type": "application/json",
    "X-XSRF-TOKEN": Cookies.get("XSRF-TOKEN"), // Add CSRF token to headers
  },
});
export default axiosClient;
