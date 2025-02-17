import user from "../types/user"


export default async function postUser(user: user): Promise<boolean> {

  const response = await fetch(process.env.REACT_APP_API+"users", {
    method: "POST",
    body: userToJson(user),
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    }
  });

  if (response.ok)
    return true;

  try {
    const errorData = await response.json()
    throw new Error(errorData.message || "Error en el registro") 
  }
  catch {
    throw new Error("Error en el registro")
  }
  
} 


function userToJson(user: user): string {
  return JSON.stringify({
    username:     user.username.trim(),
    email:        user.email.trim(),
    password:     user.password.trim(),
  });
}
