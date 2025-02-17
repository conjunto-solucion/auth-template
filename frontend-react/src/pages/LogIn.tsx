import React, { useState } from "react";
import { Link } from "react-router-dom";

import logIn from "services/logIn";
import {Form, Field, Button, FlexDiv} from "components/generic";





export default function LogIn(): JSX.Element {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit() {
    setLoading(true);

    try {
      const ok = await logIn(email, password);
      if (ok)
      window.location.reload();
    }
    catch (error) {
      setError(error.message);
    }
    finally {
      setLoading(false);
    }
  };


  return (
    <Form onSubmit={submit} formTitle="Iniciar sesión">

      <Field label="Correo electrónico" value={email} onChange={(e: any)=>setEmail(e.target.value)} />
      <Field label="Contraseña" type="password" value={password} onChange={(e: any)=>setPassword(e.target.value)} />

      <h3>{error}</h3>
      
      
      <FlexDiv justify='space-between'>
        <Link to="/registrarse" style={{ margin: '1rem 0'}}>Crea una nueva cuenta</Link>
        <Button disabled={loading} type="submit" textContent="Ingresar" onClick={null} />
      </FlexDiv>
      

    </Form>
  );
}