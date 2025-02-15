import argon2 from "argon2";
import {pool} from "../core/database.js";
import { defaultBadRequest, defaultInternalServerError, defaultOk, responseInfo } from "../core/respond.js";

export async function login(email: string, password: string): Promise<responseInfo> {

  const queryString = `SELECT password, user_id FROM "user" WHERE email = $1`;

  try {
    const result = await pool.query(queryString, [email]);

    if (result.rowCount != 0 && await argon2.verify(result.rows[0].password, password))
    return defaultOk("Inicio de sesión exitoso", { userId: result.rows[0].user_id });
    
    else
    return defaultBadRequest("Correo electrónico o contraseña incorrecta");
  }

  catch (error) {
    return defaultInternalServerError("Error al iniciar sesión", error);
  }
}