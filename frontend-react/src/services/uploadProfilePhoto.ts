export default async function uploadProfilePhoto(file: File|Blob): Promise<boolean> {

    const formData = new FormData();
    formData.append("profilePhoto", file);

    const response = await fetch(process.env.REACT_APP_API+"profile_photos", {
        method: "POST",
        body: formData,
        credentials: "include"
    })

    if (response.ok)
    return true;

    try {
        throw new Error((await response.json()).message || "Error al subir la foto de perfil.")
    }
    catch {
        throw new Error("Error al subir la foto de perfil.")
    }
    
}