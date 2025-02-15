import user from "../types/user.js";
import * as userRepository from "../repositories/userRepository.js";
import { defaultBadRequest, responseInfo } from "../core/respond.js";

const EMAIL_REGEX = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;



export async function createUserAccount(user: user): Promise<responseInfo> {

    if (!(await userRepository.emailIsUnique(user.email)))
        return defaultBadRequest("El correo electrónico ya existe");
    
    if (user.username.length < 1 || user.username.length > 100)
        return defaultBadRequest("El nombre de usuario debe tener entre 1 y 100 caracteres");

    if (!EMAIL_REGEX.test(user.email))
        return defaultBadRequest("El correo electrónico no tiene un formato válido");

    if (user.email.length < 1 || user.email.length > 100)
        return defaultBadRequest("El correo electrónico debe tener entre 1 y 100 caracteres");
    
    if (user.password.length < 5 || user.password.length > 255)
        return defaultBadRequest("La contraseña debe tener entre 5 y 255 caracteres");
        

    return await userRepository.insertUser(user);
}

export async function getUserById(userId: number): Promise<responseInfo> {
    
    if (!userId || userId < 0) {
        return defaultBadRequest("No se pudo determinar el usuario en la sesión actual");
    }

    return await userRepository.getUserById(userId);
}