/*
  Define métodos de validación de datos.
  Cada método devuelve un boolean significando la validez del dato argumentado.
  Opcionalmente llaman a una función pasando como argumento un mensaje de error.
*/

export { default as isValidAccount } from "./isValidAccount";

export function isValidUsername(name: string, setError=(e:string)=>{}): boolean {

  if (name?.trim().length > 100) {
    setError("El nombre no puede superar los 100 caracteres.");
    return false;
  }

  if (name?.trim().length === 0) {
    setError("El nombre no puede estar vacío.");
    return false;
  }

  return true;
}

export function isValidEmail(email: string, setError=(e:string)=>{}): boolean {
    
  if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    setError("El correo electrónico no tiene un formato válido.");
    return false;
  }

  if (email?.length > 100) {
    setError("El correo electrónico no puede superar los 100 caracteres.");
    return false;
  }

  return true;
}


export function isValidPassword(password: string, setError=(e:string)=>{}): boolean {
  if (password?.length < 5) {
    setError("La contraseña debe tener al menos 5 caracteres.");
    return false;
  }
  
  if (password.length > 255) {
    setError("La contraseña no puede superar los 255 caracteres.");
    return false;
  }

  return true;
}

export function isValidImage(file: Blob | File, setError=(e:string)=>{}):boolean {
    
  if (file && file["type"].split('/')[0] !== "image") {
    setError("El archivo ingresado no es una imagen.");
    return false;
  }

  if (file?.size > 2097152) {
    setError("La imágen no debe superar los 2MB");
    return false;
  }

  return true;
}