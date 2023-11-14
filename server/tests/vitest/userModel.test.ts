import {expect, test ,describe} from 'vitest';
import UserModel from '../../src/models/userModel';
import User from '../../src/types/userTypes';


describe('Testing the user Model', () => {
    test('UserModel.findAll should return a Array of Users', () => {
      expect(UserModel.findAll()).instanceOf(Promise<Array<User>>)
    }),
    test('UserModel.findById should return a  Users Object', async () => {
      let getById = await UserModel.findById('b26edb44-802d-11ee-aca4-a85e45c11908');
      console.log(getById)
      expect(UserModel.findById('b26edb44-802d-11ee-aca4-a85e45c11908')).instanceOf(Promise<User>)
    }),
    test('UserModel.findByName should return a  Id string', async() => {
      let user =  await UserModel.findByName('John');
      console.log(user);

       if(user!= null){
         let {user_id,user_name, surname, user_password, nationality, family_members_id, zip_code_id, reference_center_id} = user[0];
         expect(user_id).toBe('b26edb44-802d-11ee-aca4-a85e45c11908')
       }
       
      

      
      
    })

})

