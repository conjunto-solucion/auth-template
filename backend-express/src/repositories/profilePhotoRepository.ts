import { pool, uploadFile, resolveUploadedFilePath } from "../core/database.js";
import fileUpload from "express-fileupload";
import { defaultBadRequest, defaultInternalServerError, defaultOk, defaultWithFile, responseInfo } from "../core/respond.js";


export async function uploadUserProfilePhoto(userId: number, file: fileUpload.UploadedFile): Promise<responseInfo> {
    
    const queryString = `UPDATE "user" SET profile_photo = $1 WHERE user_id = $2`;

    try {
        const filepath = uploadFile(file, userId.toString());
        await pool.query(queryString, [filepath, userId]);
        return defaultOk("Imagen subida correctamente");
    }

    catch (error) {
        return defaultInternalServerError("Error al guardar la imagen", error);
    }
}

export async function getUserProfilePhotoById(userId: number): Promise<responseInfo> {
    
    const queryString = `SELECT profile_photo FROM "user" WHERE user_id = $1`;

    try {

        const result = await pool.query(queryString, [userId]);

        if (result.rowCount === 0)
        return defaultBadRequest("Id de usuario inválido al recuperar foto de perfil")
        
        if (!result.rows[0].profile_photo)
        return defaultBadRequest("El usuario no tiene foto de perfil");

        const filePath = resolveUploadedFilePath(result.rows[0].profile_photo);
        
        return defaultWithFile(filePath);
    }
    catch (error) {
        return defaultInternalServerError("Error al recuperar la imagen de perfil", error);
    }
}