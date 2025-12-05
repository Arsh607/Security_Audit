export interface Bin {
  id?: string;
  location: string;
  type: "recyclable" | "organic" | "general";
  fillLevel: number; // 0–100
}