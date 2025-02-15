export default async function logIn(email: string, password: string) {
  
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
  
  const json = await response.text();

  if (response.ok) {
    return response;
  }
  else {
    throw new Error(JSON.parse(json).message || "Usuario o contraseña incorrecta");
  }
}