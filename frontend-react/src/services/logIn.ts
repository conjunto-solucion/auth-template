export default async function logIn(email: string, password: string): Promise<boolean> {
  
  const response = await fetch(process.env.REACT_APP_API+"auth", {
    method: "POST",
    body: JSON.stringify({
      email: email.trim(),
      password: password.trim()
    }),
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    }
  });
  

  if (response.ok) {
    return true;
  }

  try {
    const json = await response.text();
    throw new Error(JSON.parse(json).message || "Usuario o contraseña incorrecta");
  }
  catch {
    throw new Error("Error inesperado");
  }
}