import { defaultBadRequest, responseInfo } from "../core/respond.js";
import fileUpload from "express-fileupload";
import * as profilePhotoRepository from "../repositories/profilePhotoRepository.js";


export async function uploadUserProfilePhoto(userId: number, file: fileUpload.UploadedFile | undefined): Promise<responseInfo> {
    
    if (userId <= 0)
    return defaultBadRequest("Id de usuario inválido");
    
    if (file == undefined)
    return defaultBadRequest("No se detectó un archivo a subir");
    
    if (!file.mimetype.startsWith("image"))
    return defaultBadRequest("El archivo subido no tiene un formato válido");

    if (file.size > 2*1024*1024)
    return defaultBadRequest("La imagen no puede superar los 2MB");


    return await profilePhotoRepository.uploadUserProfilePhoto(userId, file);
}

export async function getUserProfilePhotoById(userId: number): Promise<responseInfo> {

    if (!userId || userId < 0)
    return defaultBadRequest("No se pudo determinar el usuario en la sesión actual");

    return await profilePhotoRepository.getUserProfilePhotoById(userId);
}