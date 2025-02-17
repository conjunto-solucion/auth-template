import React, { useState } from "react"
import { Link } from "react-router-dom"

import { Button, Field, Form, ImagePicker, FlexDiv } from "components/generic"
import { isValidAccount } from "validators"
import user from 'types/user'
import postUser from "services/postUser"
import uploadProfilePhoto from "services/uploadProfilePhoto"


export default function SignUp(): React.JSX.Element {
  
  const [sendingSignupRequest, setSendingSignupRequest] = useState(false)
  const [signupErrorMessage, setSignupErrorMessage] = useState("")

  const [profilePhoto, setProfilePhoto] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    passwordMatch: ""
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }



  async function submit() {

    const user: user = {
      username: formData.username,
      email: formData.email,
      password: formData.password
    }

    if (!isValidAccount(user, formData.passwordMatch, profilePhoto, setSignupErrorMessage))
    return;

    try {
      setSendingSignupRequest(true)
      const ok = await postUser(user)

      if (profilePhoto)
      await uploadProfilePhoto(profilePhoto)

      if (ok)
      window.location.reload();
    }
    catch (error) {
      setSignupErrorMessage(error.message)
    }
    finally {
      setSendingSignupRequest(false)
    }
  }

  


  return (
    
    <Form formTitle="Datos de la cuenta" onSubmit={submit}>
          
      
      <Field name="username" label="¿Cómo quieres que te identifiquemos?" value={formData.username} onChange={handleChange} />

      <Field name="email" label="Tu dirección de correo electrónico" value={formData.email} onChange={handleChange} />


      <FlexDiv justify="left">
        <Field name="password" label="Elige una contraseña" value={formData.password} onChange={handleChange} type="password" />
        <Field name="passwordMatch" label="Vuelve a escribir la contraseña" value={formData.passwordMatch} onChange={handleChange} type="password" />
      </FlexDiv>



      <FlexDiv>
        <ImagePicker name="profilePhoto" label="Foto de perfil" note="(opcional)" onChange={setProfilePhoto} value={profilePhoto} />
      </FlexDiv>


      <h3>{signupErrorMessage}</h3>



      <FlexDiv justify='space-between'>
        <Link to="/ingresar">¿Ya tienes una cuenta?</Link>
        <Button textContent="Crear cuenta" type="submit" disabled={sendingSignupRequest} />
      </FlexDiv>

    </Form>
  );
}