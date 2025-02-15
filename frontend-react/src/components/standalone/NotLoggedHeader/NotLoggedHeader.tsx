import React from "react"

import { Link } from "react-router-dom"
import { Button, FlexDiv } from "components/generic"
import HeaderTitle from "../HeaderTitle/HeaderTitle"


export default function NotLoggedHeader(): JSX.Element {
  
return (
  
  <header id="not-logged-header">
    <FlexDiv justify="space-between">

      <HeaderTitle />
      
      <nav>
        <FlexDiv justify="space-around">
          <Link to={"/registrarse"}>Crear una cuenta</Link>
          <Link to={"/ingresar"}><Button type="button" textContent="Ingresar" /></Link>
        </FlexDiv>
      </nav>

    </FlexDiv>
  </header>

);
}
