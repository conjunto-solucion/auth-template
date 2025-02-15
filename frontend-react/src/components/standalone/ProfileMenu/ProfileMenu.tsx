import React, { useEffect, useState } from "react"

import { Button, FlexDiv } from "components/generic"
import logOut from "services/logOut"
import getUserProfilePhoto from "services/getUserProfilePhoto"
import defaultProfilePhoto from 'assets/default-profile-photo.svg'
import './ProfileMenu.css'


export default function ProfileMenu(): React.JSX.Element {

    const [profilePhoto, setProfilePhoto] = useState(defaultProfilePhoto);

    useEffect(tryGettingUserProfilePhoto, []);
    
    function tryGettingUserProfilePhoto() {
        
        getUserProfilePhoto().then( blob => {
            if (blob?.size > 100)
            setProfilePhoto(URL.createObjectURL(blob));
        });
    }
    

    return <div>
    
        <FlexDiv id="profile-menu" justify="right">

            <Button onClick={logOut} textContent="Cerrar sesión"/>
            <img alt="" src={profilePhoto}></img>

        </FlexDiv>
    </div>
}