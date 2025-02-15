export default async function getUserAvatar(): Promise<Blob> {

    const response = await fetch(process.env.REACT_APP_API+"profile_photos", {
        method: "GET",
        credentials: "include"
    });

    if (response.ok) {
        return await response.blob();
    } else {
        return null
    }    
}