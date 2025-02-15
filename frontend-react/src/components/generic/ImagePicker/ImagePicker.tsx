import React from "react";  
import './ImagePicker.css';

type props = {
  style?: React.CSSProperties
  className?: string
  id?: string
  name?: string
  label?: string;
  note?: string;
  fallbackPath?: string;
  onChange: Function;
  value: any;
}


export default function ImagePicker({style, className, id, label, name, note, fallbackPath, value, onChange}:props): React.JSX.Element {

  return <label style={style} id={id} className={className+" formtsx-default-imagepicker"}>

    {label}<span> {note}</span>
            
    {(!value || value.size === 0)? null :

    <svg onClick={e=>{e.preventDefault(); onChange(undefined);}}
    xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-circle-fill" viewBox="0 0 16 16">
      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z"/>
    </svg>

    }
            
    <input name={name} type="file" accept=".png, .jpeg, .jpg, .svg"
    onChange={e => {
      if (e.target.files && e.target.files.length > 0) onChange(e.target.files.item(0));
    }}/>

    <div>
      {(!value && !fallbackPath)? null :
        <img alt="" src={value?URL.createObjectURL(value):fallbackPath} />}
    </div>

  </label>
}