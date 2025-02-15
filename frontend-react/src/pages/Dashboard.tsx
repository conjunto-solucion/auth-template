import React, { useEffect, useState } from "react"
import getUserData from "services/getUserData"

import LoggedHeader from "components/standalone/LoggedHeader/LoggedHeader"


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
        
        <main>
            <h2>{email?`Iniciaste sesión como ${email}`:""}</h2>
            Agrega aquí la vista principal de la aplicación
        </main>
    
    </>
}