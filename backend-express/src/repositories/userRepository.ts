import user, { accessibleUser } from "../types/user.js";
import argon2 from "argon2";
import {pool} from "../core/database.js";
import { defaultCreated, defaultInternalServerError, defaultNotFound, defaultOk, responseInfo } from "../core/respond.js";


export async function emailIsUnique(email: string): Promise<boolean> {
  const queryString = `SELECT user_id FROM "user" WHERE email = $1`;
  try {
    const result = await pool.query(queryString, [email]);
    return result.rowCount === 0;
  }

  catch (error) {
    console.error("Error al determinar unicidad de email: "+error);
    return false;
  }
}




export async function insertUser(user: user): Promise<responseInfo> {
  
  const queryString = `INSERT INTO "user" (username, email, password) VALUES ($1, $2, $3) RETURNING user_id`;

  try {
    const hashedPassword = await argon2.hash(user.password);
    const result = await pool.query(queryString, [user.username, user.email, hashedPassword]);

    return defaultCreated("Se ha creado la cuenta de usuario", { userId: result.rows[0].user_id });
  }

  catch (error) {
    return defaultInternalServerError("Error al crear la cuenta de usuario", error);
  }
}




export async function getUserById(userId: number): Promise<responseInfo> {
  
  const queryString = `SELECT username, email FROM "user" WHERE user_id = $1`;
  
  try {
    const result = await pool.query(queryString, [userId]);

    if (result.rowCount === 0)
    return defaultNotFound;

    const accessibleUser: accessibleUser = { email: result.rows[0].email, username: result.rows[0].username };
    return defaultOk("Usuario recuperado exitosamente", accessibleUser);
  }

  catch (error) {
    return defaultInternalServerError("Error al recuperar los datos de la cuenta de usuario", error);
  }
}