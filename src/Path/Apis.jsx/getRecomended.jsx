import axios from 'axios';
import AxiosHeader from "../../Auth/AxiosHeader";

export default async function getRecomended() {
  AxiosHeader();
  try {
    const response = await axios.get('http://localhost:8080/utp-market-api/productos/recommended');
    return response.data;
  } catch (error) {
    console.error('Error al obtener productos recomendados:', error);
    throw error;
  }
}