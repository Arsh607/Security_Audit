import { Request, Response, NextFunction } from "express";
import * as service from "../services/binService";

export const getAll = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const bins = await service.listBins();
    res.status(200).json(bins);
  } catch (err) {
    next(err);
  }
};

export const getById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const bin = await service.findBin(req.params.id);
    if (!bin) {
      return res.status(404).json({ message: "Bin not found" });
    }
    res.status(200).json(bin);
  } catch (err) {
    next(err);
  }
};

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const created = await service.addBin(req.body);
    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updated = await service.editBin(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ message: "Bin not found" });
    }
    res.status(200).json(updated);
  } catch (err) {
    next(err);
  }
};

export const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const success = await service.removeBin(req.params.id);
    if (!success) {
      return res.status(404).json({ message: "Bin not found" });
    }
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
