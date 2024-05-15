export default async function getProducts() {  
  try {

    const jwtToken = localStorage.getItem('jwtToken');

    const response = await fetch('http://localhost:8080/utp-market-api/productos', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${jwtToken}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const jsonResponse = await response.json(); // Parse the JSON response
    if (!Array.isArray(jsonResponse)) {
      throw new Error('Response is not an array');
    }

    const json = jsonResponse.map(item => {
      return {
        id_producto: item.id,
        name: item.name,
        img: '', 
        id_category: item.id_category, 
        price: item.price,
        coin: item.coin
      };
    });

    return json;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}


  {/* 
//export default async function getRecommendedProducts() {
    const response = await fetch('https://http://apiutpmarket-production.up.railway.app/productos/');
    const json = await response.json();
    return json;
  }


//Reorganizar estas funciones
export default async function search(nombre) {
    const response = await fetch(`https://http://apiutpmarket-production.up.railway.app/utp-market-api/productos/buscar?nombre=${nombre}`);
    const json = await response.json();
    return json;
}

// Enviar el comprobante, este te devolverá un JSON que contendrá el id de comprobante que luego se usará para registrar los detalles de compra.
const sendVoucher = await axios.post("https://http://apiutpmarket-production.up.railway.app/utp-market-api/comprobante", {
        fecha: "2024-05-13",
        total: 32.5,
        id_usuario: 2
      });

const comprobanteId = sendVoucher.data.id_comprobante;

//Enviar los detalle de compra que están en el localstorage
async function sendPurchaseDetails(comprobanteId, detallesCompra) {
  for (const detalle of detallesCompra) {
    try {
      await axios.post("https://http://apiutpmarket-production.up.railway.app/utp-market-api/detallecompra", {
        id_comprobante: comprobanteId,
        id_producto: detalle.id_producto,
        cantidad: detalle.cantidad,
        precio: detalle.precio,
        estado_entrega: detalle.estado_entrega,
        estado_pago: detalle.estado_pago
      });
      console.log(`Detalle de compra para el producto ${detalle.id_producto} enviado correctamente.`);
    } catch (error) {
      console.error(`Error al enviar el detalle de compra para el producto ${detalle.id_producto}:`, error);
    }
  }
}

// Ejemplo de uso:
const detallesCompra = [
  { id_producto: 1, cantidad: 2, precio: 1.1, estado_entrega: true, estado_pago: false },
  { id_producto: 2, cantidad: 1, precio: 3.5, estado_entrega: false, estado_pago: false },
  // Agrega más objetos de detalle según sea necesario
];

await enviarDetallesCompra(comprobanteId, detallesCompra);
*/}