export default async function userIsAuthorized(): Promise<boolean> {

  try {
    const response = await fetch(process.env.REACT_APP_API+"auth", {
      method: "PUT",
      credentials: "include"
    });

    return response.ok;
  }
  
  catch (e) {
    console.log(e);
    return false;
  }
  
}