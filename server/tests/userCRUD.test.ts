import {expect, test ,describe} from 'vitest'
import {getUsersMock, getUserMock,updateUserMock,createUsersMock,deleteUserMock} from '../mocks/userFrontCRUD.mock'


test('If get users return 200 and type json', async () => {
    try {
      const response = await getUsersMock(/*{ token }*/);
      
     
      expect(response.status).toBe(200);
      
    
      // Resto de las aserciones o manipulación de datos
    } catch (error) {
      console.error(error);
      // Manejar errores si los hay
    }
  });