import React from "react"
import './Button.css'

type props = {
    style?: React.CSSProperties
    className?: string
    id?: string

    textContent?: string
    disabled?: boolean
    type?: ("button"|"submit"|"reset")
    onClick?: () => void
}


export default function Button({style, className, id, textContent="", disabled=false, type="button", onClick=null}:props): React.JSX.Element {
    return (
        
        <button disabled={disabled} style={style} className={className+" formtsx-default-button"}  id={id}
        type={type} onClick={onClick}>

            {textContent}

        </button>
    )
}