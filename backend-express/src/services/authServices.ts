import jwt from "jsonwebtoken";
import {Response, Request} from "express";
import * as authRepository from "../repositories/authRepository.js";
import { defaultBadRequest, defaultOk, responseInfo } from "../core/respond.js";

const ACCESS_JWT_EXPIRATION_TIME_IN_SECONDS = 3600; // 1 hora
const REFRESH_JWT_EXPIRATION_TIME_IN_SECONDS = 604800; // 1 semana
const ISSUER = "express-auth-api";
const KEY = process.env.JWT_SECRET as jwt.Secret;
const EMAIL_REGEX = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;



function generateJWT(userId: number, expiresInSeconds: number): string {
    const token = jwt.sign({ userId: userId }, KEY, { issuer: ISSUER, expiresIn: expiresInSeconds });
    return token;
}


export function generateSessionFromUserId(userId: number, response: Response): void {
    const accessToken = generateJWT(userId, ACCESS_JWT_EXPIRATION_TIME_IN_SECONDS);
    const refreshToken = generateJWT(userId, REFRESH_JWT_EXPIRATION_TIME_IN_SECONDS);

    response.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: ACCESS_JWT_EXPIRATION_TIME_IN_SECONDS * 1000,
    });

    response.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: REFRESH_JWT_EXPIRATION_TIME_IN_SECONDS * 1000,
    });    
}


export function extractUserIdFromRefreshToken(request: Request): number {

    const token = request.cookies?.refreshToken;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: number };
        return decoded.userId;
    }
    catch {
        return -1;
    }
}

export async function login(email: string, password: string): Promise<responseInfo> {

    if (!email || !password)
    return defaultBadRequest("Correo electrónico o contraseña incorrecta");

    if (email.length < 1 || email.length > 100 || !EMAIL_REGEX.test(email) || password.length < 5 || password.length > 255)
    return defaultBadRequest("Correo electrónico o contraseña incorrecta");
        
    return await authRepository.login(email, password);
}

export function logout(response: Response): responseInfo {
    response.clearCookie("accessToken");
    response.clearCookie("refreshToken");

    return defaultOk("Cierre de sesión exitoso");
}