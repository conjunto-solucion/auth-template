import { respond } from "../core/respond.js";
import {Request, Response} from "express";
import fileUpload from "express-fileupload";
import { extractUserIdFromRefreshToken } from "../services/authServices.js";
import * as profilePhotoServices from "../services/profilePhotoServices.js";


export async function handleUploadProfilePhoto(request: Request, response: Response): Promise<void> {

    const file = request.files?.profilePhoto as fileUpload.UploadedFile ?? undefined;
    const userId = extractUserIdFromRefreshToken(request);
    const result = await profilePhotoServices.uploadUserProfilePhoto(userId, file);
    respond(response, result);
}



export async function handleGetProfilePhoto(request: Request, response: Response): Promise<void> {

    const userId = extractUserIdFromRefreshToken(request);
    const result = await profilePhotoServices.getUserProfilePhotoById(userId);
    respond(response, result);
}