export default async function getUsers(jwtToken) {
    const url = 'http://localhost:8080/utp-market-api/usuarios';
    
    const headers = {
        'Authorization': `Bearer ${jwtToken}`,
        'Content-Type': 'application/json'
    };

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: headers
        });

        if (!response.ok) {
            throw new Error('Error al obtener usuarios');
        }

        const json = await response.json();
        return json;
    } catch (error) {
        console.error('Error en la solicitud getUsers:', error);
        return null;
    }
}
