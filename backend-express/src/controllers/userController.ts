import {Request, Response} from "express";
import * as userServices from "../services/userServices.js";
import * as authServices from "../services/authServices.js";
import { respond } from "../core/respond.js";
import user from "../types/user.js";



export async function handleCreateUserAccount(request: Request, response: Response): Promise<void> {

    let { username, email, password }: user = request.body;
    username = username?.trim();
    email = email?.trim().toLowerCase();
    password = password?.trim();

    const result = await userServices.createUserAccount({ username, email, password });

    if (result.ok && result.serializableBody) {
        const userId = result.serializableBody.userId ?? undefined;
        authServices.generateSessionFromUserId(userId, response);
    }
    
    respond(response, result);
}


export async function handleGetUser(request: Request, response: Response): Promise<void> {

    const userId = authServices.extractUserIdFromRefreshToken(request);
    const result = await userServices.getUserById(userId);

    respond(response, result);
}