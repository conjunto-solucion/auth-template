import { FlexDiv } from "components/generic"
import React from "react"
import "./Footer.css"


export default function Footer(): React.JSX.Element {

  return <footer id="footer">

    <FlexDiv justify="space-between">
      <p>Conjunto Solución GPL V3</p>

      <div>
        <p><a href="https://github.com/conjunto-solucion/react-auth-client">react-auth-client</a></p>
        <p><a href="https://github.com/conjunto-solucion/php-auth-api">php-auth-api</a></p>
        <p><a href="https://github.com/conjunto-solucion/express-auth-api">express-auth-api</a></p>
      </div>
    </FlexDiv>

  </footer>
}
