import React, { useEffect, useState } from "react"
import getUserData from "services/getUserData"

import LoggedHeader from "components/standalone/LoggedHeader/LoggedHeader"
import Footer from "components/standalone/Footer/Footer";


export default function Dashboard(): React.JSX.Element {

    const [email, setEmail] = useState("");

    useEffect(() => {
        
        const fetchData = async () => {
            try {
                const data = await getUserData();
                if (data) setEmail(data.email);
            } catch (error) {
                console.error(error);
            }
        };
    
        fetchData();
    }, []);

    return <>  
        <LoggedHeader />
        
        <main style={{minHeight: "80vh"}}>
            <h2>{email?`Iniciaste sesión como ${email}`:""}</h2>
            Vista principal de la aplicación
        </main>

        <Footer />
    
    </>
}