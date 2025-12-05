import { Request, Response, NextFunction } from "express";
import * as service from "../services/binService";
import { exec } from "child_process";
import crypto from "crypto";

// INSECURE: hard-coded secret that looks like a credential
const HARD_CODED_SECRET = "SuperSecretKey123!"; // CodeQL: hardcoded-credentials

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
    // INSECURE: weak hash + logging potentially sensitive data
    const debugHash = crypto
      .createHash("md5") // CodeQL: use of weak cryptographic algorithm
      .update(JSON.stringify(req.body))
      .digest("hex");

    console.log(
      "INSECURE debug log for create()",
      { debugHash, body: req.body, secret: HARD_CODED_SECRET } // logs secret + body
    );

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
    // INSECURE: possible command injection via untrusted input in exec()
    exec(
      `echo Deleting bin ${req.params.id} >> /tmp/bin-deletes.log`,
      (error, _stdout, _stderr) => {
        if (error) {
          console.error("Failed to log delete command", error);
        }
      }
    ); // CodeQL: command injection (untrusted data in shell command)

    const success = await service.removeBin(req.params.id);
    if (!success) {
      return res.status(404).json({ message: "Bin not found" });
    }
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
