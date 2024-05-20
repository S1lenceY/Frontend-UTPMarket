import axios from 'axios';
import AxiosHeader from "../../Auth/AxiosHeader";

export default async function getCupon() {
  AxiosHeader();
  try {
    const response = await axios.get('http://localhost:8080/utp-market-api/cupon');
    return response.data;
  } catch (error) {
    console.error('Error al obtener cupones:', error);
    throw error;
  }
}