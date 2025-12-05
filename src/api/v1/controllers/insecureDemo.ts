// src/controllers/insecureDemo.ts
import { Request, Response, NextFunction } from "express";
import { exec } from "child_process";

// ⚠️ INTENTIONALLY INSECURE – FOR DEMO ONLY ⚠️
export const insecureDemo = (req: Request, res: Response, _next: NextFunction) => {
  // 1) EVAL INJECTION: user controls code
  const userCode = String(req.query.code || "");
  eval(userCode); // CodeQL: eval-injection

  // 2) OS COMMAND INJECTION: user controls command
  const userCmd = String(req.query.cmd || "");
  exec(userCmd, (error, stdout, stderr) => {
    if (error) {
      console.error("Command failed", error);
    }
    console.log(stdout || stderr);
  }); // CodeQL: command-line-injection

  res.send("Insecure demo executed");
};
