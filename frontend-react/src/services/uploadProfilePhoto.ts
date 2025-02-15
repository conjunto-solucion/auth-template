export default async function uploadProfilePhoto(file: File|Blob): Promise<Response> {

    const formData = new FormData();
    formData.append("profilePhoto", file);

    const response = await fetch(process.env.REACT_APP_API+"profile_photos", {
        method: "POST",
        body: formData,
        credentials: "include"
    })

    if (!response.ok)
    throw new Error((await response.json()).message || "Error al subir la foto de perfil.")

    return response
}