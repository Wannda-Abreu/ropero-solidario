import {expect, test ,describe} from 'vitest';
import UserModelMock from '../mocks/userModel.mock';
import User from '../../src/types/userTypes';


describe('Testing the user Model', () => {
    test('UserModel.findAll should return a Array of Users', () => {
      expect(UserModelMock.findAll()).instanceOf(Promise<Array<User>>)
    }),
    test('UserModel.findById should return a  Users Object', () => {
      expect(UserModelMock.findById('eed6df98-7e85-11ee-9707-a85e45c11908')).instanceOf(Promise<User>)
    })
})

