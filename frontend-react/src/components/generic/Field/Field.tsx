import React from "react"
import './Field.css'

type props = {
    style?: React.CSSProperties
    className?: string
    id?: string
    name?: string
    label?: string
    note?: string
    placeholder?:string
    type?: "text" | "number" | "password" | "email" | "tel" | "url" | string
    value: any
    onChange: Function
}

export default function Field({ style, className, id, label="", name="", note, placeholder, type="text", value, onChange }: props): React.JSX.Element {
    
    return <label style={style} className={className+" formtsx-default-field"} id={id}> {label}
    {note?<span> {note}</span>: null}
        <input
            placeholder={placeholder}
            type={type}
            name={name}
            value={value??""}
            onChange={(e) => onChange(e)}
        ></input>
    </label>
    
};

