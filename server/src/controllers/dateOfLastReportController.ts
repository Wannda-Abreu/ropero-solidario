import { Request, Response } from 'express';
import DateOfLastReportModel from '../models/dateOfLastReportModel';
import DateOfLastReport from '../types/dateOfLastReportTypes';

const getDateOfLastReports = async (_req: Request, res: Response): Promise<Response> => {
  try {
    const dateOfLastReports = await DateOfLastReportModel.findAll();

    if (!dateOfLastReports) {
      return res.status(404).json({ message: 'DateOfLastReport not found' });
    }

    return res.status(200).json(dateOfLastReports);
  } catch (error: unknown) {
    return res.status(500).json({ message: (error as Error).message });
  }
};

const getDateOfLastReportById = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;

  try {
    const dateOfLastReport = await DateOfLastReportModel.findById(id);

    if (!dateOfLastReport) {
      return res.status(404).json({ message: 'DateOfLastReport not found' });
    }

    return res.status(200).json(dateOfLastReport);
  } catch (error: unknown) {
    return res.status(500).json({ message: (error as Error).message });
  }
};

const createDateOfLastReport = async (req: Request, res: Response): Promise<Response> => {
  const dateOfLastReportData: DateOfLastReport = req.body;

  try {
    const newDateOfLastReport = await DateOfLastReportModel.create(dateOfLastReportData);

    if (!newDateOfLastReport) {
      return res.status(500).json({ message: 'Failed to create DateOfLastReport' });
    }

    return res.status(201).json(newDateOfLastReport);
  } catch (error: unknown) {
    return res.status(500).json({ message: (error as Error).message });
  }
};

const updateDateOfLastReport = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  const updatedDateOfLastReportData: DateOfLastReport = req.body;

  try {
    const updatedDateOfLastReport = await DateOfLastReportModel.update(updatedDateOfLastReportData, id);

    if (!updatedDateOfLastReport) {
      return res.status(404).json({ message: 'DateOfLastReport not found' });
    }

    return res.status(200).json(updatedDateOfLastReport);
  } catch (error: unknown) {
    return res.status(500).json({ message: (error as Error).message });
  }
};

const deleteDateOfLastReport = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;

  try {
    const deletedDateOfLastReport = await DateOfLastReportModel.deleteById(id);

    if (!deletedDateOfLastReport) {
      return res.status(404).json({ message: 'DateOfLastReport not found' });
    }

    return res.status(200).json(deletedDateOfLastReport);
  } catch (error: unknown) {
    return res.status(500).json({ message: (error as Error).message });
  }
};

export {
  getDateOfLastReports,
  getDateOfLastReportById,
  createDateOfLastReport,
  updateDateOfLastReport,
  deleteDateOfLastReport,
};
