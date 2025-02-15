import React from "react"
import "./TitleScreen.css"


export default function TitleScreen(): JSX.Element {

  return (
    <div className="title-wrapper">
      <h1>react-auth-client</h1>
      <h2>
        Con este cliente puedes probar la API de autorización/autenticación. Más información en los enlaces del footer.
      </h2>

    </div>
  );
}