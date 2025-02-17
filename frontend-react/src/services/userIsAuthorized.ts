export default async function userIsAuthorized(): Promise<boolean> {

  const response = await fetch(process.env.REACT_APP_API+"auth", {
    method: "PUT",
    credentials: "include"
  });
  
  return response.ok;
}