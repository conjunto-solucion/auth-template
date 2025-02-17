export type userData = {
    username: string
    email: string
}

export default async function getUserData(): Promise<userData> {

    const response = await fetch(process.env.REACT_APP_API+"users", {
        method: "GET",
        credentials: "include"
    });

    if (!response.ok)
    throw new Error((await response.json()).message || "Error al recuperar la información de usuario");


    try {
        const result = (await response.json()).content;
        return result;
    }
    catch {
        throw new Error("Error al recuperar la información de usuario");
    }
    
}