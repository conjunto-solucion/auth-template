import { FlexDiv } from "components/generic"
import React from "react"
import "./Footer.css"


export default function Footer(): React.JSX.Element {

  return <footer id="footer">

    <FlexDiv justify="space-between">
      <p>Conjunto Solución GPL V3</p>

      <div>
        <p><a href="https://github.com/conjunto-solucion/auth-template">github.com</a></p>
      </div>
    </FlexDiv>

  </footer>
}
