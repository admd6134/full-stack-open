import axios from "axios";

const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api";

const getCountry = (scope) => {
  const request = axios.get(`${baseUrl}/${scope}`);
  return request.then((response) => response.data);
};

export default { getCountry };
