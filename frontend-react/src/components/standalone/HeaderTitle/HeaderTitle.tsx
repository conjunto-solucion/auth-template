import React from "react"
import { Link } from "react-router-dom"
import logo from "assets/logo.svg"
import "./HeaderTitle.css"
import { FlexDiv } from "components/generic"

export default function HeaderTitle(): React.JSX.Element {
    return (

        <Link to="/" id="header-title">
            <FlexDiv>
                <img src={logo} alt="" />
                <p>react-auth-client</p>
            </FlexDiv>
        </Link>
    )
}