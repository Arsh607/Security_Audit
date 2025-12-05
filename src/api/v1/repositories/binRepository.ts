import { db } from "../../../config/firebaseConfig";
import { Bin } from "../models/bin";

const collection = db.collection("bins");

export const getAllBins = async (): Promise<Bin[]> => {
  const snapshot = await collection.get();
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<Bin, "id">)
  }));
};

export const getBinById = async (id: string): Promise<Bin | null> => {
  const doc = await collection.doc(id).get();
  if (!doc.exists) return null;

  return { id: doc.id, ...(doc.data() as Omit<Bin, "id">) };
};

export const createBin = async (data: Bin): Promise<Bin> => {
  const docRef = await collection.add(data);
  const created = await docRef.get();
  return { id: docRef.id, ...(created.data() as Omit<Bin, "id">) };
};

export const updateBin = async (id: string, data: Partial<Bin>): Promise<Bin | null> => {
  const docRef = collection.doc(id);
  const existing = await docRef.get();

  if (!existing.exists) return null;

  await docRef.update(data);
  const updated = await docRef.get();
  return { id, ...(updated.data() as Omit<Bin, "id">) };
};

export const deleteBin = async (id: string): Promise<boolean> => {
  const docRef = collection.doc(id);
  const existing = await docRef.get();
  if (!existing.exists) return false;

  await docRef.delete();
  return true;
};
