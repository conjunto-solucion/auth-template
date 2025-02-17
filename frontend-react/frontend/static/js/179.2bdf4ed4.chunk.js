"use strict";(self.webpackChunkreact_auth_client=self.webpackChunkreact_auth_client||[]).push([[179],{257:(e,t,n)=>{n.d(t,{$n:()=>i,D0:()=>a,hS:()=>c,lV:()=>l,uU:()=>o});n(43);var r=n(579);function i(e){let{style:t,className:n,id:i,textContent:l="",disabled:a=!1,type:o="button",onClick:s=null}=e;return(0,r.jsx)("button",{disabled:a,style:t,className:n+" formtsx-default-button",id:i,type:o,onClick:s,children:l})}function l(e){let{style:t,className:n,id:i,children:l,formTitle:a,onSubmit:o=()=>{}}=e;return(0,r.jsxs)("form",{style:t,className:n+" formtsx-default-form",id:i,onSubmit:e=>{e.preventDefault(),o()},children:[(0,r.jsx)("legend",{children:a}),l]})}function a(e){let{style:t,className:n,id:i,label:l="",name:a="",note:o,placeholder:s,type:c="text",value:u,onChange:f}=e;return(0,r.jsxs)("label",{style:t,className:n+" formtsx-default-field",id:i,children:[" ",l,o?(0,r.jsxs)("span",{children:[" ",o]}):null,(0,r.jsx)("input",{placeholder:s,type:c,name:a,value:null!==u&&void 0!==u?u:"",onChange:e=>f(e)})]})}function o(e){let{style:t,className:n,id:i,label:l,name:a,note:o,fallbackPath:s,value:c,onChange:u}=e;return(0,r.jsxs)("label",{style:t,id:i,className:n+" formtsx-default-imagepicker",children:[l,(0,r.jsxs)("span",{children:[" ",o]}),c&&0!==c.size?(0,r.jsx)("svg",{onClick:e=>{e.preventDefault(),u(void 0)},xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"currentColor",className:"bi bi-x-circle-fill",viewBox:"0 0 16 16",children:(0,r.jsx)("path",{d:"M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z"})}):null,(0,r.jsx)("input",{name:a,type:"file",accept:".png, .jpeg, .jpg, .svg",onChange:e=>{e.target.files&&e.target.files.length>0&&u(e.target.files.item(0))}}),(0,r.jsx)("div",{children:c||s?(0,r.jsx)("img",{alt:"",src:c?URL.createObjectURL(c):s}):null})]})}var s=n(555);function c(e){let{style:t,className:n,id:i,children:l,wrap:a=!0,justify:o="center",align:c="center"}=e;return(0,r.jsx)("div",{className:n,id:i,style:(0,s.A)({display:"flex",alignItems:c,justifyContent:o,flexWrap:a?"wrap":"nowrap",width:"100%"},t),children:l})}},205:(e,t,n)=>{n.d(t,{A:()=>o});n(43);var r=n(475),i=n(460),l=n(257),a=n(579);function o(){return(0,a.jsx)(r.N_,{to:"/",id:"header-title",children:(0,a.jsxs)(l.hS,{children:[(0,a.jsx)("img",{src:i.A,alt:""}),(0,a.jsx)("p",{children:"react-auth-client"})]})})}},179:(e,t,n)=>{n.r(t),n.d(t,{default:()=>f});var r=n(43);var i=n(257);async function l(){(await fetch("http://localhost:81/api/auth",{method:"DELETE",credentials:"include"})).ok&&window.location.reload()}const a=n.p+"static/media/default-profile-photo.bf05ba9ea846e4f05289550d64980e55.svg";var o=n(579);function s(){const[e,t]=(0,r.useState)(a);return(0,r.useEffect)((function(){(async function(){const e=await fetch("http://localhost:81/api/profile_photos",{method:"GET",credentials:"include"});if(!e.ok)return null;try{var t;return null!==(t=(await e.json()).content.profilePhotoURL)&&void 0!==t?t:""}catch(n){return null}})().then((e=>{e&&(console.log("returned: "+e),t(e))}))}),[]),(0,o.jsx)("div",{children:(0,o.jsxs)(i.hS,{id:"profile-menu",justify:"right",children:[(0,o.jsx)(i.$n,{onClick:l,textContent:"Cerrar sesi\xf3n"}),(0,o.jsx)("img",{alt:"",src:e})]})})}var c=n(205);function u(){return(0,o.jsx)("header",{id:"logged-header",children:(0,o.jsxs)(i.hS,{justify:"space-between",children:[(0,o.jsx)(c.A,{}),(0,o.jsx)(s,{})]})})}function f(){const[e,t]=(0,r.useState)("");return(0,r.useEffect)((()=>{(async()=>{try{const e=await async function(){const e=await fetch("http://localhost:81/api/users",{method:"GET",credentials:"include"});if(!e.ok)throw new Error((await e.json()).message||"Error al recuperar la informaci\xf3n de usuario");try{return(await e.json()).content}catch(t){throw new Error("Error al recuperar la informaci\xf3n de usuario")}}();e&&t(e.email)}catch(e){console.error(e)}})()}),[]),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(u,{}),(0,o.jsxs)("main",{children:[(0,o.jsx)("h2",{children:e?"Iniciaste sesi\xf3n como ".concat(e):""}),"Agrega aqu\xed la vista principal de la aplicaci\xf3n"]})]})}},555:(e,t,n)=>{function r(e){return r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},r(e)}function i(e){var t=function(e,t){if("object"!=r(e)||!e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var i=n.call(e,t||"default");if("object"!=r(i))return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"==r(t)?t:t+""}function l(e,t,n){return(t=i(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){l(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}n.d(t,{A:()=>o})}}]);
//# sourceMappingURL=179.2bdf4ed4.chunk.js.map