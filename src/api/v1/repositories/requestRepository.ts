import { db } from "../../../config/firebaseConfig";
import { Request as PickupRequest } from "../models/request";

const collection = db.collection("requests");

export const getAllRequests = async (): Promise<PickupRequest[]> => {
  const snapshot = await collection.get();
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<PickupRequest, "id">)
  }));
};

export const getRequestById = async (id: string): Promise<PickupRequest | null> => {
  const doc = await collection.doc(id).get();
  if (!doc.exists) return null;
  return { id: doc.id, ...(doc.data() as Omit<PickupRequest, "id">) };
};

export const createRequest = async (data: PickupRequest): Promise<PickupRequest> => {
  const docRef = await collection.add(data);
  const created = await docRef.get();
  return { id: docRef.id, ...(created.data() as Omit<PickupRequest, "id">) };
};

export const updateRequest = async (
  id: string,
  data: Partial<PickupRequest>
): Promise<PickupRequest | null> => {
  const docRef = collection.doc(id);
  const existing = await docRef.get();

  if (!existing.exists) return null;

  await docRef.update(data);
  const updated = await docRef.get();
  return { id, ...(updated.data() as Omit<PickupRequest, "id">) };
};

export const deleteRequest = async (id: string): Promise<boolean> => {
  const docRef = collection.doc(id);
  const existing = await docRef.get();
  if (!existing.exists) return false;

  await docRef.delete();
  return true;
};
