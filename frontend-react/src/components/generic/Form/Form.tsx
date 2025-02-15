import React, { ReactNode } from "react"
import './Form.css'

type props = {
    style?: React.CSSProperties
    className?: string
    id?: string
    children: ReactNode

    formTitle?: string
    onSubmit?: Function
}


export default function Form({ style, className, id, children, formTitle, onSubmit=()=>{return} }: props): React.JSX.Element {
    return (
        <form style={style} className={className+" formtsx-default-form"} id={id}
        onSubmit={e => { e.preventDefault(); onSubmit() }}>
            <legend>{formTitle}</legend>
            {children}
        </form>
    );
};

