import React, { ReactNode } from "react";

type props = {
  style?: React.CSSProperties
  className?: string
  id?: string
  children: ReactNode,

  wrap?: boolean,
  justify?: "start"|"end"|"flex-start"|"flex-end"|"center"|"left"|"right"|"normal"|"space-between"|"space-around"|"space-evenly"|"safe"|"unsafe",
  align?: "start"|"end"|"self-start"|"self-end"|"flex-end"|"flex-start"|"center"|"normal"|"baseline"|"stretch"|"anchor-center"|"safe"|"unsafe"
}


export default function FlexDiv({style, className, id, children, wrap=true, justify="center", align="center"}: props): React.JSX.Element  {
    return (
      <div className={className} id={id}
      
      style={
        { display: "flex", alignItems: align, justifyContent: justify, 
          flexWrap:wrap?'wrap':'nowrap', width:'100%', ...style
        }}>

        {children}
      </div>
    )
}