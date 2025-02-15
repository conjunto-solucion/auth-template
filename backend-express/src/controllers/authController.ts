import { defaultOk, respond } from "../core/respond.js";
import {Request, Response} from "express";
import * as authServices from "../services/authServices.js";


export async function handleLogin(request: Request, response: Response): Promise<void> {
    const { email, password } = request.body;
    const result = await authServices.login(email, password);

    if (result.ok) {
        const userId = result.serializableBody.userId ?? undefined;
        authServices.generateSessionFromUserId(userId, response);
    }

    respond(response, result);
}

export function handleLogout(_: Request, response: Response): void {
    const result = authServices.logout(response);
    respond(response, result);
}


export function handleRefreshSession(request: Request, response: Response): void {

    const userId = authServices.extractUserIdFromRefreshToken(request);
    authServices.generateSessionFromUserId(userId, response);
    
    respond(response, defaultOk("Sesión refrescada"));
    return;
}