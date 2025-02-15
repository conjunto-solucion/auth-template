export type userData = {
    username: string
    email: string
}

export default async function getUserData(): Promise<userData> {

    const response = await fetch(process.env.REACT_APP_API+"users", {
        method: "GET",
        credentials: "include"
    });

    if (response.ok) {
        return (await response.json()).content;
    } else {
        throw new Error((await response.json()).message || "Error al recuperar la información de usuario")
    }    
}