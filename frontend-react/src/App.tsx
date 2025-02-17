import React, { Suspense, lazy, useEffect, useState } from "react"
import { Navigate, Route, Routes } from "react-router-dom"

import SplashScreen from "components/standalone/SplashScreen/SplashScreen"
import userIsAuthorized from "services/userIsAuthorized"


const Dashboard  = lazy(() => import('pages/Dashboard'))
const HomePage   = lazy(() => import('pages/HomePage'))
const SignUp     = lazy(() => import("pages/SignUp"))
const LogIn      = lazy(() => import("pages/LogIn"))
const Error404   = lazy(() => import("pages/Error404"))



export default function App(): React.JSX.Element {

    const [userIsLoggedIn, setUserIsLoggedIn] = useState(false)
    useEffect(tryGettingAuthorization, [])


    function tryGettingAuthorization(): void {
        userIsAuthorized().then(result => {setUserIsLoggedIn(result);})
    }
  
    
    return (
        
        <Suspense fallback={<SplashScreen />}>
            <Routes>

                <Route index               element={ userIsLoggedIn? <Navigate to="/inicio"/> : <HomePage /> } />   
                <Route path="/ingresar"    element={ userIsLoggedIn? <Navigate to="/inicio"/> : <LogIn/> } />
                <Route path="/registrarse" element={ userIsLoggedIn? <Navigate to="/inicio"/> : <SignUp /> } />

                <Route path="/inicio/*"    element={ userIsLoggedIn? <Dashboard /> : <Navigate to={"/ingresar"} />} />
            
                <Route path="*"            element={ <Error404  />   } />      

            </Routes>
        </Suspense>
    );
}