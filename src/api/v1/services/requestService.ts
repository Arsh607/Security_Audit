import { Request as PickupRequest } from "../models/request";
import * as repo from "../repositories/requestRepository";

export const listRequests = () => repo.getAllRequests();

export const findRequest = (id: string) => repo.getRequestById(id);

export const addRequest = (payload: PickupRequest) => repo.createRequest(payload);

export const editRequest = (id: string, payload: Partial<PickupRequest>) =>
  repo.updateRequest(id, payload);

export const removeRequest = (id: string) => repo.deleteRequest(id);
