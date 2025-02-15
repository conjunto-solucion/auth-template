import {Request, Response, NextFunction} from "express";
import jwt from "jsonwebtoken";
import path from "path";
import { fileURLToPath } from "url";
import {configDotenv} from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
configDotenv({path: path.join(__dirname, "../../.env")});


function tokenIsValid(token: string): boolean {
  
  if (!token)
  return false;

  try {
    jwt.verify(token, process.env.JWT_SECRET as string);
    return true;
  }
  
  catch (error) {
    return false;
  }
}


export function authenticateAccessToken(request: Request, response: Response, next: NextFunction): void {

  const accessToken = request.cookies?.accessToken;
  if (!tokenIsValid(accessToken)) {
    response.status(401).json({message: "No tienes permiso para realizar esta operación"});
    return;
  }

  next();
}

export function authenticateRefreshToken(request: Request, response: Response, next: NextFunction): void {

  const refreshToken = request.cookies?.refreshToken;
  if (!tokenIsValid(refreshToken)) {
    response.status(401).json({message: "No tienes permiso para realizar esta operación. Inicia sesión nuevamente."});
    return;
  }

  next();
}