const BASE_URL = 'URLL'; 

export const getAdmins = async () => {
  try {
    const response = await fetch(`${BASE_URL}/admins`);
    if (!response.ok) {
      throw new Error('Error en la solicitud');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al obtener datos de administradores', error);
    throw error;
  }
};
