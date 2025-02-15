export default async function logOut() {
  
    const response = await fetch(process.env.REACT_APP_API+"auth", {
      method: "DELETE",
      credentials: "include",
    });
  
    if (response.ok) {
        window.location.reload();
    }
  }