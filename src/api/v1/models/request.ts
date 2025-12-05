export interface Request {
  id?: string;
  binId: string;
  residentName: string;
  description: string;
  status: "open" | "in_progress" | "completed";
}