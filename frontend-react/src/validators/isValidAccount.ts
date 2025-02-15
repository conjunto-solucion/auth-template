import user from "../types/user"
import * as Validator from "./index"

export default function isValidAccount(user: user, passwordMatch: string, profilePhoto: Blob|File, setError=(e:string)=>{}): boolean {
  setError("");

  if (!Validator.isValidUsername(user.username, setError)) return false;
  if (!Validator.isValidEmail(user.email, setError)) return false;
  if (!Validator.isValidPassword(user.password, setError)) return false;
  if (user.password !== passwordMatch) {
    setError("Las contraseñas no coinciden");
    return false;
  }
  if (!Validator.isValidImage(profilePhoto, setError)) return false;

  return true;
};