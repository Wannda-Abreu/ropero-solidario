import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import DbConfig from '../config/dbConfig';
import Telephone from '../models/telephones';

export const createTelephone = async (req: Request, res: Response): Promise<void> => {
  const { telephone, user_id } = req.body;
  const telephone_id = uuidv4();
  const newTelephone: Telephone = { telephone_id, telephone, user_id };

  try {
    const [result] = await DbConfig.query('INSERT INTO Telephones SET ?', newTelephone);
    res.status(201).send(newTelephone);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error creating telephone' });
  }
};

export const getTelephones = async (req: Request, res: Response): Promise<void> => {
  try {
    const [telephones] = await DbConfig.query('SELECT * FROM Telephones');
    res.status(200).send(telephones);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error getting telephones' });
  }
};

export const getTelephoneById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const [telephone] = await DbConfig.query('SELECT * FROM Telephones WHERE telephone_id = ?', id);

    if (telephone.length === 0) {
      res.status(404).send({ message: 'Telephone not found' });
    } else {
      res.status(200).send(telephone[0]);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error getting telephone by id' });
  }
};

export const updateTelephone = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { telephone, user_id } = req.body;
  const updatedTelephone: Telephone = { telephone_id: id, telephone, user_id };

  try {
    await DbConfig.query('UPDATE Telephones SET ? WHERE telephone_id = ?', [updatedTelephone, id]);
    res.status(200).send(updatedTelephone);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error updating telephone' });
  }
};

export const deleteTelephone = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    await DbConfig.query('DELETE FROM Telephones WHERE telephone_id = ?', id);
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error deleting telephone' });
  }
};
