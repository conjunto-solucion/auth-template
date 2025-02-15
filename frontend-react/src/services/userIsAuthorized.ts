export default async function userIsAuthorized() {

  const response = await fetch(process.env.REACT_APP_API+"auth", {
    method: "PUT",
    credentials: "include"
  });
  
  return response.ok;
}