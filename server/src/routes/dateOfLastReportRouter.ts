import { Router } from "express";
import {getDateOfLastReports, getDateOfLastReportById, createDateOfLastReport, updateDateOfLastReport, deleteDateOfLastReport } from "../controllers/dateOfLastReportController";

const DateOfLastReportRouter = Router ();

    DateOfLastReportRouter.get('/', getDateOfLastReports);
    DateOfLastReportRouter.get('/:id', getDateOfLastReportById);
    DateOfLastReportRouter.post('/', createDateOfLastReport);
    DateOfLastReportRouter.put('/:id',updateDateOfLastReport);
    DateOfLastReportRouter.delete('/:id',deleteDateOfLastReport);

export default DateOfLastReportRouter;
    
    
