import { Request, Response, NextFunction } from "express";
import * as service from "../services/requestService";

export const getAll = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const requests = await service.listRequests();
    res.status(200).json(requests);
  } catch (err) {
    next(err);
  }
};

export const getById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const request = await service.findRequest(req.params.id);
    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }
    res.status(200).json(request);
  } catch (err) {
    next(err);
  }
};

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const created = await service.addRequest(req.body);
    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updated = await service.editRequest(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ message: "Request not found" });
    }
    res.status(200).json(updated);
  } catch (err) {
    next(err);
  }
};

export const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const success = await service.removeRequest(req.params.id);
    if (!success) {
      return res.status(404).json({ message: "Request not found" });
    }
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
