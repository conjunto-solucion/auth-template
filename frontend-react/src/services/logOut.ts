export default async function logOut() {
  
  try {
    const response = await fetch(process.env.REACT_APP_API+"auth", {
      method: "DELETE",
      credentials: "include",
    });
  
    if (response.ok) {
      window.location.reload();
    }
  }

  catch (e) {
    console.log(e)
  }
}