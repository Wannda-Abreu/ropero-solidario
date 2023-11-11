import {expect, test ,describe} from 'vitest';
import UserModel from '../../src/models/userModel';
import User from '../../src/types/userTypes';


describe('Testing the user Model', () => {
    test('UserModel.findAll should return a Array of Users', () => {
      expect(UserModel.findAll()).instanceOf(Promise<Array<User>>)
    }),
    test('UserModel.findById should return a  Users Object', () => {
      expect(UserModel.findById('62cdf82e-7fd2-11ee-aca4-a85e45c11908')).instanceOf(Promise<User>)
    })
})

