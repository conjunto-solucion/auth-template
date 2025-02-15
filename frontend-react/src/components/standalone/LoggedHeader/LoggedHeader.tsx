import React from "react";
import ProfileMenu from "components/standalone/ProfileMenu/ProfileMenu";
import HeaderTitle from "components/standalone/HeaderTitle/HeaderTitle"
import './LoggedHeader.css';
import { FlexDiv } from "components/generic";


export default function LoggedHeader(): JSX.Element {
  
  return <header id="logged-header">

    <FlexDiv justify="space-between">
      <HeaderTitle />
      <ProfileMenu />
    </FlexDiv>

  </header>
}
