import { Bin } from "../models/bin";
import * as repo from "../repositories/binRepository";

export const listBins = () => repo.getAllBins();

export const findBin = (id: string) => repo.getBinById(id);

export const addBin = (payload: Bin) => repo.createBin(payload);

export const editBin = (id: string, payload: Partial<Bin>) => repo.updateBin(id, payload);

export const removeBin = (id: string) => repo.deleteBin(id);
