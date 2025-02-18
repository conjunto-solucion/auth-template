export default async function getUserAvatar(): Promise<string> {

    try {
        const response = await fetch(process.env.REACT_APP_API+"profile_photos", {
            method: "GET",
            credentials: "include"
        });
    
        if (!response.ok)
        return null;
    
        return (await response.json()).content.profilePhotoURL ?? "";
    }
    catch {
        return null;
    }
}