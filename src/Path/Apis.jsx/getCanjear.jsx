import axios from 'axios';
import AxiosHeader from "../../Auth/AxiosHeader";

export default async function getCanjear() {
  AxiosHeader();
  try {
    const response = await axios.get('http://localhost:8080/utp-market-api/productos/canjear');
    return response.data;
  } catch (error) {
    console.error('Error al obtener productos a canjear:', error);
    throw error;
  }
}
