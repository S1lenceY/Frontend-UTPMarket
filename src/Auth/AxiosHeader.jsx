import axios from "axios";

const AxiosHeader = () => {
  const jwtToken = localStorage.getItem("jwtToken");

  if (jwtToken) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${jwtToken}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default AxiosHeader;
