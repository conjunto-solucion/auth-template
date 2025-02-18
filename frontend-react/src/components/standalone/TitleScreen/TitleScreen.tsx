import React from "react"
import "./TitleScreen.css"


export default function TitleScreen(): JSX.Element {

  return (
    <div className="title-wrapper">
      <h1>auth-template</h1>
      <h2>
        Con este cliente puedes probar la API de autorización y autenticación.
      </h2>

    </div>
  );
}